import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import Card from "../Card/Card";

 const UserList = () => {
  const { loading, error, data } = useQuery(QUERY_USERS);

   if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

   return (
    <div className="cardContainer">
    <div className="card-list">
      {data.users.map((user) => (
        <Link to={`/bird/${user._id}`}>
        <Card key={user._id} user={user} />
        </Link>
      ))}
    </div>
    </div>
  );
};

 export default UserList;

//  function UserList({ users }) {
//   return (
//     <div className="cardContainer">
//       <div className="card-list">
//         {users.map((user) => (
//           <Link to={`/bird/${user._id}`}>
//             <Card key={user._id} user={user} />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }