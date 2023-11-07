import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BooksTable from "../components/home/BooksTable";
import Calendar from "../components/Calendar";

const Home = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(sessionStorage.getItem("auth"));
  const [customerEmail, setCustomerEmail] = useState(
    sessionStorage.getItem("email")
  );
  const role = sessionStorage.getItem("role");
  // const [role, setRole] = useState(sessionStorage.getItem("role"));
  const navigate = useNavigate();

  useEffect(() => {
    // setAuth(sessionStorage.getItem("auth"));
    // setCustomerEmail(sessionStorage.getItem("email"));
    // setRole(sessionStorage.getItem("role"));
    console.log("role: " + role);
    console.log("auth: " + auth);

    if (auth !== "true") {
      navigate("/user/signin");
    }
  }, [auth]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5555/session/search?customerEmail=${customerEmail}`
      )
      .then((res) => {
        setSessions(res.data);
      })
      .catch((err) => {
        alert("An error happened. Please check console");
        console.log(err);
      });
  }, [customerEmail]);
  // : "";

  const signOut = () => {
    sessionStorage.setItem("auth", false);
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("role");
    setAuth(false);
    setCustomerEmail("");
    setLoading(false);
  };

  return (
    <div className="p-4 w-[800px] m-auto lg:w-[1000px]">
      <div className="relative flex justify-end gap-4">
        <span className="absolute left-0 animate-bounce">
          Andy Guim's Portfolio
        </span>
        {role == "admin" ? (
          <Link to={"/session"} className=" border-solid border-2 rounded-lg">
            Session
          </Link>
        ) : (
          ""
        )}

        <span className=" border-solid border-2 rounded-lg">
          {auth !== "true" ? (
            <Link to={"/user/signin"}>
              {auth == "true" ? "Sign out" : "Sign In"}
            </Link>
          ) : (
            <button onClick={signOut}>Sign Out</button>
          )}
        </span>

        <span className=" absolute right-0 bottom-[-60px] border-solid border-2 w-[50px] h-[50px] rounded-full  leading-10 text-sm border-transparent bg-cyan-100 text-center overflow-hidden">
          {auth == "true" ? (
            <Link
              to={`/user/${sessionStorage.getItem("email")}`}
              // className=" border-solid border-2 rounded-full "
            >
              {auth == "true"
                ? `${sessionStorage.getItem("name").toUpperCase()}`
                : ""}
            </Link>
          ) : (
            <span></span>
          )}
        </span>
      </div>
      <div className="flex justify-center items-center gap-x-4"></div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">My Booking List (For Customer)</h1>
      </div>
      <BooksTable sessions={sessions} />
      <Calendar />
    </div>
  );
};

export default Home;
