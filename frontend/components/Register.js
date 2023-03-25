import React, { useState } from "react";
import { Router, useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { headers } from "@/next.config";
import { useGlobalContext } from "./Context";
import Alert from "./Alert";
import { setToken } from "@/lib/auth";

const Register = () => {
  const router = useRouter();
  const [input, setInput] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { showAlert, alert, setToken } = useGlobalContext();
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    input.role = 0;

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        input
      );

      // const data = await res.json();
      setLoading(false);
      setToken(res.data);

      router.replace("/profile");
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (
        error.response.data.error.message ==
        "Email or Username are already taken"
      ) {
        showAlert(true, "Email or Username are already taken");
      }
      if (error.response.data.error.message == "3 errors occurred") {
        showAlert(true, "fill the required fields");
      }

      if (error.response.data.error.message == "2 errors occurred") {
        showAlert(true, "fill the required fields");
      }
      if (error.response.data.error.message == "password is a required field") {
        showAlert(true, "password is a required field");
      }
      if (error.response.data.error.message == "email is a required field") {
        showAlert(true, "email is a required field");
      }
      if (error.response.data.error.message == "username is a required field") {
        showAlert(true, "username is a required field");
      }
      // if (error.response.data.error.name == "ValidationError") {
      //   showAlert(true, "Fill the required fields");
      // } else {
      //   showAlert(true, error.response.data.error.message);
      // }
    }
  };
  return (
    <div className="auth">
      <h1>Register</h1>
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
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        {loading ? (
          <button>Loading....</button>
        ) : (
          <button onClick={handleSubmit}>Sign Up</button>
        )}

        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <span>
          Already have an account?
          <Link href="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
