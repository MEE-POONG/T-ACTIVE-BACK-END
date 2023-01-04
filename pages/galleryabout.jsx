import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'
import FormData from 'form-data';

export default function GalleryaboutPage() {

    
    const [{data: galleryaboutData, loading, error}, getGalleryabout] = useAxios({url: '/api/galleryabout'})

    const [{ data: galleryaboutById , loading: galleryaboutByIdLoading , error: galleryaboutByIdError}, getGalleryaboutById] = useAxios({},{ manual: true } )
    
    const [{ data: postData, error: errorMessage, loading: galleryaboutLoading }, executeGalleryaboutPost] = useAxios({ url: '/api/galleryabout', method: 'POST' }, { manual: true });
    
    const [{ loading: deleteGalleryaboutLoading, error: deleteGalleryaboutError }, executeGalleryaboutDelete] = useAxios({}, { manual: true })

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});
  
    
    const [img, setImg] = useState('');

    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

   useEffect(() =>{
    setImg(galleryaboutById?.img)
   },[galleryaboutById])

   useEffect(() => {

    if (image.length < 1) return
    const newImageUrl = []
    image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
    setImageURL(newImageUrl)
    }, [image])

    const onImageGalleryaboutChange = (e) => {
        setImage([...e.target.files])
    }

//    Modal
    const [showModalCreate, setShowModalCreate] = useState(false);
    const ShowModalCreate = () => setShowModalCreate(true);
    const CloseModal = () => {setShowModalCreate(false) };

    if (loading || galleryaboutLoading || galleryaboutByIdLoading || deleteGalleryaboutLoading || imgLoading) return <p>Loading...</p>
    if (error ||  galleryaboutByIdError ||  deleteGalleryaboutError || imgError) return <p>Error!</p>
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
                        <h5 className="mb-0 w-m-max me-2">ข้อมูลรูปภาพ</h5>
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
                            <th >จัดการ</th>
                        </tr>
                        </thead>

                        <tbody>
                        {galleryaboutData?.map((galleryabout,index) => (
                            <tr key={index}>
                            <td className="text-center"> 
                                <img className="logo" alt="" style={{ height: "150px" }} src={galleryabout.image} />
                            </td>
                            <td className="text-center">
                            <a className="btn btn-outline-danger sm-2" onClick={() => executeGalleryaboutDelete({ url: '/api/galleryabout/' + galleryabout.id, method: 'DELETE'})} ><FaTrash /></a>    
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
                    <Modal.Title>เพิ่มรูปภาพ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพสินค้า</Form.Label>
                            {imageURL.map((imageSrcGalleryabout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcGalleryabout} alt="Gallery_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageGalleryaboutChange} />
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
                       
                       await executeGalleryaboutPost({
                            data: {
                                image:`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,  
                            } 
                        }).then(() => {
                            Promise.all([
                                setImage(''),
                                getGalleryabout()
                            ]).then(() => {
                                CloseModal()
                            })
                        })
                    }}>
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    );

}        
GalleryaboutPage.layout = IndexPage;