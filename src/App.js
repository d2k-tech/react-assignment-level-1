import React from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import HomePage from "./components/homePage";
import Profile from "./components/profile";

const App = () => {
  return (
    <div>
      
      <Routes>
      <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<HomePage />} />
        <Route path="/users/:userId" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;