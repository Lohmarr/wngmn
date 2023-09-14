import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_LIKES } from "../../utils/queries";
import Card from "../Card/Card";

const LikedByList = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, error, data } = useQuery(QUERY_LIKES, {
    variables: { userId: id },
  });
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const likes = data.getLikes.likedBy;
  console.log(likes);

  return (
    <div>
      {likes.length === 0 ? (
        <h4>No incoming likes</h4>
      ) : (
        <div>
          <h2>Liked By List</h2>
          <div className="card-container">
            <div className="card-list">
              {likes.map((liker) => (
                <Card user={liker} key={liker._id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedByList;
