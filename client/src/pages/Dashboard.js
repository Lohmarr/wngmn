import React from "react";
import UserList from "../components/UserList/index";
import "../componentStyles/welcome.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <section className="layout">
      <Header />
      <div className="content">
        <h1>Featured Birds</h1>
        <UserList className="card-list" />
      </div>
      <Footer />
    </section>
  );
};
export default Dashboard;

// import React from "react";
// import UserList from "../components/UserList/index";
// import "../componentStyles/welcome.css";
// import { useState } from "react";
// import { useQuery } from "@apollo/client";
// import { QUERY_USERS } from "../utils/queries";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import MigrationPatternSelect from "../components/MigrationSelectBar";

// const Dashboard = () => {
//   const [selectedMigration, setSelectedMigration] = useState(null);

//   const { loading, error, data } = useQuery(QUERY_USERS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const getFilteredUsers = (migrationPattern, data) => {
//     if (!data || !data.users) return [];
//     const filteredUsers = data.users.filter((user) => {
//       return user.Migration === migrationPattern;
//     });
//     return filteredUsers;
//   };

//   const filteredUsers = getFilteredUsers(selectedMigration, data);

//   return (
//     <section className="layout">
//       <Header />
//       <div className="content">
//         <h1>Featured Birds</h1>
//         <div>
//           <MigrationPatternSelect
//             selectedMigration={selectedMigration}
//             setSelectedMigration={setSelectedMigration}
//           />
//           <UserList className="card-list" users={filteredUsers} />
//         </div>
//       </div>
//       <Footer />
//     </section>
//   );
// };
// export default Dashboard;
