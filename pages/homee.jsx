import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function HomeePage() {

    const [{data: homeeData, loading, error}, getHomee] = useAxios({url: '/api/homee'})
    const [{ data: homeeById , loading: homeeByIdLoading , error: homeeByIdError}, getHomeeById] = useAxios({},{ manual: true } )
    
    const [{ data: postData, error: errorMessage, loading: homeeLoading }, executeHomee] = useAxios({ url: '/api/homee', method: 'POST' }, { manual: true });
    const [{ loading: updateHomeeLoading, error: updateHomeeError }, executeHomeePut] = useAxios({},{manual: true})
    const [{ loading: deleteHomeeLoading, error: deleteHomeeError }, executeHomeeDelete] = useAxios({}, { manual: true })
    const [{loading: imgLoading, error: imgError},uploadImage] = useAxios({url: '/api/upload', method: 'POST'}, {manual: true})

 
    const [imge, setImge] = useState([])
    const [imageURL, setImageURL] = useState([])

    const [title1, setTitle1] = useState('');
    const [subtitle1, setSubtitle1] = useState('');
    const [detail1, setDetail1] = useState('');
    const [imageh1, setImageh1] = useState('');
    
    const [title2, setTitle2 ] = useState('');
    const [subtitle2, setSubtitle2] = useState('');
    const [detail2, setDetail2] = useState('');
    const [imageh2, setImageh2] = useState('');

    const [title3, setTitle3] = useState('');
    const [subtitle3, setSubtitle3] = useState('');
    const [detail3, setDetail3] = useState('');
    const [imageh3, setImageh3] = useState('');

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

   useEffect(() =>{
    setTitle1(homeeById?.title1)
    setSubtitle1(homeeById?.subtitle1)
    setDetail1(homeeById?.detail1)
    setImageh1(homeeById?.imageh1)

    setTitle2(homeeById?.title2)
    setSubtitle2(homeeById?.subtitle2)
    setDetail2(homeeById?.detail2)
    setImageh2(homeeById?.imageh2)

    setTitle3(homeeById?.title3)
    setSubtitle3(homeeById?.subtitle3)
    setDetail3(homeeById?.detail3)
    setImageh3(homeeById?.imageh3)

   },[homeeById])


    const ShowModalCreate = () => setShowModalCreate(true);

    const ShowModalEdit = async (id) => { 
     await getHomeeById({url: '/api/homee/'+id,method:'GET'});
      setShowModalEdit(true);
     }

     const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };

    useEffect(() => {

        if (imge.length < 1) return
        const newImageUrl = []
        imge.forEach(image1 => newImageUrl.push(URL.createObjectURL(image1)))
        setImageURL(newImageUrl)
    }, [imge])

    const onImageHomeeChange = (e) => {
        setImageh1([...e.target.files])
        setImageh2([...e.target.files])
        setImageh3([...e.target.files])
    }


    if (loading || homeeByIdLoading || updateHomeeLoading || deleteHomeeLoading || imgLoading) return <p>Loading...</p>
    if (error || homeeByIdError || updateHomeeError || deleteHomeeError || imgError) return <p>Error!</p>
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
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าหลัก</h5>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                </div>

                {homeeData?.map((homee, index) => (
                <div className="d-flex align-items-center border-bottom py-2"  key={index}>
                    <div className="table-responsive w-100">

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={title1} onChange={event => setTitle1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>หัวข้อย่อย</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={subtitle1} onChange={event => setSubtitle1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพของร้าน</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imageh1} alt="homee_img" fluid rounded />}
                        {imageURL?.map((imageSrcHomee, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcHomee} alt="homee_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageHomeeChange} />
                    </Form.Group>
                        
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>รายละเอียด</Form.Label>
                        <Editor as="textarea" rows={3} value={detail1} onChange={event => setDetail1(event.target.value)} />
                    </Form.Group>
                    
                     <Modal.Footer>
                    <Button variant="danger" onClick={CloseModal}>
                        ยกเลิก
                    </Button> 
                    <r/>   <Button variant="success" onClick={() => {

                        executeHomeePut({
                            url: '/api/homee/' + homeeById?.id,
                            method: 'PUT',
                            data: {
                                title1 : req.body.title1,
                                subtitle1 : req.body.subtitle1,
                                detail1 : req.body.detail1,
                                imageh1 : req.body.imageh1,

                                title2 : req.body.title2,
                                subtitle2 : req.body.subtitle2,
                                detail2 : req.body.detail2,
                                imageh2 : req.body.imageh2,

                                title3 : req.body.title3,
                                subtitle3 : req.body.subtitle3,
                                detail3 : req.body.detail3,
                                imageh3 : req.body.imageh3,
                            }
                        }).then(() => {
                            Promise.all([
                               setTitle1(''),
                               setSubtitle1(''),
                               setDetail1(''),
                               setImageh1(''),

                               setTitle2(''),
                               setDetail2(''),
                               setDetail2(''),
                               setImageh2(''),

                               setTitle3(''),
                               setDetail3(''),
                               setDetail3(''),
                               setImageh3(''),

                                getHomee()
                              
                            ]).then(() => {
                                CloseModal()
                            })
                        })

                    }}>
                        บันทึก
                    </Button>
                </Modal.Footer>

                    </div>

                </div>

                ))}

            </div>
            </Container>
      

  {/* Create */}
  {/* <Modal show={showModalCreate} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มข้อมูลเกี่ยวกับ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imageh} alt="homee_img" fluid rounded />}
                        {imageURL?.map((imageSrcHomee, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcHomee} alt="homee_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageHomeeChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียด</Form.Label>
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
                       
                       await executeHomee({
                            data: {
                                title: title,
                                detail: detail,
                                imagea:`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,  
                            } 
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setDetail(''),
                                getHomee()
                            ]).then(() => {
                                CloseModal()
                            })
                        })
                    }}>
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal> */}

          {/* Edit 1 */}
            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>รายละเอียดสินค้า</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body> */}

                    {/* <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imageh} alt="homee_img" fluid rounded />}
                        {imageURL?.map((imageSrcHomee, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcHomee} alt="homee_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageHomeeChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียด</Form.Label>
                        <Form.Control as="textarea" rows={3} value={detail} onChange={event => setDetail(event.target.value)} />
                    </Form.Group>

               <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ</Form.Label>
                                {imageURL.map(imageSrcHomee => <Image className="mb-2" style={{ height: 200 }} src={imageSrcHomee} alt="product_img" fluid rounded />)}
                                <input type="file" accept="image/*" onChange={onImageHomeeChange} className="form-control" id="#" placeholder='' />
                                <div className="mb-3">
                                    <label for="Inputphone" className="form-label">รายละเอียดร้าน</label>
                                    <Editor/>
                                </div>

                                </Form.Group>

                            <button type="submit" className="btn btn-success"  >ยืนยัน</button>
                        

                </Modal.Body> */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {

                        executeHomeePut({
                            url: '/api/homee/' + homeeById?.id,
                            method: 'PUT',
                            data: {
                                title: title,
                                detail: detail,
                            }
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setDetail(''),
                                getHomee()
                              
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
HomeePage.layout = IndexPage;