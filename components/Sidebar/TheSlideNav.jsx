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
                LuckNumber
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
              <h6 className="mb-0">Jhon Doe</h6>
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
              <Dropdown.Toggle className={
                    asPath === "/orders/orderslist"
                      ? "nav-link active"
                      : "nav-link"
                  } variant="">
                <i className="me-2 ">
                  <BsFillBagFill/>
                </i>
                จัดการออเดอร์หวย
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-transparent border-0">
                <Link id="orderslist" href="/orders/orderslist">
                  <a className="dropdown-item ">รายการสั่งซื้อหวย</a>
                </Link>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown bsPrefix="nav-item">
              <Dropdown.Toggle className={asPath === "/lottery"|| asPath === "/locknumber" || asPath === "/lottotype"
                      ? "nav-link active"
                      : "nav-link"} variant="">
                <i className="me-2">
                  <FaShoppingCart/>
                </i>
                จัดการหวย
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-transparent border-0">
              <Link id="buttons" href="/lottery">
                  <a className="dropdown-item">อัพเดทเลขที่ขาย</a>
                </Link>
                <Link id="buttons" href="/locknumber">
                  <a className="dropdown-item">อัพเดทเลขอั้น</a>
                </Link>
                <Link id="typographys" href="/lottotype">
                  <a className="dropdown-item">ประเภทหวย</a>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
            
            <Dropdown bsPrefix="nav-item">
              <Dropdown.Toggle className={asPath === "/user"|| asPath === "/banks" || asPath === "/credit"
                      ? "nav-link active"
                      : "nav-link"} variant="">
                <i className="me-2">
                  <FaUser/>
                </i>
                จัดการสมาขิก
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-transparent border-0">
                <Link id="buttons" href="/user">
                  <a className="dropdown-item">เพิ่ม/ลบ/แก้ไข สมาชิก</a>
                </Link>
                <Link id="typographys" href="/banks">
                  <a className="dropdown-item">ธนาคาร</a>
                </Link>
                <Link id="typographys" href="/credit">
                  <a className="dropdown-item">เครดิตลูกค้า</a>
                </Link>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown bsPrefix="nav-item">
              <Dropdown.Toggle className={asPath === "/about"|| asPath === "/contact" || asPath === "/sliderpicture"
                      ? "nav-link active"
                      : "nav-link"} variant="">
                <i className="me-2">
                  <FaLaptop />
                </i>
                จัดการเว็บไซต์
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-transparent border-0">
              <Link id="contact" href="/about">
                  <a className="dropdown-item">เกี่ยวกับเรา</a>
                </Link>
                <Link id="contact" href="/contact">
                  <a className="dropdown-item">ข้อมูลติดต่อ</a>
                </Link>
                <Link id="contact" href="/sliderpicture">
                  <a className="dropdown-item">สไลด์รูปภาพ</a>
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
