import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
// import Editor from '@/components/Ckeditor/Editor';
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

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [imageh, setImageh] = useState('');


    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

   useEffect(() =>{
    setTitle(homeeById?.title)
    setDetail(homeeById?.detail)
    setImageh(homeeById?.imageh)
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
        setImageh([...e.target.files])
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
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าหลัก</h5>
                </div>

                <div className="d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">

                        <thead>
                        <tr className="text-center">
                            <th >รูปภาพของร้าน</th>
                            <th >หัวข้อ</th>
                            <th >รายละเอียดภาพ</th>
                            <th >จัดการ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {homeeData?.map((homee,index) => (
                            <tr key={index}>
                            <td className="text-center"> <Image className="logo" style={{ width: "150px" }}src={homee.imageh} /></td>
                            <td className="text-center">{homee.title}</td>
                            <td className="text-center">{homee.detail}</td>
                            <td className="text-center">
                            <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(homee.id)}><FaEdit /></a>
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

          {/* Edit */}
            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>รายละเอียดสินค้า</Modal.Title>
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