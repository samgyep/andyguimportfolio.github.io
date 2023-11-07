import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";

const EditSession = () => {
  const [date, setDate] = useState();
  const [session, setSession] = useState("");
  const [availability, setAvailability] = useState("yes");
  const [loading, setLoading] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customer, setCustomer] = useState("");
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  console.log("customerEmail: " + availability);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/session/search?id=${id}`)
      .then((res) => {
        setSession(res.data.session);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(err);
      });
  }, []);
  const handleEditSession = () => {
    console.log("first: " + availability);

    const data = {
      session,
      date,
      customer,
      customerEmail,
      availability,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/session/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Edited successfully", { variant: "success" });
        navigate("/session");
      })
      .catch((err) => {
        setLoading(false);
        //alert("An error happened. Please check console");
        enqueueSnackbar("error", { variant: "error" });
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/user")
      .then((res) => {
        console.log("useEffect3");

        setUsers(res.data.data);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/user/${customerEmail}`)
      .then((res) => {
        console.log("useEffect3");

        setCustomer(res.data.name);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(err);
      });
  }, [customerEmail]);
  console.log("user name: " + customer);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Session</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl text-gray-500">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
        <div className="my-4">
          <label className="text-xl text-gray-500">Customer Email</label>
          <select
            onChange={(e) => {
              setCustomerEmail(e.target.value);
              setAvailability("no");
            }}
          >
            <option></option>

            {users.map((user) => (
              <option key={user._id} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="my-4">
          <label className="text-xl text-gray-500">Availability</label>
        
          <select
            onChange={(e) => {
              setAvailability(e.target.value);
            }}
          >
            <option value="yes" selected>
              yes
            </option>
            <option value="no">no</option>
          </select>
        </div> */}
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditSession}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditSession;
