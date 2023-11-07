import React, { useEffect, useState } from "react";
import { BsCalendar2Plus } from "react-icons/bs";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

const Calendar = () => {
  const [today, setToday] = useState(new Date());
  const [today2, setToday2] = useState(new Date());

  // today.setHours(today.getHours() + 13);
  const [newDay, setNewDay] = useState([]);
  const [newDate, setNewDate] = useState([]);
  const [test, setTest] = useState(today.toDateString().slice(0, 10));
  const [toggle, setToggle] = useState(false);
  const [date, setDate] = useState(today.toISOString().slice(0, 10));
  const [popup, setPopup] = useState(false);
  const [popValid, setPopValid] = useState("");
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const screenSize = window.innerWidth;
  const [numDays, setNumDays] = useState(9);
  const boxStyle = {
    position: "absolute",
    top: `${mouseY}px`,
    left: `${mouseX}px`,
  };

  useEffect(() => {
    today.setHours(today.getHours() + 13);
    for (let day = 1; day <= numDays; day++) {
      const Initialinfo = {
        aa: today.toISOString().slice(0, 10),
        bb: today2.toDateString().slice(0, 10),
      };
      newDay.push(Initialinfo);
      today.setDate(today.getDate() + 1);
      today2.setDate(today2.getDate() + 1);
    }
  }, [numDays]);

  const handleMouseOver = (e) => {
    setDate(e.target.value);
    setPopValid(e.target.value);
    setTest(e.target.textContent);
  };

  const previousMonth = () => {
    setNewDate([]);
    setDate("0");
    const qq = new Date(newDay[0].aa);
    const ww = new Date(newDay[0].bb);
    qq.setDate(qq.getDate() - 9);
    ww.setDate(ww.getDate() - 9);
    setToday(qq);
    setToday2(ww);
    newDay.splice(0, newDay.length);
    database(qq, ww);
  };

  function nextMonth() {
    setNewDate([]);
    setDate("0");
    const qq = new Date(newDay[0].aa);
    const ww = new Date(newDay[0].bb);
    qq.setDate(qq.getDate() + 9);
    ww.setDate(ww.getDate() + 9);
    setToday(qq);
    setToday2(ww);
    newDay.splice(0, newDay.length);
    database(qq, ww);
  }

  const database = (qq, ww) => {
    for (let day = 1; day <= 9; day++) {
      const info = {
        aa: qq.toISOString().slice(0, 10),
        bb: ww.toDateString().slice(0, 10),
      };
      newDay.push(info);
      qq.setDate(qq.getDate() + 1);
      ww.setDate(ww.getDate() + 1);
    }
    setNewDay(newDay);
  };

  function showCalendar() {
    setToggle(!toggle);
  }

  const selectDate = (e) => {
    const id = e.target.value;
    const customer = sessionStorage.getItem("name");
    const customerEmail = sessionStorage.getItem("email");
    const availability = "no";
    const data = { customer, customerEmail, availability };
    setLoading(true);
    axios
      .put(`http://localhost:5555/session/${id}`, data)
      .then(() => {
        enqueueSnackbar("Edited successfully", { variant: "success" });
        window.location.reload();
      })
      .catch((err) => {
        //alert("An error happened. Please check console");
        setLoading(false);
        enqueueSnackbar("error", { variant: "error" });
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5555/session/search?date=${date}`)
      .then((res) => {
        setNewDate(res.data);
      })
      .catch((err) => {
        alert("An error happened. Please check console");
        console.log(err);
      });
  }, [date]);

  return (
    <div>
      <button onClick={showCalendar}>
        <BsCalendar2Plus />
      </button>
      <div className={toggle ? "hidden" : "flex justify-center"}>
        <div className="p-4 border border-slate-600 rounded-md items-center w-full">
          <div className="flex justify-center items-center">
            <button
              onClick={previousMonth}
              className=" text-2xl hover:text-gray-500"
            >
              &lt;
            </button>
            <h2 className="w-20 text-center space-x-6">
              {today.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className=" text-2xl hover:text-gray-500"
            >
              &gt;
            </button>
          </div>

          <div className="flex text-sm items-center justify-center m-auto max-lg:grid ">
            {/* <div className="flex text-sm overflow-x-scroll"> */}
            {newDay.map((day) => (
              <div className="flex justify-center items-center">
                <option
                  className=" hover:text-black hover:bg-slate-200 hover:text-xl p-4 box-border h-[35px] w-[110px] rounded-lg  flex justify-center items-center"
                  onClick={(e) => {
                    setDate(e.target.value);
                  }}
                  key={day}
                  value={day.aa}
                  onMouseOver={handleMouseOver}
                  onMouseOut={() => {
                    setPopup(false);
                    // setDate();
                  }}
                >
                  {/* {day.slice(5, 13)} */}
                  {day.bb}
                </option>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" grid justify-center my-4 p-4 border border-slate-600 rounded-md items-center w-[150px]">
        <div className=" border border-solid m-1 rounded-md bg-slate-400 w-[100px] text-center">
          {test}
        </div>
        <div className=" items-center">
          {newDate.map((date) =>
            date.availability == "yes" ? (
              <div className="border my-1 border-red-700 rounded-full">
                <option
                  value={date._id}
                  onClick={selectDate}
                  className=" mx-auto rounded-full hover:cursor-pointer w-[50px] text-center"
                  onMouseOver={(e) => {
                    setPopup(true);
                    setMouseX(e.clientX + 10);
                    setMouseY(e.clientY);
                  }}
                  onMouseOut={() => setPopup(false)}
                >
                  {date.session}
                </option>
              </div>
            ) : (
              ""
            )
          )}
          {popup ? (
            <div style={boxStyle} className=" w-fit bg-slate-100 rounded-lg">
              Click to add
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
