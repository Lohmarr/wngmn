const { gql } = require("apollo-server-express");

// queries to get data from db
const typeDefs = gql`
  type User {
    _id: ID
    birdname: String
    username: String
    img: String
    quote: String
    email: String
    password: String
    posts: [Post]!
    likedBy: [ID!]!
    likes: [ID!]!
    migration: String
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }
  
  type Mutation {
    addUser(username: String!, email: String!, birdname: String!, password: String!): Auth
    updateUser(userId: ID!, birdname: String, img: String, quote: String): User
    deleteUser(userId: ID!): User
    likeUser(userId: ID!, likedUserId: ID!): User
    likedByUser(userId: ID!, likedById: ID!): User
    dislikeUser(userId: ID!, likedUserId: ID!): User
    dislikedByUser(userId: ID!, likedById: ID!): User
    login(email: String!, password: String!): Auth
    addPost(postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }

  type Subscription {
    onLikeReceived(userId: ID!): User!
  }
`;

module.exports = typeDefs;
