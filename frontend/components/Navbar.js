import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { useGlobalContext } from "./Context";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  // const [user, setUser] = useState({});
  const { user, setUser, pLoading, logout } = useGlobalContext();

  useEffect(() => {
    const User = Cookies.get("user")
      ? JSON.parse(Cookies.get("user"))
      : Cookies.remove();
    setUser(User);
  }, []);
  return (
    <div>
      <div className="navbar">
        <div className="wrapper">
          <div className="left">
            <div className="item">
              <img src="/img/en.png" alt="" />
              <KeyboardArrowDownIcon />
            </div>
            <div className="item">
              <span>USD</span>
              <KeyboardArrowDownIcon />
            </div>
            <div className="item">
              <a className="link" to="/products/1">
                Women
              </a>
            </div>
            <div className="item">
              <a className="link" to="/products/2">
                Men
              </a>
            </div>
            <div className="item">
              <a className="link" to="/products/3">
                Children
              </a>
            </div>
          </div>
          <div className="center">
            <Link className="link" href="/">
              LAMASTORE
            </Link>
          </div>
          <div className="right">
            <div className="item">
              <a className="link" to="/">
                About
              </a>
            </div>
            <div className="item">
              <a className="link" to="/">
                Contact
              </a>
            </div>
            <div className="item">
              <a className="link" to="/">
                Stores
              </a>
            </div>
            <div className="icons">
              <SearchIcon />
              {user?.user ? (
                <div className="item">
                  <Link className="link" href="/profile">
                    {user?.user?.username}
                  </Link>
                </div>
              ) : (
                <div className="item">
                  <Link className="link" href="/login">
                    Login/SignUp
                  </Link>
                </div>
              )}

              {user && (
                <div className="item">
                  <div className="link" onClick={logout}>
                    Logout
                  </div>
                </div>
              )}

              <FavoriteBorderOutlinedIcon />
              <div className="cartIcon" onClick={() => setOpen(!open)}>
                <ShoppingCartOutlinedIcon />
                <span>{}</span>
              </div>
            </div>
          </div>
        </div>
        {open && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
