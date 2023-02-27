import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
<<<<<<< HEAD
import { Container, Image, Table, Button, Form, Modal } from 'react-bootstrap';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'
import FormData from 'form-data';
import { CKEditor } from "ckeditor4-react";
=======
import { Container } from 'react-bootstrap';
>>>>>>> 5d91d031eef8648e87aab4056821be0c24bcc9d6
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
          <h5>ยินดีต้อนรับ</h5>
          <div className="table-responsive w-100">

          </div> <br />
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="mb-0 w-m-max me-2">ข้อมูล</h5>
            <Button variant="dark">
              <FaPlus />
            </Button>
          </div>

          <div className=" w- d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100">

            </div>
          </div>
        </div>
      </Container>
    </ >
  );
}