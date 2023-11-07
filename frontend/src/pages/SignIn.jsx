import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [passwordEntered, setPasswordEntered] = useState("");

  const handleSubmit = () => {
    axios
      .get(`http://localhost:5555/user/${email}`)
      .then((res) => {
        const authPassword = res.data.password;
        if (authPassword == passwordEntered) {
          setId(res.data._id);
          sessionStorage.setItem("auth", true);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("name", res.data.name);
          sessionStorage.setItem("role", res.data.role);

          navigate("/");
        } else {
          alert("invalid email or password");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("second");

        // setLoading(false);
      });
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <div className=" flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className=" bg-slate-100 p-3 rounded-lg"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className=" bg-slate-100 p-3 rounded-lg"
          onChange={(e) => {
            setPasswordEntered(e.target.value);
          }}
        />
        <button
          //disabled={loading}
          className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          onClick={handleSubmit}
        >
          {/* {loading ? "Loading..." : "Sign In"} */}
          Sign In
        </button>
      </div>
      <div className=" flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/user/create">
          <span className=" text-blue-500 ">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
