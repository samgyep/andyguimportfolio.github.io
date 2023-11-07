import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { useSnackbar } from "notistack";

const BooksTable = ({ books, sessions }) => {
  const { enqueueSnackbar } = useSnackbar();

  const unselectDate = (e) => {
    const id = e.target.value;
    const customer = "";
    const customerEmail = "";
    const availability = "yes";
    const data = { customer, customerEmail, availability };
    console.log(data);
    axios
      .put(`http://localhost:5555/session/${id}`, data)
      .then(() => {
        enqueueSnackbar("Deleted successfully", { variant: "success" });
        window.location.reload();
      })
      .catch((err) => {
        //alert("An error happened. Please check console");
        enqueueSnackbar("error", { variant: "error" });
        console.log(err);
      });
  };
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className=" border border-slate-600 rounded-md max-[800px]:hidden">
            No
          </th>
          <th className=" border border-slate-600 rounded-md ">Date</th>
          <th className=" border border-slate-600 rounded-md ">Session</th>
          <th className=" border border-slate-600 rounded-md max-[800px]:hidden">
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((session, index) => (
          //date=book.date;
          <tr key={session._id} className="h-8">
            <td className="border border-slate-600 rounded-md text-center max-[800px]:hidden">
              {index + 1}
            </td>

            <td className="border border-slate-600 rounded-md text-center ">
              {session.date.slice(0, 10)}
            </td>
            <td className="border border-slate-600 rounded-md text-center ">
              {/* <select onChange={handleSessionChange}>
                {sessions.map((session) => (
                  <option key={session._id} value={session._id}>
                    {session.session}
                  </option>
                ))}
              </select> */}

              {session.session}
            </td>
            <td className="border border-slate-600 rounded-md text-center max-[800px]:hidden">
              <div className="flex justify-center gap-x-4">
                {/* <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>*/}
                {/* <button onClick={unselectDate} value={session._id}>
                  hhh */}
                <option
                  onClick={unselectDate}
                  value={session._id}
                  className=" text-red-600 hover:cursor-pointer "
                >
                  Delete
                </option>

                {/* </button> */}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
