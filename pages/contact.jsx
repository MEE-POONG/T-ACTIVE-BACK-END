import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function ContactPage() {

    const [{data: contactData, loading, error}, getContact] = useAxios({url: '/api/contact'})
    const [{ data: contactById , loading: contactByIdLoading , error: contactByIdError}, getContactById] = useAxios({},{ manual: true } )

    const [{ data: postData, error: errorMessage, loading: contactLoading }, executeContact] = useAxios({ url: '/api/contact', method: 'POST' }, { manual: true });
    const [{ loading: updateContactLoading, error: updateContactError }, executeContactPut] = useAxios({},{manual: true})
    const [{ loading: deleteContactLoading, error: deleteContactError }, executeContactDelete] = useAxios({}, { manual: true })
    // const [{loading: imgLoading, error: imgError},uploadImage] = useAxios({url: '/api/upload', method: 'POST'}, {manual: true})

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [tel, setTel ] = useState('');
    const [email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [line, setLine] = useState('');
    
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

   useEffect(() =>{
    setTitle(contactById?.title)
    setAddress(contactById?.address)
    setTel(contactById?.tel)
    setEmail(contactById?.email)
    setFacebook(contactById?.facebook)
    setLine(contactById?.line)

   },[contactById])

   const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };

    const ShowModalEdit = async (id) => { 
     await getContactById({url: '/api/contact/'+id,method:'GET'});
      setShowModalEdit(true);
     }

  

    if (loading  || contactLoading  || contactByIdLoading || updateContactLoading || deleteContactLoading) return <p>Loading...</p>
    if (error || errorMessage || contactByIdError || updateContactError || deleteContactError) return <p>Error!</p>
    return (
        < >
            <Head>
                <title> T-Active Stevia Syrup </title>
                <meta
                    name="description"
                    content="I2AROBOT 2"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            
            <Container fluid className=" pt-4 px-4">
                    <div className="bg-secondary rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลช่องทางติดต่อ</h5>
                </div>

                <div className="d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">

                        <thead>
                        <tr className="text-center">
                            <th >ชื่อของร้าน</th>
                            <th >ที่ตั้งร้าน</th>
                            <th >เบอร์โทรศัพท์</th>
                            <th >อีเมล์</th>
                            <th >เฟสบุค</th>
                            <th >ไลน์</th>
                            <th >จัดการ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contactData?.map((contact,index) => (
                            <tr key={index}>
                            <td className="text-center">{contact.title}</td>
                            <td className="text-center">{contact.address}</td>
                            <td className="text-center">{contact.tel}</td>
                            <td className="text-center">{contact.email}</td>
                            <td className="text-center">{contact.facebook}</td>
                            <td className="text-center">{contact.line}</td>
                            <td className="text-center">
                            <a className="btn btn-outline-primary sm-1" onClick={() =>ShowModalEdit(contact.id)}><FaEdit /></a>
                            {/* <a className="btn btn-outline-danger sm-1" onClick={() => executeContactDelete({ url: '/api/contact/' + contact.id, method: 'DELETE'})} ><FaTrash /></a> */}
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </Container>
      
 
          {/* Create */}
          {/* <Modal show={showModalCreate} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มข้อมูลเกี่ยวกับ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพของร้าน</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imagea} alt="about_img" fluid rounded />}
                        {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="about_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageAboutChange} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อของร้าน</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ที่ตั้งร้าน</Form.Label>
                        <Form.Control as="textarea" rows={3} value={address} onChange={event => setAddress(event.target.value)} />
                    </Form.Group>

                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เบอร์โทรศัพท์</Form.Label>
                        <Form.Control as="textarea" rows={3} value={tel} onChange={event => setTel(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อีเมล์</Form.Label>
                        <Form.Control as="textarea" rows={3} value={email} onChange={event => setEmail(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เฟสบุค</Form.Label>
                        <Form.Control as="textarea" rows={3} value={facebook} onChange={event => setFacebook(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ไลน์</Form.Label>
                        <Form.Control as="textarea" rows={3} value={line} onChange={event => setLine(event.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                       
                       let data =new FormData()
                       data.append('file', image[0])
                       const imageData = await uploadImage({data: data})
                       const id =imageData.data.result.id
                       
                       await executeContact({
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
                          
                        ]).then(() => {
                            CloseModal()
                            })
                        })
                    }}>
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>



          {/* Edit */}
            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>รายละเอียดของร้าน</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อของร้าน</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ที่ตั้งร้าน</Form.Label>
                        <Form.Control as="textarea" rows={3} value={address} onChange={event => setAddress(event.target.value)} />
                    </Form.Group>

                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เบอร์โทรศัพท์</Form.Label>
                        <Form.Control as="textarea" rows={3} value={tel} onChange={event => setTel(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อีเมล์</Form.Label>
                        <Form.Control as="textarea" rows={3} value={email} onChange={event => setEmail(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เฟสบุค</Form.Label>
                        <Form.Control as="textarea" rows={3} value={facebook} onChange={event => setFacebook(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ไลน์</Form.Label>
                        <Form.Control as="textarea" rows={3} value={line} onChange={event => setLine(event.target.value)} />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {

                        executeContactPut({
                            url: '/api/contact/' + contactById?.id,
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
                              
                            ]).then(() => {
                                CloseModal()
                            })
                        })

                    }}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>
        </ >
    ); 

}        
ContactPage.layout = IndexPage;