import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'
import FormData from 'form-data';

export default function ProdutsPage() {

    const [{data: headProductsData, headLoading, headError}, getHeadProducts] = useAxios({url: '/api/headproduct'})
    const [{data: headById,headByIdLoading, headByIdError}, getHeadById] = useAxios({}, {manual:true})

    const [{data: productsData, loading, error}, getProducts] = useAxios({url: '/api/products'})
    const [{ data: productsById , loading: productsByIdLoading , error: productsByIdError}, getProductsById] = useAxios({},{ manual: true } )
    
    const [{ data: postData, error: errorMessage, loading: productsLoading }, executeProducts] = useAxios({ url: '/api/products', method: 'POST' }, { manual: true });
    const [{ loading: updateProductsLoading, error: updateProductsError }, executeProductsPut] = useAxios({},{manual: true})
    const [{ loading: deleteProductsLoading, error: deleteProductsError }, executeProductsDelete] = useAxios({}, { manual: true })

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});
    const[{loading: editLoading, error: editError}, updateImage]= useAxios({},{manual: true});

  
    const [header, setHeader] = useState('');
    const [subheader, setSubheader] = useState('');
    

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [detail, setDetail] = useState('');
    const [img, setImg] = useState('');

    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

    useEffect(() =>{
        setHeader(headById?.header)
        setSubheader(headById?.subheader)
       },[headById])

   useEffect(() =>{
    setTitle(productsById?.title)
    setSubtitle(productsById?.subtitle)
    setDetail(productsById?.detail)
    setImg(productsById?.image)
   },[productsById])

   useEffect(() => {

    if (image.length < 1) return
    const newImageUrl = []
    image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
    setImageURL(newImageUrl)
}, [image])

const onImageProductChange = (e) => {
    setImage([...e.target.files])
}



//    Modal
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [isFirstshowModalEdit, setIsFirstsShowModalEdit] = useState(false);
    const [isSecondshowModalEdit, setIsSecondShowModalEdit] = useState(false);

   const ShowModalCreate = () => setShowModalCreate(true);
   const ShowModalEditFirst = async (id) => { 
    await getHeadById({url: '/api/headproduct/'+id,method:'GET'});
    setIsFirstsShowModalEdit(true);
    }
    
    const ShowModalEditSecond = async (id) => { 
        await getProductsById({url: '/api/products/'+id,method:'GET'});
        setIsSecondShowModalEdit(true);
        }

   const CloseModal = () => {setShowModalCreate(false) ,setIsFirstsShowModalEdit(false), setIsSecondShowModalEdit(false)};

    if (loading || headLoading || headByIdLoading || productsByIdLoading || updateProductsLoading || deleteProductsLoading || imgLoading || editLoading) return <p>Loading...</p>
    if (error || headError || headByIdError || productsByIdError || updateProductsError || deleteProductsError || imgError || editError) return <p>Error!</p>
    return (
        < >
        <Head>
            <title>T-ACTIVE BACKEND</title>
            <meta name="description" content="I2AROBOT 2" />
            <link rel="icon" href="/images/logo.png" />
       </Head>
               
                 
            <Container fluid className=" pt-4 px-4">
            <div className="bg-secondary rounded shadow p-4">
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
                            <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEditFirst(headproducts.id)}><FaEdit /></a> <t/>     
                       </td>
                        </tr>
                        ))}
                          </tbody>
                         </table>
                        </div>
                    </div>

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
                            <td className="text-center"> 
                                <img className="logo" alt="" style={{ width: "50px" }} src={products.image} />
                            </td>
                            <td className="text-center">{products.title}</td>
                            <td className="text-center">{products.subtitle}</td>
                            <td className="text-center">{products.detail}</td>
                            <td className="text-center">
                            <r/>  <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEditSecond(products.id)}><FaEdit /></a> <t/>     
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
                            {imageURL.map((imageSrcProduct, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageProductChange} />
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
                       data.append('file', image[0])
                       const imageData = await uploadImage({data: data})
                       const id =imageData.data.result.id
                       
                       await executeProducts({
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

          {/* EditHead */}
            <Modal show={isFirstshowModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>แก้ไขข้อมูลหน้าสินค้า</Modal.Title>
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

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {

                        executeProductsPut({
                            url: '/api/headproduct/' + headById?.id,
                            method: 'PUT',
                            data: {
                                header: header,
                                subheader: subheader,
                            }
                        }).then(() => {
                            Promise.all([
                                setHeader(''),
                                setSubheader(''),
                                getHeadProducts()
                              
                            ]).then(() => {
                                CloseModal()
                            })
                        })

                    }}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>

               {/* EditProduct */}
            <Modal show={isSecondshowModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>รายละเอียดสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพสินค้า1</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={img} alt="product_img" fluid rounded />}
                        {imageURL?.map((imageSrcProduct, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageProductChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า1</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า1</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle} onChange={event => setSubtitle(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>อธิบายเพิ่มเติม1</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail} onChange={event => setDetail(event.target.value)} />
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
                        
                        await executeProductsPut({
                            url: '/api/products/' + productsById?.id,
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