import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserHomePage from "./UserHomePage";
import AdminHomePage from "./AdminHomePage";

function HomePage() {
  const user = useSelector(state => state.session.user);

  return (
    <section className="homePage__main">
      {user.admin ? (
        <AdminHomePage />
      ) : (
        <UserHomePage />
      )}
    </section>
  );
}

export default HomePage;
