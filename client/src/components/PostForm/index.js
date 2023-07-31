import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";

import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";

import Auth from "../../utils/auth";

const PostForm = () => {
  // state for the text of the post
  const [postText, setPostText] = useState("");

  // state for counting the characters in the post
  const [characterCount, setCharacterCount] = useState(0);
  const {loading, data} = useQuery(QUERY_POSTS);
  console.log(data)

  const [addPost, { error }] = useMutation(ADD_POST, {
    // mutation to add a new post
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(data)

    try {
      const { data } = await addPost({
        variables: {
          postText
        },
      });
      // clear the post text after submitting
      setPostText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" && value.length <= 280) {
      // update the post text
      setPostText(value);
      // update the character count
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Add A Comment!</h3>

      {Auth.loggedIn() ? (
        // if the user is logged in
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center margin-right: 100px"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9 ">
              <textarea
                name="postText"
                placeholder="chirp away!"
                value={postText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <p
              className={`m-0 ${
                characterCount === 280 || error ? "text-danger" : ""
              }`}
            >
              Character Count: {characterCount}/280
            </p>

            <div className="col-12 col-lg-3">
              <button className="pst-btn" type="submit">
                submit
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        // if the user is not logged in
        <p>
          You need to be logged in to post. Please{" "}
          <Link to="/">login</Link> or
          <Link to="/"> signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PostForm;
