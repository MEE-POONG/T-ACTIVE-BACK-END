import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'

export default function ProdutsPage() {

    const [{data: productsData, loading, error}, getProducts] = useAxios({url: '/api/products'})

    const [{data: headProductsData, headLoading, headError}, getHeadProducts] = useAxios({url: '/api/headproduct'})

    const [{ data: productsById , loading: productsByIdLoading , error: productsByIdError}, getProductsById] = useAxios({},{ manual: true } )
    
    
    const [{ data: postData, error: errorMessage, loading: productsLoading }, executeProducts] = useAxios({ url: '/api/products', method: 'POST' }, { manual: true });
    const [{ loading: updateProductsLoading, error: updateProductsError }, executeProductsPut] = useAxios({},{manual: true})
    const [{ loading: deleteProductsLoading, error: deleteProductsError }, executeProductsDelete] = useAxios({}, { manual: true })


    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
  
    const [header, setHeader] = useState('');
    const [subheader, setSubheader] = useState('');
    

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [detail, setDetail] = useState('');

   

   useEffect(() =>{

    setHeader(productsById?.header)
    setSubheader(productsById?.subheader)

    setTitle(productsById?.title)
    setSubtitle(productsById?.subtitle)
    setDetail(productsById?.detail)
    setImage(productsById?.image)
    
   },[productsById])

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

   const ShowModalCreate = () => setShowModalCreate(true);
   const ShowModalEdit = async (id) => { 
    await getProductsById({url: '/api/products/'+id,method:'GET'});
     setShowModalEdit(true);
    }
   const CloseModal = () => {setShowModalCreate(false) ,setShowModalEdit(false)};


    if (loading || productsByIdLoading || updateProductsLoading || deleteProductsLoading) return <p>Loading...</p>
    if (error || productsByIdError || updateProductsError || deleteProductsError) return <p>Error!</p>
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
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าสินค้า</h5>
                    <Button variant="dark" onClick={ShowModalCreate}>
                            <FaPlus />
                        </Button>
                </div>

                <div className=" w- d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">              
                    <thead>
                        <tr className="text-center">
                            <th >ชื่อหัวข้อ</th>
                            <th >ชื่อหัวข้อย่อย</th>
                        </tr>
                        </thead>

                        <tbody>
                        {headProductsData?.map((headproducts,index) => (
                            <tr key={index}>
                            <td className="text-center">{headproducts.header}</td>
                            <td className="text-center">{headproducts.subheader}</td>
                            <td className="text-center">
                            <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(headProducts.id)}><FaEdit /></a> <t/>     
                       </td>
                        </tr>
                        ))}
                          </tbody>
                         </table>
                        </div>
                    </div>
 
                <div className=" w- d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">

                        <thead>
                        <tr className="text-center">
                            <th >รูปภาพสินค้า</th>
                            <th >ชื่อสินค้า</th>
                            <th >รายละเอียดสินค้า</th>
                            <th >ประเภทสินค้า</th>
                            <th >จัดการ</th>
                        </tr>
                        </thead>

                        <tbody>
                        {productsData?.map((products,index) => (
                            <tr key={index}>
                            <td className="text-center"> <Image className="logo" style={{ width: "50px" }}src={products.image} /></td>
                            <td className="text-center">{products.title}</td>
                            <td className="text-center">{products.subtitle}</td>
                            <td className="text-center">{products.detail}</td>
                            <td className="text-center">
                            <r/>  <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(products.id)}><FaEdit /></a> <t/>     
                                  <a className="btn btn-outline-danger sm-2" onClick={() => executeProductsDelete({ url: '/api/products/' + products.id, method: 'DELETE'})} ><FaTrash /></a>
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
                    <Modal.Title>เพิ่มข้อมูลสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพสินค้า</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle} onChange={event => setSubtitle1(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail} onChange={event => setDetail1(event.target.value)} />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                       
                       await executeProducts({
                            data: {

                                title: title,
                                subtitle: subtitle,
                                detail: detail,
                                image:``,  
                            } 
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setSubtitle(''),          
                                setDetail(''),
                                setImage(''),
                                getProducts()
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
                        <Form.Label>ชื่อหัวข้อ</Form.Label>
                        <Form.Control type="text" value={header} onChange={event => setHeader(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อย่อย</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subheader} onChange={event => setSubheader(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพสินค้า1</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า1</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า1</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle} onChange={event => setSubtitle1(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม1</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail} onChange={event => setDetail1(event.target.value)} />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {

                        executeProductsPut({
                            url: '/api/products/' + productsById?.id,
                            method: 'PUT',
                            data: {
                                title: title,
                                subtitle: subtitle,
                                detail: detail,
                                image:``,  
                            }
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setSubtitle(''),          
                                setDetail(''),
                                setImage(''),
                                getProducts()
                              
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
ProdutsPage.layout = IndexPage;