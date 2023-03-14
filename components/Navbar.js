import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  // const products = useSelector((state) => state.cart.products);
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://bc160201983-silver-journey-9qv497gx5wxf7w66-1337.preview.app.github.dev/api/products",
        {
          method: "GET",
          headers: {
            Authorization:
              "bearer" +
              "2c9db67e833b006acb2e361dac49ee6db188ad949772c8fc74739cff12140ab30e564a3d6b739abe904265d6619e8d00a64118ff76f10a63f8e65fe24a3b5adb3f90b48b348b7ffc459f354b5e91bfd5d223d0b8182eb369e503593db6f5915eb4647a9e2608bbe2bf69f8bfa867e6abba4f4a83bd75d68f2685eb5ef6be7e89",
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  });

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
                Homepage
              </a>
            </div>
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
              <PersonOutlineOutlinedIcon />
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
