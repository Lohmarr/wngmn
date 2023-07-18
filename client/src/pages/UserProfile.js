import React from "react";
import "../componentStyles/userProfile.css";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import { DELETE_USER } from "../utils/mutations"
import Header from "../components/Header";
import Footer from "../components/Footer";
import UpdatePop from "../components/popUps/updatePop";
import Posts from "../components/Posts";

const UserProfile = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_USERS);

  const [deleteUser] = useMutation(DELETE_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let bird;

  data.users.forEach((user) => {
    if (user._id === id) {
      bird = user;
    }
  });
  console.log(bird);

  const handleDelete = async () => {
    // Call the DELETE_USER mutation to delete the user
    await deleteUser({ variables: { userId: id } });
    // Redirect the user to the homepage
    window.location.assign('/');
  };
  return (
    <section className="layout">
      <Header />
      <div className="user-profile">
        <div className="profile-header">
          <h1>{bird.birdname}</h1>
          <p>You're a great bird, aren't you? {bird.migration}</p>
        </div>
        <div className="profile-content">
          <div className="profile-image">
            <img src={bird.img} alt={bird.birdname} />
          </div>
          <div className="profile-details">
            <h2>About Me</h2>
            <p>{bird.quote}</p>
            <Posts />
          </div>
        </div>
        <button onClick={togglePopup} className="upd-btn">Update Profile</button>
        <button onClick={handleDelete} className="dlt-btn">Delete Profile</button>
      </div>
      <Footer />
      {showPopup && <UpdatePop onClose={togglePopup} />}
    </section>
  );
};

export default UserProfile;
