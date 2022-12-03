import Head from "next/head";
import { useState, useEffect } from "react";
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import {Container,Image,Table,Button,Form,OverlayTrigger,Badge, Modal,Row,} from "react-bootstrap";
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from "axios-hooks";
import { FaReply, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function ContactPage() {
  const [{ data: contactData, loading, error }, getContact] = useAxios({url: "/api/contact",});
  const [{ data: contactById, loading: contactByIdLoading, error: contactByIdError }, getContactById,] = useAxios({}, { manual: true });
  const [{ loading: updateContactLoading, error: updateContactError }, executeContactPut, ] = useAxios({}, { manual: true });

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [line, setLine] = useState("");
  const [titleOpenDate, setTitleOpenDate] = useState("");
  const [openTime, setOpenTime] = useState("");

  useEffect(() => {
    setTitle(contactById?.title);
    setAddress(contactById?.address);
    setTel(contactById?.tel);
    setLine(contactById?.line);
    setTitleOpenDate(contactById?.titleOpenDate);
    setOpenTime(contactById?.openTime);
  }, [contactById]);

  const [showModalEdit, setShowModalEdit] = useState(false);

  const ShowModalEdit = async (id) => {
    await getContactById({ url: "/api/contact/" + id, method: "GET" });
    setShowModalEdit(true);
  };
  const CloseModal = () => {
    setShowModalEdit(false);
  };

  if (loading || contactByIdLoading || updateContactLoading)
    return <p>Loading...</p>;
  if (error || contactByIdError || updateContactError) return <p>Error!</p>;
  return (
    <>
      <Head>
        <title>Lucky Number</title>
        <meta name="description" content="I2AROBOT 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <link rel="icon" href="/favicon.ico" />
      <Container fluid className=" pt-4 px-4">
        <div className="bg-secondary rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="mb-0 w-m-max me-2">ข้อมูลติดต่อ</h5>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100">
              <Table className="table table-striped text-start align-middle  align-items-center table-hover ">
                <thead>
                  <tr>
                    <th>ชื่อของร้าน</th>
                    <th>ที่อยู่</th>
                    <th>เบอร์โทรศัพท์</th>
                    <th>ไลน์</th>
                    <th>วันทำการ</th>
                    <th>เวลาเปิด-ปิด</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {contactData?.map((contact, index) => (
                    <tr key={index}>
                      <td>{contact.title}</td>
                      <td>{contact.address} </td>
                      <td>{contact.tel}</td>
                      <td>{contact.line}</td>
                      <td>{contact.titleOpenDate}</td>
                      <td>{contact.openTime}</td>

                      <td>
                        <a
                          className="btn btn-sm btn-success me-2"
                          onClick={() => ShowModalEdit(contact.id)}
                        >
                          <FaEdit />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>

      <Modal
        show={showModalEdit}
        onHide={CloseModal}
        centered
        className="bg-templant"
      >
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูลติดต่อ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ชื่อของร้าน</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ที่อยู่ติดต่อ</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>เบอร์โทรศัพท์</Form.Label>
            <Form.Control
              type="text"
              value={tel}
              onChange={(event) => setTel(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ไลน์</Form.Label>
            <Form.Control
              type="text"
              value={line}
              onChange={(event) => setLine(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>วันทำการ</Form.Label>
            <Form.Control
              type="text"
              value={titleOpenDate}
              onChange={(event) => setTitleOpenDate(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>เวลาเปิด-ปิด</Form.Label>
            <Form.Control
              type="text"
              value={openTime}
              onChange={(event) => setOpenTime(event.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CloseModal}>
            ยกเลิก
          </Button>
          <Button
            variant="success"
            onClick={() => {
              executeContactPut({
                url: "/api/contact/" + contactById?.id,
                method: "PUT",
                data: {
                  title: title,
                  address: address,
                  tel: tel,
                  line: line,
                  titleOpenDate: titleOpenDate,
                  openTime: openTime,
                },
              }).then(() => {
                Promise.all([
                  setTitle(""),
                  setAddress(""),
                  setTel(""),
                  setLine(""),
                  setTitleOpenDate(""),
                  setOpenTime(""),
                  getContact(),
                ]).then(() => {
                  CloseModal();
                });
              });
            

            }}
          >
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
ContactPage.layout = IndexPage;
