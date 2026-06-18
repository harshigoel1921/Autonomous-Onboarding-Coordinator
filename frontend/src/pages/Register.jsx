import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {

  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const register = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8001/auth/register",
        null,
        {
          params:{
            username,
            email,
            password
          }
        }
      );

      alert("Account Created Successfully!");

      window.location.href = "/login";

    } catch(error) {

      alert(
        error.response?.data?.detail ||
        "Registration Failed"
      );
    }
  };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-slate-900
      px-6
    ">

      <div className="
        w-full
        max-w-md
        backdrop-blur-2xl
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-10
        shadow-2xl
      ">
        <h1 className="
          text-4xl
          font-bold
          text-white
          text-center
        ">
          SmartBridge AI
        </h1>

        <p className="
          text-blue-200
          text-center
          mt-3
        ">
          Autonomous Onboarding Coordinator
        </p>

        <h2 className="
          text-3xl
          font-semibold
          text-white
          mt-10
          text-center
        ">
          Create Account
        </h2>

        <p className="
          text-center
          text-gray-300
          mt-2
        ">
          Register to start onboarding automation
        </p>

        <div className="mt-8">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-white/10
              border
              border-white/20
              text-white
              placeholder-gray-300
              mb-4
            "
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-white/10
              border
              border-white/20
              text-white
              placeholder-gray-300
              mb-4
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-white/10
              border
              border-white/20
              text-white
              placeholder-gray-300
            "
          />

        </div>

        <button
          onClick={register}
          className="
            w-full
            mt-6
            bg-blue-600
            hover:bg-blue-700
            text-white
            p-4
            rounded-xl
            font-semibold
            transition
          "
        >
          Create Account
        </button>

        <p className="
          text-center
          text-gray-300
          mt-8
        ">
          Already have an account?

          <Link
            to="/login"
            className="
              text-blue-400
              ml-2
              hover:text-blue-300
            "
          >
            Sign In
          </Link>

        </p>

        <p className="
          text-center
          text-gray-500
          text-sm
          mt-8
        ">
          © 2026 SmartBridge AI
        </p>

      </div>

    </div>
  );
}

export default Register;