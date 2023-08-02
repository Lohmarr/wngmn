import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";
import LoveCalculator from "../components/LoveCalculator/index";
import Posts from "../components/Posts/index";
import PostForm from "../components/PostForm";
import LikeUser from "../components/LikeUser";
import AuthService from "../utils/auth";

const BirdProfile = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let bird;

  data.users.forEach((user) => {
    if (user._id === id) {
      bird = user;
    }
  });

  const loggedInUserId = AuthService.getUserId();

  return (
    <section className="layout">
      <Header />
      <div className="user-profile">
        <div className="profile-header">
          <h1>{bird.birdname}</h1>
          <p>
            This bird is great, isn't it? Dont'cha wanna date it?{" "}
          </p>
          <p>{bird.migration}</p>
        </div>
        <div className="profile-content">
          <div className="profile-image">
            <img src={bird.img} alt="Profile" />
          </div>
          <div className="profile-details">
            <h3>About Me</h3>
            <p className="bio-p">{bird.quote}</p>
          </div>
        </div>
      </div>
      <div>
        <LoveCalculator />
        <LikeUser bird={bird} loggedInUserId={loggedInUserId} />
        <Posts />
        <PostForm />
      </div>
      <Footer />
    </section>
  );
};

export default BirdProfile;
