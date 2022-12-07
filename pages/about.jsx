import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'

export default function AboutPage() {
    const [{data: aboutData, loading, error}, getAbout] = useAxios({url: '/api/about'})
    const [{ data: aboutById , loading: aboutByIdLoading , error: aboutByIdError}, getAboutById] = useAxios({},{ manual: true } )
   

    const [{ data: postData, error: errorMessage, loading: aboutLoading }, executeAbout] = useAxios({ url: '/api/about', method: 'POST' }, { manual: true });
    const [{ loading: updateAboutLoading, error: updateAboutError }, executeAboutPut] = useAxios({},{manual: true})
    const [{ loading: deleteAboutLoading, error: deleteAboutError }, executeAboutDelete] = useAxios({}, { manual: true })
    const [{loading: imgLoading, error: imgError},uploadImage] = useAxios({url: '/api/upload', method: 'POST'}, {manual: true})

    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [imagea, setImagea] = useState('');

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

   useEffect(() =>{
    setTitle(aboutById?.title)
    setDetail(aboutById?.detail)
    setImagea(aboutById?.imagea)
   },[aboutById])

   const ShowModalCreate = () => setShowModalCreate(true);

   const ShowModalEdit = async (id) => { 
    await getAboutById({url: '/api/about/'+id,method:'GET'});
     setShowModalEdit(true);
    }
   
    const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };

    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image1 => newImageUrl.push(URL.createObjectURL(image1)))
        setImageURL(newImageUrl)
    }, [image])

    const onImageAboutChange = (e) => {
        setImage([...e.target.files])
    }


    if (loading  || aboutLoading || aboutByIdLoading || updateAboutLoading  ||  deleteAboutLoading || imgLoading) return <p>Loading...</p>
    if (error || errorMessage || aboutByIdError || updateAboutError || deleteAboutError || imgError ) return <p>Error!</p>
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
                    <div className="bg-secondary rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลเกี่ยวกับร้าน</h5>
                    {/* <Button variant="dark" onClick={ShowModalCreate}>
                            <FaPlus />
                        </Button> */}
                </div>

               
                <div className="d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">

                        <thead>
                        <tr className="text-center">
                            <th >รูปภาพของร้าน</th>
                            <th >หัวข้อ</th>
                            <th >อธิบายเพิ่มเติม</th>
                            <th >จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                        {aboutData?.map((about,index) => (
                            <tr key={index}>
                            <td className="text-center"> <Image className="logo" style={{ width: "150px" }} src={about.imagea} /></td>
                            <td className="text-center">{about.title}</td>
                            <td className="text-center">{about.detail}</td>
                            <td className="text-center">
                            <r/>  <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(about.id)}><FaEdit /></a> <t/>     
                                  {/* <a className="btn btn-outline-danger sm-2" onClick={() => executeAboutDelete({ url: '/api/about/' + about.id, method: 'DELETE'})} ><FaTrash /></a> */}
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
          <Modal show={showModalCreate} onHide={CloseModal} centered className="bg-templant">
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
                        <Form.Label>หัวข้อ</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail} onChange={event => setDetail(event.target.value)} />
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
                       
                       await executeAbout({
                            data: {
                                title: title,
                                detail: detail,
                                imagea:`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,  
                            } 
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setDetail(''),
                                getAbout()
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
                    <Modal.Title>รายละเอียดสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพของร้าน</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imagea} alt="about_img" fluid rounded />}
                        {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="about_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageAboutChange} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>หัวข้อ</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail} onChange={event => setDetail(event.target.value)} />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {

                        executeAboutPut({
                            url: '/api/about/' + aboutById?.id,
                            method: 'PUT',
                            data: {
                                title: title,
                                detail: detail,
                               
                            }
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setDetail(''),
                                getAbout()
                              
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
AboutPage.layout = IndexPage
// imagedelivery.net