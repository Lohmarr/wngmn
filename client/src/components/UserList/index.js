import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import Card from "../Card/Card";
import MigrationSelect from "../MigrationSelect";
import AuthService from "../../utils/auth";

const UserList = () => {
  const { loading, error, data } = useQuery(QUERY_USERS);
  const [selectedPattern, setSelectedPattern] = useState("");
  const [showLikedBirds, setShowLikedBirds] = useState(false);
  const loggedInUserLikes = AuthService.getUserLikes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSelectChange = (event) => {
    setSelectedPattern(event.target.value);
  };

  const handleLikedBirdsButtonClick = () => {
    setShowLikedBirds(!showLikedBirds);
  };

  const filteredUsers = selectedPattern
    ? data.users.filter((user) => user.migration === selectedPattern)
    : data.users;

  let sortedUsers = [...filteredUsers].sort((a, b) => {
    const nameA = a.birdname.toUpperCase();
    const nameB = b.birdname.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  if (showLikedBirds) {
    sortedUsers = sortedUsers.filter((user) =>
      loggedInUserLikes.some((likedUser) => likedUser === user._id)
    );
  }

  if (sortedUsers.length === 0) {
    return (
      <>
        <MigrationSelect
          selectedValue={selectedPattern}
          handleSelectChange={handleSelectChange}
        />
        <button className="liked-button" onClick={handleLikedBirdsButtonClick}>
          {showLikedBirds ? "Show All Birds" : "Show Liked Birds"}
        </button>
        <h2>No birds currently on this path!</h2>
        {loggedInUserLikes === null ||
          (loggedInUserLikes.length === 0 && (
            <h2>You haven't liked any birds yet!</h2>
          ))}
      </>
    );
  }

  return (
    <>
      <div className="dash-sorting">
        <MigrationSelect
          selectedValue={selectedPattern}
          handleSelectChange={handleSelectChange}
        />
        <button className="liked-button" onClick={handleLikedBirdsButtonClick}>
          {showLikedBirds ? "Show All Birds" : "Show Liked Birds"}
        </button>
      </div>
      <div className="card-container">
        <div className="card-list">
        {sortedUsers.map((user) => {
            if (user._id === AuthService.getUserId()) {
              return null; // Skip rendering the card for the logged-in user
            }
            return <Card user={user} key={user._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default UserList;
