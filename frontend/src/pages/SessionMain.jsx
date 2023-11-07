import React, { useEffect, useState } from "react";
import axios from "axios";
import SessionTable from "../components/home/SessionTable";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

const SessionMain = () => {
  const today = new Date();
  today.setHours(today.getHours() + 13);
  const [session, setSession] = useState([]);
  const [customer, setCustomer] = useState();
  const [date, setDate] = useState(today.toISOString().slice(0, 10));
  const data = { params: { customer: customer, date: date } };
  console.log("first: " + date);
  console.log("first: " + typeof date);

  useEffect(() => {
    axios
      .get("http://localhost:5555/session/search", data)
      .then((res) => {
        setSession(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date, customer]);

  return (
    <div>
      <div>
        <Link to={"/"}>Booking</Link>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">For Business Owner</h1>
          <Link to="/session/create">
            <MdOutlineAddBox className=" text-sky-800 text-4xl" />
          </Link>
        </div>
        <div className=" grid justify-center">
          <input
            type="date"
            value={date}
            placeholder="Select Date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className=" border-2 border-gray-500 px-4 py-2 w-[200px] my-1"
          />
          <input
            type="string"
            value={customer}
            placeholder="Search Customer"
            onChange={(e) => {
              setCustomer(e.target.value);
            }}
            className=" border-2 border-gray-500 px-4 py-2 w-[200px] my-1"
          />
        </div>
      </div>
      <SessionTable sessions={session} />
    </div>
  );
};

export default SessionMain;
