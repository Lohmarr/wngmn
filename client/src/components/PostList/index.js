import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import React, { useEffect, useReducer } from "react";
import { QUERY_USER_POSTS } from "../../utils/queries";
import { REMOVE_POST } from "../../utils/mutations";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        isPostRemoved: true,
      };
    default:
      return state;
  }
};

const PostList = ({ id }) => {
  // const { loading, error, data } = useQuery(QUERY_POSTS);
  const { loading, error, data } = useQuery(QUERY_USER_POSTS, {
    variables: { userId: id },
    fetchPolicy: "cache-and-network",
  });
  console.log(data);
  const [removePost] = useMutation(REMOVE_POST);
  const apolloClient = useApolloClient();
  
  const initialState = {
    posts: [],
    isPostRemoved: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (data) {
      const sortedPosts = data.userPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      dispatch({ type: "SET_POSTS", payload: sortedPosts });
    }
  }, [data]);

  const handleRemovePostButtonClick = async (postId) => {
    try {
      await removePost({
        variables: { postId },
        refetchQueries: [{query: QUERY_USER_POSTS}],
      });
      dispatch({ type: "REMOVE_POST", payload: postId });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  
  const { posts, isPostRemoved } = state;

  return (
    <div className="post-list">
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <h4>No posts yet!</h4>
      ) : (
        posts.map((post) => (
          <div className="post" key={post._id}>
            <div className="post-header">
              <h3>{post.postAuthor}</h3>
              <div className="post-end-container">
                <button
                  className="post-delete-button"
                  onClick={() => handleRemovePostButtonClick(post._id)}
                >
                  &#10007;
                </button>
              </div>
            </div>
            <hr></hr>
            <div className="post-body">
              <p>{post.postText}</p>
              <div className="post-end-container">
                <p>{post.createdAt}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
