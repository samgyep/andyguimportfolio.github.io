import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import SessionBundle from "../components/SessionBundle";
import BackButton from "../components/BackButton";

const CreateSession = () => {
  const today = new Date();
  today.setHours(today.getHours() + 13);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState();
  const [date, setDate] = useState(today);
  //   const [customer, setCustomer] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const auth = sessionStorage.getItem("auth");

  useEffect(() => {
    if (auth !== "true") {
      navigate("/session");
    }
  }, []);

  const handleSaveBook = () => {
    const data = {
      session,
      date,
      //   customer,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/session", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Created Successfully", { variant: "success" });
        navigate("/session");
      })
      .catch((err) => {
        setLoading(false);
        //alert("An error happened. Please check console");
        enqueueSnackbar("error", { variant: "error" });
        console.log(err);
      });
  };
  const handleSaveBundle = () => {
    for (let i = 0; i < SessionBundle.length; i++) {
      SessionBundle[i].date = date;
    }
    console.log(SessionBundle);

    setLoading(true);
    axios
      .post("http://localhost:5555/session/save_bundle", SessionBundle)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Created Successfully", { variant: "success" });
        navigate("/session");
      })
      .catch((err) => {
        setLoading(false);
        //alert("An error happened. Please check console");
        enqueueSnackbar("error", { variant: "error" });
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Session</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl text-gray-500">Date</label>
          <input
            type="date"
            // value={date}
            // value={date.toISOString().substring(0, 10)}
            onChange={(e) => setDate(new Date(e.target.value))}
            className=" border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl text-gray-500">Session</label>
          <input
            type="text"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className=" border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        {/* <div className="my-4">
          <label className="text-xl text-gray-500">Customer</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className=" border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div> */}
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBundle}>
          Save Bundle
        </button>
      </div>
    </div>
  );
};

export default CreateSession;
