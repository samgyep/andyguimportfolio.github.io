import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const Profile = () => {
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [email2, setEmail2] = useState(sessionStorage.getItem("email"));
  const [newContact, setNewContact] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const auth = sessionStorage.getItem("auth");
  const myEmail = sessionStorage.getItem("email");
  // const data = { params: { email: email, _id: id } };
  const { email } = useParams();

  console.log("email: " + email);
  console.log("id" + id);

  useEffect(() => {
    if (auth !== "true") {
      navigate("/");
    }

    axios
      .get(`http://localhost:5555/user/${email}`)
      .then((res) => {
        setId(res.data._id);
        setNewName(res.data.name);
        setNewContact(res.data.contact);
        setNewEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditProfile = () => {
    console.log("newname: " + email);
    const data = {
      email,
      name,
      contact,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/user/${email}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Edited successfully", { variant: "success" });
        sessionStorage.setItem("name", name);

        navigate("/");
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
      <h1 className="text-3xl my-4">Profile</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="relative my-4">
          <label className="text-xl text-gray-500">Name: {newName}</label>
          {myEmail == email ? (
            <button
              className="absolute right-0 mx-5 text-blue-600 underline"
              onClick={() => setPopup(true)}
            >
              {" "}
              edit{" "}
            </button>
          ) : (
            ""
          )}

          {myEmail == email ? (
            popup ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" border-2 border-gray-500 px-4 py-2 w-full"
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        <div className="my-4">
          <label className="text-xl text-gray-500">Email: {newEmail}</label>
        </div>
        <div className="my-4">
          <label className="text-xl text-gray-500">Contact: {newContact}</label>
          {myEmail == email ? (
            popup ? (
              <input
                type="string"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className=" border-2 border-gray-500 px-4 py-2 w-full"
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        {myEmail == email ? (
          popup ? (
            <button className="p-2 bg-sky-300 m-8" onClick={handleEditProfile}>
              Save
            </button>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Profile;
