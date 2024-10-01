import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axios";

function AuthCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("authToken");
      if (storedUser) {
        try {
          const user = await axiosInstance.get("/me");
          setUser(user.data);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(user.data));
        } catch (error) {
          console.error("Token geçersiz:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (
      !isLoading &&
      isAuthenticated &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, location, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}

export default AuthCheck;
