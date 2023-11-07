// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import BackButton from "../components/BackButton";
// import Spinner from "../components/Spinner";
// import { useSnackbar } from "notistack";

// const ShowBook = () => {
//   const [book, setBook] = useState({});
//   const [sessions, setSessions] = useState([]);
//   const [session, setSession] = useState("");
//   const [customer, setCustomer] = useState({});
//   const navigate = useNavigate();
//   const [sessionId, setSessionId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();
//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5555/books/${id}`)
//       .then((res) => {
//         console.log(res.data);

//         setBook(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     console.log("useEffect2");

//     setLoading(true);
//     axios
//       .get("http://localhost:5555/session")
//       .then((res) => {
//         setSessions(res.data.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5555/session/${sessionId}`)
//       .then((res) => {
//         console.log("useEffect3");

//         setSession(res.data.session);

//         setLoading(false);
//       })
//       .catch((err) => {
//         setLoading(false);
//         alert("An error happened. Please check console");
//         console.log(err);
//       });
//   }, [sessionId]);
//   const handleEditSession = () => {
//     // console.log("handle edit: " + sessionId);
//     // console.log("handle session: " + session);
//     // console.log("handle customer: " + customer);

//     const data = {
//       session,
//       customer,
//     };
//     setLoading(true);
//     axios
//       .put(`http://localhost:5555/session/${sessionId}`, data)
//       .then(() => {
//         console.log("useEffect4");
//         setLoading(false);
//         enqueueSnackbar("Edited successfully", { variant: "success" });
//         navigate("/");
//       })
//       .catch((err) => {
//         setLoading(false);
//         //alert("An error happened. Please check console");
//         enqueueSnackbar("error", { variant: "error" });
//         console.log(err);
//       });
//   };
//   return (
//     <div className="p-4">
//       <BackButton />
//       {console.log("loading")}
//       <h1 className="text-3xl my-4">Show Book</h1>
//       {/* {loading ? (
//         <Spinner />
//       ) : ( */}
//       <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
//         <div className="my-4">
//           <span className="text-xl mr-4 text-gray-500">Id</span>
//           <span>{book._id}</span>
//         </div>
//         <div className="my-4">
//           <span className="text-xl mr-4 text-gray-500">Title</span>
//           <span>{book.user}</span>
//         </div>
//         <div className="my-4">
//           <span className="text-xl mr-4 text-gray-500">Author</span>
//           <span>{book.date}</span>
//         </div>
//         <div className="my-4">
//           <span className="text-xl mr-4 text-gray-500">Create Time</span>
//           <span>{new Date(book.createdAt).toString()}</span>
//         </div>
//         <div className="my-4">
//           <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
//           <span>{new Date(book.updatedAt).toString()}</span>
//         </div>
//         <div>
//           <span className="text-xl mr-4 text-gray-500">Session</span>

//           <select
//             onChange={(e) => {
//               setSessionId(e.target.value);
//               // setSession(e.target.value.session);
//               // setSession(session.session);

//               setCustomer(book.user);
//             }}
//           >
//             <option></option>
//             {sessions.map((session) => (
//               <option key={session._id} value={session._id}>
//                 {session.session}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button className="p-2 bg-sky-300 m-8" onClick={handleEditSession}>
//           Save
//         </button>
//       </div>
//       {/* )} */}
//     </div>
//   );
// };

// export default ShowBook;
