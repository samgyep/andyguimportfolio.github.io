import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";

const DeleteSession = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteSession = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/session/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Deleted Successfully", { variant: "success" });
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
      <h1 className="text-3xl my-4">Delete Session</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className=" text-2xl">
          Are you sure you want to delete this session?
        </h3>
        <button
          className=" p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteSession}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteSession;
