import React from "react";
import UserList from "../components/UserList/index";
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
