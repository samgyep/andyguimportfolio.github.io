import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const SessionTable = ({ sessions }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className=" border border-slate-600 rounded-md">No</th>
          <th className=" border border-slate-600 rounded-md">Date</th>
          <th className=" border border-slate-600 rounded-md">Session</th>
          <th className=" border border-slate-600 w-fit rounded-md max-md:hidden">
            Customer
          </th>
          <th className=" border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((session, index) => (
          //  abc = new Date(session.date);
          <tr key={session._id} className="h-8">
            <td className="border border-slate-600 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-600 rounded-md text-center">
              {session.date.slice(0, 10)}
              {/* {typeof abc} */}
            </td>
            <td className="border border-slate-600 rounded-md text-center">
              {session.session}
            </td>
            <td className="border border-slate-600 rounded-md text-center max-md:hidden ">
              {session.customerEmail ? (
                <div className="flex justify-center">
                  <span>{session.customer}</span>
                  <Link to={`/user/${session.customerEmail}`}>
                    <BsInfoCircle className="text-2xl text-yellow-600 mx-2" />
                  </Link>
                </div>
              ) : (
                ""
              )}
            </td>
            <td className="border border-slate-600 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/session/edit/${session._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/session/delete/${session._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SessionTable;
