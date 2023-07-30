import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import Verification from "./pages/Verification";
import isAuthenticated from "./utils/requireAuth";
import { useNavigate } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// 3:27
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user/:subpage?" element={<ProfilePage />} />
          <Route path="/user/:subpage/:action" element={<ProfilePage />} />
          <Route
            path="/user/activate/:token"
            sensitive
            element={<Verification />}
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
