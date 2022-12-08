import React from "react";
import {
  FaTable,
  FaRegKeyboard,
  FaTh,
  FaTachometerAlt,
  FaUserEdit,
  FaLaptop,
  FaRegFileAlt,
  FaRegChartBar,
  FaBars,
  FaFunnelDollar,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { Image, Dropdown, Button } from "react-bootstrap";
import { BsFillBagFill } from "react-icons/bs";

import Link from "next/link";
import { useRouter } from "next/router";

export default function TheSlideNav() {

  const { asPath } = useRouter();

  return (
    <>
      <div className="sidebar pe-4 pb-3 ">
        <nav className="navbar bg-secondary navbar-dark">
          <Link href="/">
            <a className="navbar-brand mx-4 mb-3">
              <h3 className="text-primary">
                <FaUserEdit className="fa me-2" />
                T-Active 
              </h3>
            </a>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <Image
                className="rounded-circle"
                src={"images/user.jpg"}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Stevia</h6>
              <span>Admin</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <Link href="/">
              <a className={
                    asPath === "/"
                      ? "nav-item nav-link active"
                      : "nav-link"
                  }>
                <i className="me-2 ">
                  <FaTachometerAlt />
                </i>
                Dashboard
              </a>
            </Link>

            <Dropdown bsPrefix="nav-item">
              <Dropdown.Toggle className={asPath === "/homee" || asPath === "/about"  || asPath === "/products" || asPath === "/contact"
                      ? "nav-link active"
                      : "nav-link"} variant="">
                <i className="me-2">
                  <FaLaptop />
                </i>
                จัดการเว็บไซต์
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-transparent border-0">
              <Link id="contact" href="/homee">
                  <a className="dropdown-item">หน้าหลัก</a>
                </Link>
                <Link id="contact" href="/about">
                  <a className="dropdown-item">เกี่ยวกับเรา</a>
                </Link>
                <Link id="contact" href="/products">
                  <a className="dropdown-item">สินค้า</a>
                </Link>
                <Link id="contact" href="/contact">
                  <a className="dropdown-item">ข้อมูลติดต่อ</a>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>
      </div>
    </>
  );
}
export function ButtonSlideNav() {
  const [slideOpen, setSlideOpen] = React.useState("");
  return (
    <Button
      bsPrefix="sidebar-toggler flex-shrink-0 bar-slide"
      onClick={() => setSlideOpen(slideOpen == "close" ? "open" : "close")}
    >
      <FaBars />
    </Button>
  );
}