import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'
import FormData from 'form-data';
import { CKEditor } from "ckeditor4-react";

export default function AboutPage() {

  
    const [{ data: aboutData, loading, error}, getAbout] = useAxios({url: '/api/about'})
    const [{ data: aboutById , loading: aboutByIdLoading , error: aboutByIdError}, getAboutById] = useAxios({},{ manual: true } )
    
    const [{ data: AboutPost, error: AboutPostError, loading: AboutPostLoading }, executeAboutPost] = useAxios({ url: '/api/about', method: 'POST' }, { manual: true });
    const [{ loading: updateAboutLoading, error: updateAboutError }, executeAboutPut] = useAxios({},{manual: true})
    const [{ loading: deleteAboutLoading, error: deleteAboutError }, executeAboutDelete] = useAxios({}, { manual: true })

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});
  

    

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [detail, setDetail] = useState('');
    const [img, setImg] = useState('');

    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])


   useEffect(() =>{
    setTitle(aboutById?.title)
    setSubtitle(aboutById?.subtitle)
    setDetail(aboutById?.detail)
    setImg(aboutById?.image)
   },[aboutById])

   useEffect(() => {

    if (image.length < 1) return
    const newImageUrl = []
    image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
    setImageURL(newImageUrl)
    }, [image])

    const onImageAboutChange = (e) => {
        setImage([...e.target.files])
    }



//    Modal
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
   

    const ShowModalCreate = () => setShowModalCreate(true);
   const ShowModalEdit = async (id) => { 
    await getAboutById({url: '/api/about/'+id,method:'GET'});
    setShowModalEdit(true);
    }
    
   const CloseModal = () => {setShowModalCreate(false) ,setShowModalEdit(false)};

    if (loading || aboutByIdLoading || AboutPostLoading || updateAboutLoading || deleteAboutLoading || imgLoading ) return <p>Loading...</p>
    if (error || aboutByIdError || AboutPostError || updateAboutError || deleteAboutError || imgError ) return <p>Error!</p>
    return (
        < >
        <Head>
            <title>T-ACTIVE BACKEND</title>
            <meta name="description" content="I2AROBOT 2" />
            <link rel="icon" href="/images/logo.png" />
       </Head>
               
                 
            <Container fluid className=" pt-4 px-4">
            <div className="bg-secondary rounded shadow p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h5 className="mb-0 w-m-max me-2">ข้อมูล</h5>
                        <Button variant="dark" onClick={ShowModalCreate}>
                                <FaPlus />
                        </Button>
                    </div>
 
                <div className=" w- d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                        <tr className="text-center">
                            <th >รูปภาพ</th>
                            <th >ชื่อ</th>
                            <th >รายละเอียด</th>
                            <th >อธิบายเพิ่มเติม</th>
                            <th >จัดการ</th>
                        </tr>
                        </thead>

                        <tbody>
                        {aboutData?.map((about,index) => (
                            <tr key={index}>
                            <td className="text-center"> 
                                <img className="logo" alt="" style={{ width: "50px" }} src={about.image} />
                            </td>
                            <td className="text-center">{about.title}</td>
                            <td className="text-center">{about.subtitle}</td>
                            <td className="text-center"><div dangerouslySetInnerHTML={{ __html: about?.detail }} /> </td>
                            <td className="text-center">
                                <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(about.id)}><FaEdit /></a> <t/>     
                                <a className="btn btn-outline-danger sm-2" onClick={() => executeAboutDelete({ url: '/api/about/' + about.id, method: 'DELETE'})} ><FaTrash /></a>
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
          <Modal show={showModalCreate} onHide={CloseModal}  centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มข้อมูล</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพ</Form.Label>
                            {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="About_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageAboutChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อ</Form.Label>
                        <Form.Control type="text"  onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียด</Form.Label>
                        <Form.Control as="textarea"   onChange={event => setSubtitle(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>

                        <CKEditor
                        onChange={event=> setDetail( event.editor.getData())}
                        config={{
                          uiColor: "#ddc173 ",
                          language: "th",
                          // extraPlugins: "uploadimage",
                          // filebrowserUploadMethod: "form",
                          // filebrowserUploadUrl: ("/uploader/upload"),
                          // filebrowserBrowseUrl: '/addgallery',
                          // toolbar: [
                          // ],
                          extraPlugins: "easyimage,autogrow,emoji",
                          // removePlugins: 'image',
                        }}
                        />

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
                       
                       await executeAboutPost({
                            data: {
                                title: title,
                                subtitle: subtitle,
                                detail: detail,
                                image:`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,  
                            } 
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setSubtitle(''),          
                                setDetail(''),
                                setImage(''),
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
                    <Modal.Title>รายละเอียด</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพ</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={img} alt="About_img" fluid rounded />}
                        {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="About_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageAboutChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อ</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียด</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle} onChange={event => setSubtitle(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>

                        {detail? 
                        <CKEditor
                        initData={detail}
                        onChange={event=> setDetail( event.editor.getData())}
                        config={{
                          uiColor: "#ddc173 ",
                          language: "th",
                          // extraPlugins: "uploadimage",
                          // filebrowserUploadMethod: "form",
                          // filebrowserUploadUrl: ("/uploader/upload"),
                          // filebrowserBrowseUrl: '/addgallery',
                          // toolbar: [
                          // ],
                          extraPlugins: "easyimage,autogrow,emoji",
                          // removePlugins: 'image',
                        }}
                        />
                        :
                        <CKEditor
                        onChange={event=> setDetail( event.editor.getData())}
                        config={{
                          uiColor: "#ddc173 ",
                          language: "th",
                          // extraPlugins: "uploadimage",
                          // filebrowserUploadMethod: "form",
                          // filebrowserUploadUrl: ("/uploader/upload"),
                          // filebrowserBrowseUrl: '/addgallery',
                          // toolbar: [
                          // ],
                          extraPlugins: "easyimage,autogrow,emoji",
                          // removePlugins: 'image',
                        }}
                        />}

                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async () => {

                        let data =new FormData()
                        data.append('file', image[0])
                        const imageData = await uploadImage({data: data})
                        const id =imageData.data.result.id
                        
                        await executeAboutPut({
                            url: '/api/about/' + aboutById?.id,
                            method: 'PUT',
                            data: {
                                title: title,
                                subtitle: subtitle,
                                detail: detail,
                                image:`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,  
 
                            }
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setSubtitle(''),          
                                setDetail(''),
                                setImage(''),
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
AboutPage.layout = IndexPage;