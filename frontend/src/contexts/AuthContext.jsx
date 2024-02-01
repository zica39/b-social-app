import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toastNotify from "../utils/toastNotify";
import { useContext } from "react";
import { DataContext } from "./DataContext";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const {
    dispatch,
    setEncodedToken,
    setUserLoggedIn,
    setUserLoginData,
    userLoginData,
  } = useContext(DataContext);
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  //signup state management
  const [signupInput, setSignupInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

 /* axios.interceptors.response.use(
      response => {
        console.log('Interceptor response:', response);
        return response;
      },
      error => {
        console.log('Interceptor error:', error);
        return Promise.reject(error);
      }
  );*/

  const loginHandler = async (creds) => {
    if (creds.username && creds.password) {
      try {
        const { data, status } = await axios.post("http://localhost:3000/api/v1/auth/login", {
          username: creds.username,
          password: creds.password,
        });

        if (status === 200) {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("loggedUser", data.user.username);
          localStorage.setItem("userData", JSON.stringify(data.user));
          setEncodedToken(data.access_token);
          setUserLoggedIn(data.user.username);
          setUserLoginData(JSON.parse(localStorage.getItem("userData")));
          navigate(location?.state?.from?.pathname ?? "/landing");
          toastNotify("success", "You're successfully logged in!");
        }
      } catch (e) {
        console.log(e);
        toastNotify("error", e.response.data.message);
      }
    } else {
      if (!creds.username && !creds.password) {
        toastNotify("error", "Please enter all the fields");
      } else if (!creds.username) {
        toastNotify("error", "username is empty");
      } else {
        toastNotify("error", "Password is empty");
      }
    }
  };

  const signupHandler = async () => {
    if (
      signupInput.first_name &&
      signupInput.last_name &&
        signupInput.email &&
      signupInput.username &&
      signupInput.password
    ) {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/register", {
          ...signupInput
        });

        if (response.status === 201) {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem(
            "loggedUser",
            response.data.user.username
          );
          localStorage.setItem(
            "userData",
            JSON.stringify(response.data.user)
          );

          setEncodedToken(response.data.access_token);
          setUserLoggedIn(response.data.user.username);
          setUserLoginData(JSON.parse(localStorage.getItem("userData")));
          // setUserLoginData(response.data.createdUser);
          navigate("/landing");
          const res = await axios.get("/api/users");
          dispatch({ type: "GET_USERS", payload: res.data.users });
          toastNotify(
            "success",
            "Welcome to ShareMate! You're successfully signed up!"
          );
        }
      } catch (e) {
        console.log(e);
        toastNotify("error", "User already exists! Please select to login!");
      }
    } else {
      toastNotify("error", "Please enter all the fields");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginInput,
        setLoginInput,
        loginHandler,
        signupInput,
        setSignupInput,
        signupHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
