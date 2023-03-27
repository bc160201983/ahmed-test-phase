import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useGlobalContext } from "./Context";
import Alert from "./Alert";
import axios from "axios";
import { headers } from "@/next.config";

const Profile = () => {
  const [proLoading, setProLoading] = useState(false);
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
    setProLoading(true);
    try {
      const res = await axios.get("http://localhost:1337/api/users/me", {
        headers: {
          Authorization: "bearer " + user?.jwt,
        },
      });

      setProLoading(false);
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
    if (username != "" && username != user.user.username) {
      updateUsername(username);
    }
    if (email != "" && email != user.user.email) {
      updateEmail(email);
    }
    if (password != "") {
      updatePassword(password);
    }
  };

  const updateUsername = async (username) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:1337/api/users/${user?.user.id}`,
        { username },
        {
          headers: {
            Authorization: "bearer " + user?.jwt,
          },
        }
      );
      setLoading(false);
      console.log(res.data);
      logout();
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  const updateEmail = async (email) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:1337/api/users/${user?.user.id}`,
        { email },
        {
          headers: {
            Authorization: "bearer " + user?.jwt,
          },
        }
      );
      setLoading(false);
      console.log(res.data);
      logout();
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  const updatePassword = async (password) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:1337/api/users/${user?.user.id}`,
        { password },
        {
          headers: {
            Authorization: "bearer " + user?.jwt,
          },
        }
      );
      setLoading(false);
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
            {proLoading ? <h1>Profile Loading...</h1> : <h1>Profile</h1>}

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
