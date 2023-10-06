import React from "react";
import LikedByList from "../components/LikedByList/index";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <section className="layout">
      <Header />
      <div className="content">
        <h1>Birds that liked you!</h1>
        <LikedByList className="card-list" />
      </div>
      <Footer />
    </section>
  );
};
export default Dashboard;