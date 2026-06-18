import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8001/auth/login",
        null,
        {
          params: {
            email,
            password
          }
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      window.location.href = "/";

    } catch(error) {

      alert(
        error.response?.data?.detail ||
        "Login Failed"
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
        backdrop-blur-xl
        bg-white/10
        border
        border-white/20
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
         OnboardIQ
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
          Welcome Back 👋
        </h2>

        <p className="
          text-center
          text-gray-300
          mt-2
        ">
          Access your AI-powered onboarding workspace
        </p>

        <div className="mt-8">

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
          onClick={handleLogin}
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
          Sign In
        </button>

        <div className="
          flex
          items-center
          my-6
        ">
          <div className="flex-1 h-px bg-white/20"></div>

          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        <p className="
          text-center
          text-gray-300
          mt-8
        ">
          Don't have an account?

          <Link
            to="/register"
            className="
              text-blue-400
              ml-2
              hover:text-blue-300
            "
          >
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default login;