const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  // read data from the db
  Query: {
    // get all users
    users: async () => {
      const findUser = await User.find({});
      console.log(findUser);
      return findUser;
    },
    // get a user by id
    user: async (_, { _id }) => {
      try {
        const user = await User.findById(_id);
        return user;
      } catch (error) {
        console.error("Error querying user:", error);
        throw new Error("Failed to fetch user");
      }
    },
    // get a user's posts by id
    userPosts: async (_, { userId }) => {
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Retrieve the user's posts
      const posts = await Post.find({ postAuthor: user.username });

      return posts;
    },
    // get all posts and populate those posts with their comments, sort by newest
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    // get a single post by id
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId }).populate("comments");
    },
    // show the logged in user's profile and populate their posts
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("posts");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    getLikes: async (_, { _id }) => {
      try {
        return User.findById(_id).populate("likedBy");
      }  catch (error) {
        console.error("Error querying user:", error);
        throw new Error("Failed to fetch user's likedBy");
      }
    },
  },

  // create/update/delete data in the db
  Mutation: {
    // create a user, sign a token, and send it back (to client/src/pages/signup.js)
    addUser: async (parent, { username, email, password, birdname }) => {
      const user = await User.create({ username, email, password, birdname });
      // generate jwt token and sign it for new user
      const token = signToken(user);
      return { token, user };
    },

    async updateUser(parent, args, ctx, info) {
      const { userId, ...userData } = args;
      const user = await User.findByIdAndUpdate(userId, userData, {
        new: true,
      });

      return user;
    },

    deleteUser: async (parent, { userId }, context) => {
      const user = await User.findOneAndDelete({
        _id: userId,
      });

      return user;
    },

    // login a user, sign a token, and send it back (to client/src/pages/login.js)
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // generate jwt token and sign it for new user
      const token = signToken(user);

      return { token, user };
    },
    // create a post
    addPost: async (parent, { postText }, context) => {
      if (context.user) {
        console.log(
          "context.user log in resolvers.js ====================================",
          context.user
        );
        const post = await Post.create({
          postText,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // update a post by creating a comment
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // delete a post and update user to remove post from their profile
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // delete a comment by updating a post
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    likeUser: async (parent, { userId, likedUserId }, context) => {
      if (context.user && context.user._id === userId) {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { likes: likedUserId } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    likedByUser: async (_, { userId, likedById }) => {
      try {
        const likedUser = await User.findById(userId);
        const likedByUser = await User.findById(likedById);

        if (!likedUser || !likedByUser) {
          throw new Error("User not found");
        }

        // Check if the user has already been liked by the same user
        const alreadyLiked = likedUser.likedBy.find(
          (user) => user._id.toString() === likedByUser._id.toString()
        );
        if (alreadyLiked) {
          throw new Error("User already liked by this user");
        }

        // Add the likedByUser to the likedUser's likedBy array
        likedUser.likedBy.push(likedByUser);
        await likedUser.save();

        return likedUser;
      } catch (error) {
        throw new Error("Failed to deliver like to recipient");
      }
    },
    dislikeUser: async (parent, { userId, likedUserId }, context) => {
      if (context.user && context.user._id === userId) {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $pull: { likes: likedUserId } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    dislikedByUser: async (_, { userId, likedById }) => {
      try {
        const likedUser = await User.findById(userId);
        const likedByUser = await User.findById(likedById);

        if (!likedUser || !likedByUser) {
          throw new Error("User not found");
        }

        // Remove the likedByUser from the likedUser's likedBy array
        likedUser.likedBy.pull(likedByUser);
        await likedUser.save();

        return likedUser;
      } catch (error) {
        throw new Error("Failed to remove like from recipient");
      }
    },
  },
};

module.exports = resolvers;
