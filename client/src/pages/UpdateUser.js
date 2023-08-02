import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const UpdateUser = () => {
  const userId = Auth.getUserId();

  const navigate = useNavigate();

  // state for storing the form data
  const [formState, setFormState] = useState({
    userId: userId,
    birdname: "",
    img: "",
    quote: "",
  });

  // mutation for updating user
  const [updateUser, { error, data }] = useMutation(UPDATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (value !== "") {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await updateUser({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.updateUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <h4>Update Profile</h4>
      <div>
        {data ? (
          <p className="popup-p">
            You're updated! You can fly back to your account, just click the
            close button!
          </p>
        ) : (
          // if there is no data (update form)
          <form onSubmit={handleFormSubmit}>
            <input
              placeholder="Enter your new name!"
              name="birdname"
              type="text"
              value={formState.birdname}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Enter your profile picture's URL!"
              name="img"
              type="text"
              value={formState.img}
              onChange={handleChange}
              required
            />
            <input
              placeholder="Tell us about you!"
              name="quote"
              type="text"
              value={formState.quote}
              onChange={handleChange}
              required
            />
            <button type="submit">submit</button>
          </form>
        )}

        {error && (
          // if there is an error
          <div>{error.message}</div>
        )}
      </div>
    </main>
  );
};

export default UpdateUser;
