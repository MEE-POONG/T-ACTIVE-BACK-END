import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function ContactPage() {

    const [{data: contactData, loading, error}, getContact] = useAxios({url: '/api/contact/69d9db9d-6776-4f9d-a5d1-2118f85a8172' , method: 'GET'})
    const [{ loading: updateContactLoading, error: updateContactError }, executeContactPut] = useAxios({},{manual: true})
   

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [tel, setTel ] = useState('');
    const [email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [line, setLine] = useState('');
    
   useEffect(() =>{
    setTitle(contactData?.title)
    setAddress(contactData?.address)
    setTel(contactData?.tel)
    setEmail(contactData?.email)
    setFacebook(contactData?.facebook)
    setLine(contactData?.line)

   },[contactData])


    if (loading  ||  updateContactLoading ) return <p>Loading...</p>
    if (error || updateContactError ) return <p>Error!</p>
    return (
        < >
        <Head>
            <title>T-ACTIVE BACKEND</title>
            <meta name="description" content="I2AROBOT 2" />
            <link rel="icon" href="/images/logo.png" />
       </Head>
               

            <Container fluid className=" pt-4 px-4">
                    <div className="bg-secondary rounded shadow p-4">
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าติดต่อ</h5>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                </div>

                <div className="d-flex align-items-center border-bottom py-2" >
                    <div className="table-responsive w-100">

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ที่อยู่</Form.Label>
                        <Form.Control type="text"style={{ width: "800px" }} value={address} onChange={event => setAddress(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เบอร์โทรศัพท์</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={tel} onChange={event => setTel(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อีเมล์</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={email} onChange={event => setEmail(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เฟสบุค</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={facebook} onChange={event => setFacebook(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ไลน์</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={line} onChange={event => setLine(event.target.value)} />
                    </Form.Group>
                    
          
                    <Button variant="danger">
                        ยกเลิก
                    </Button> 
                    <r/>   <Button variant="success" onClick={() => {

                        executeContactPut({
                            url: '/api/contact/' + contactData?.id,
                            method: 'PUT',
                            data: {
                                title: title,
                                address: address,
                                tel: tel,
                                email: email,
                                facebook: facebook,
                                line: line,
                            }
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setAddress(''),
                                setTel(''),
                                setEmail(''),
                                setFacebook(''),
                                setLine(''),
                                getContact()
                              
                            ])

                        })

                    }}>
                    บันทึก
                </Button>

            </div>

            </div>
        </div>
        </Container>
 
            </ >
  );
}        
ContactPage.layout = IndexPage;