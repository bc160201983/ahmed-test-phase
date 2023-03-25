import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useGlobalContext } from "./Context";
import Alert from "./Alert";
import axios from "axios";
import { headers } from "@/next.config";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { pLoading, alert, user, setUser, showAlert, logout } =
    useGlobalContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const User = Cookies.get("user")
      ? JSON.parse(Cookies.get("user"))
      : Cookies.remove();
    setUser(User);
    if (!User) router.replace("/");
  }, []);

  const getProfile = async () => {
    try {
      const res = await axios.get("http://localhost:1337/api/users/me", {
        headers: {
          Authorization: "bearer " + user?.jwt,
        },
      });

      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    data = {
      username,
      email,
      password,
    };

    try {
      const res = await axios.put(
        `http://localhost:1337/api/users/${user?.user.id}`,
        data,
        {
          headers: {
            Authorization: "bearer " + user?.jwt,
          },
        }
      );
      console.log(res.data);
      logout();
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  if (pLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="wrapperProfile">
      <div className="top">
        <div className="item">Orders</div>
        <div className="item">
          <div className="auth">
            <h1>Profile</h1>
            <form action="">
              <input
                type="text"
                name="username"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {loading ? (
                <button>Loading....</button>
              ) : (
                <button onClick={handleSubmit}>Update</button>
              )}

              {alert.show && <Alert {...alert} removeAlert={showAlert} />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
