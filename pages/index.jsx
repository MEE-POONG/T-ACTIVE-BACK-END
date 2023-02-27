import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { Container, Image, Table, Button, Form, Modal } from 'react-bootstrap';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'
import FormData from 'form-data';
import { CKEditor } from "ckeditor4-react";
import Link from 'next/link';
export default function HomePage() {
  return (
    <>
      <Head>
        <title>สวัสผู้ดูแลระบบ</title>
        <meta
          name="description"
          content="I2AROBOT 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className=" pt-4 px-4">
        <div className="bg-secondary rounded shadow p-4">
          <h5>ยินดีต้อนรับ ระบบจัดการข้อมูล T-Active</h5>
          <div className="table-responsive w-100">

          </div> <br />
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="mb-0 w-m-max me-2">สอบถาม / ติดปัญหา / แก้ไขข้อมูล / วิธีการใช้ระบบ</h5>
            <br />

          </div>

          <div className=" w- d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100">
              <Link href="https://www.facebook.com/meprompttecnology"  >
                <Button variant="dark"  className={"h5 py-2"}>
                  <b>
                    Facebook : Me Prompt technology- รับทำเว็บไซต์ กราฟิกดีไซน์
                  </b>
                </Button>
              </Link>
              <br />
              <Link href="https://lin.ee/mTCpJIu">
                <Button variant="dark" className={"h5 py-2"}>
                  <b>
                    Line : @961nfgbf
                  </b>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </ >
  );
}