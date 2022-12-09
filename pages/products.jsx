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
    const [{ data: productsById , loading: productsByIdLoading , error: productsByIdError}, getProductsById] = useAxios({},{ manual: true } )
    
    
    const [{ data: postData, error: errorMessage, loading: productsLoading }, executeProducts] = useAxios({ url: '/api/products', method: 'POST' }, { manual: true });
    const [{ loading: updateProductsLoading, error: updateProductsError }, executeProductsPut] = useAxios({},{manual: true})
    const [{ loading: deleteProductsLoading, error: deleteProductsError }, executeProductsDelete] = useAxios({}, { manual: true })
    const [{loading: imgLoading, error: imgError},uploadImage] = useAxios({url: '/api/upload', method: 'POST'}, {manual: true})


    const [imge, setImge] = useState([])
    const [imageURL, setImageURL] = useState([])

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [detail, setDetail] = useState('');
    const [imagep, setImagep] = useState('');

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

   useEffect(() =>{
    setTitle(productsById?.title)
    setSubtitle(productsById?.subtitle)
    setDetail(productsById?.detail)
    setImagep(productsById?.imagep)
   },[productsById])

   const ShowModalCreate = () => setShowModalCreate(true);

   const ShowModalEdit = async (id) => { 
    await getProductsById({url: '/api/products/'+id,method:'GET'});
     setShowModalEdit(true);
    }
   const CloseModal = () => {setShowModalEdit(false) };
    useEffect(() => {

        if (imge.length < 1) return
        const newImageUrl = []
        imge.forEach(image1 => newImageUrl.push(URL.createObjectURL(image1)))
        setImageURL(newImageUrl)
    }, [imge])

    const onImageProductsChange = (e) => {
        setImagep([...e.target.files])
    }


    if (loading || productsByIdLoading || updateProductsLoading || deleteProductsLoading || imgLoading) return <p>Loading...</p>
    if (error || productsByIdError || updateProductsError || deleteProductsError || imgError) return <p>Error!</p>
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
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าสินค้า</h5>
                    {/* <Button variant="dark" onClick={ShowModalCreate}>
                            <FaPlus />
                        </Button> */}
                </div>

                <div className="d-flex align-items-center border-bottom py-2">
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
                            <td className="text-center"> <Image className="logo" style={{ width: "150px" }}src={products.imagep} /></td>
                            <td className="text-center">{products.title}</td>
                            <td className="text-center">{products.subtitle}</td>
                            <td className="text-center">{products.detail}</td>
                            <td className="text-center">
                            <r/>  <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(products.id)}><FaEdit /></a> <t/>     
                                  {/* <a className="btn btn-outline-danger sm-2" onClick={() => executeProductsDelete({ url: '/api/products/' + products.id, method: 'DELETE'})} ><FaTrash /></a> */}
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
                        <Form.Label className='d-block'>รูปภาพสินค้า</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imagep} alt="products_img" fluid rounded />}
                        {imageURL?.map((imageSrcProducts, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProducts} alt="products_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageProductsChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle} onChange={event => setSubtitle(event.target.value)} />
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
                       data.append('file', imagep[0])
                       const imageData = await uploadImage({data: data})
                       const id =imageData.data.result.id
                       
                       await executeProducts({
                            data: {
                                title: title,
                                subtitle: subtitle,
                                detail: detail,
                                imagep:`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,  
                            } 
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setSubtitle(''),          
                                setDetail(''),
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
                        <Form.Label className='d-block'>รูปภาพสินค้า</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imagep} alt="products_img" fluid rounded />}
                        {imageURL?.map((imageSrcProducts, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProducts} alt="products_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageProductsChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle} onChange={event => setSubtitle(event.target.value)} />
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

                        executeProductsPut({
                            url: '/api/products/' + productsById?.id,
                            method: 'PUT',
                            data: {
                                title: title,
                                subtitle: subtitle,
                                detail: detail,
                            }
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setSubtitle(''),          
                                setDetail(''),
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