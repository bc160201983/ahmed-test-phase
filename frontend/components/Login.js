import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { setToken } from "@/lib/auth";
import { Router, useRouter } from "next/router";
import Cookies from "js-cookie";
import { useGlobalContext } from "./Context";
import Alert from "./Alert";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ username: "", password: "" });
  const router = useRouter();
  const { setPloading, showAlert, alert, setUser } = useGlobalContext();
  useEffect(() => {
    const User = Cookies.get("user")
      ? JSON.parse(Cookies.get("user"))
      : Cookies.remove();
    setUser(User);
    if (User) router.replace("/");
  }, []);
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: input.username,
        password: input.password,
      });
      // console.log(res.data);
      setLoading(false);

      Cookies.set("user", JSON.stringify(res.data));
      setPloading(false);
      router.replace("/profile");
    } catch (error) {
      setLoading(false);

      if (error.response.data.error.name == "ApplicationError") {
        showAlert(true, "Your account email is not confirmed");
      }
      if (error.response.data.error.message == "2 errors occurred") {
        showAlert(true, "Fill the required feilds");
      }
      if (error.response.data.error.message == "password is a required field") {
        showAlert(true, "password is a required field");
      }
      if (
        error.response.data.error.message == "Invalid identifier or password"
      ) {
        showAlert(true, "Invalid username or password");
      }

      //"Invalid identifier or password"
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form action="">
        <input
          required
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          required
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        {/* <img src={Loading.src} /> */}
        <button onClick={handleSubmit}>
          {loading ? "Loading..." : "Login"}
        </button>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <span>
          Don't have a account?
          <Link href="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
