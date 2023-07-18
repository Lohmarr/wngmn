import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import AuthService from "../../utils/auth";

function LoveCalculator() {
  const [lovePercentage, setLovePercentage] = useState(null);
  const [userName, setUserName] = useState(AuthService.getName());
  const [viewedProfile, setViewedProfile] = useState("");

  // Extract User ID from the URL
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_USERS);

  useEffect(() => {
    let bird;
    if (data) {
      data.users.forEach((user) => {
        if (user._id === id) {
          bird = user;
        }
      });
      setViewedProfile(bird.birdname);
    }
  }, [id, data]);
  
  useEffect(() => {
    const fetchLovePercentage = async () => {
      const url = `https://love-calculator.p.rapidapi.com/getPercentage?fname=${userName}&sname=${viewedProfile}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "2f4c041e57msha3ca754b5486ff4p1683d6jsn364a287ef518",
          "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
        },
      };
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const data = JSON.parse(result);
        setLovePercentage(data.percentage);
      } catch (error) {
        console.error(error);
      }
    };
    
      fetchLovePercentage();
    
  }, [viewedProfile, userName]);
  if (loading) return <p>Loading...</p>;
  if (error) {
    return <div>{error}</div>;
  } else if (lovePercentage === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>&hearts; Love Calculator &hearts;</h2>
      <p>The love potential with {viewedProfile} is{" "}
      {lovePercentage}%!</p>
    </div>
  );
}

export default LoveCalculator;
