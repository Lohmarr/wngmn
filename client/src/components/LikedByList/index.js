import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_LIKERS } from "../../utils/queries";
import Card from "../Card/Card";

const LikedByList = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_LIKERS, {
    variables: { userId: id },
    fetchPolicy: "cache-and-network",
  });
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const likers = data.likers;
  console.log(likers);

  return (
    <div>
      {likers.length === 0 ? (
        <h4>No incoming likes</h4>
      ) : (
        <div>
          <h2>Liked By List</h2>
          <div className="card-container">
            <div className="card-list">
              {likers.map((liker) => (
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
