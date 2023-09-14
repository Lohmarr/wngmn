import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import {
  LIKE_USER,
  LIKED_BY_USER,
  DISLIKE_USER,
  DISLIKED_BY_USER,
} from "../../utils/mutations";

const LikeUser = ({ bird, loggedInUserId }) => {
  const [isLikedByUser, setIsLikedByUser] = useState(false);

  useEffect(() => {
    setIsLikedByUser(bird.likedBy.includes(loggedInUserId));
  }, [bird.likedBy, loggedInUserId]);

  console.log(isLikedByUser);
  console.log(bird.likedBy.includes(loggedInUserId));

  const [likeUser] = useMutation(LIKE_USER);
  const [likedByUser] = useMutation(LIKED_BY_USER);
  const [dislikeUser] = useMutation(DISLIKE_USER);
  const [dislikedByUser] = useMutation(DISLIKED_BY_USER);

  const handleLikeButtonClick = () => {
    if (isLikedByUser) {
      dislikeUser({
        variables: { userId: loggedInUserId, likedUserId: bird._id },
        onCompleted: () => {
          setIsLikedByUser(false);
          dislikedByUser({
            variables: { userId: bird._id, likedById: loggedInUserId },
            onCompleted: () => {
              // Remove the liked bird from local storage
              const likedBirds =
                JSON.parse(localStorage.getItem("likes")) || [];
              const updatedLikedBirds = likedBirds.filter(
                (b) => b !== bird._id
              );
              localStorage.setItem("likes", JSON.stringify(updatedLikedBirds));
            },
          });
        },
      });
    } else {
      likeUser({
        variables: { userId: loggedInUserId, likedUserId: bird._id },
        onCompleted: () => {
          setIsLikedByUser(true);
          likedByUser({
            variables: { userId: bird._id, likedById: loggedInUserId },
            onCompleted: () => {
              // Add the liked bird to local storage
              const likedBirds =
                JSON.parse(localStorage.getItem("likes")) || [];
              const updatedLikedBirds = [...likedBirds, bird._id];
              localStorage.setItem("likes", JSON.stringify(updatedLikedBirds));
            },
          });
        },
      });
    }
  };
  return (
    <div>
      <button onClick={handleLikeButtonClick}>
        {isLikedByUser ? "Dislike" : "Like"}
      </button>
      {isLikedByUser && <p>You liked this bird!</p>}
    </div>
  );
};

export default LikeUser;
