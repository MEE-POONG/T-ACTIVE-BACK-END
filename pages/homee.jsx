import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function HomeePage() {

    const [{data: homeeData, loading, error}, getHomee] = useAxios({url: '/api/homee/41307f60-def5-46fb-842c-dd5a6b48a321',method: 'GET'})
    const [{ loading: updateHomeeLoading, error: updateHomeeError }, executeHomeePut] = useAxios({},{manual: true})


 
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

   useEffect(() =>{
    setTitle1(homeeData?.title1)
    setSubtitle1(homeeData?.subtitle1)
    setDetail1(homeeData?.detail1)
    setImageh1(homeeData?.imageh1)

    setTitle2(homeeData?.title2)
    setSubtitle2(homeeData?.subtitle2)
    setDetail2(homeeData?.detail2)
    setImageh2(homeeData?.imageh2)

    setTitle3(homeeData?.title3)
    setSubtitle3(homeeData?.subtitle3)
    setDetail3(homeeData?.detail3)
    setImageh3(homeeData?.imageh3)

   },[homeeData])

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


    if (loading ||  updateHomeeLoading ) return <p>Loading...</p>
    if (error ||  updateHomeeError ) return <p>Error!</p>
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

                
                <div className="d-flex align-items-center border-bottom py-2" >
                    <div className="table-responsive w-100">
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ 1</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={title1} onChange={event => setTitle1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>หัวข้อย่อย 1</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={subtitle1} onChange={event => setSubtitle1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพของร้าน 1</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imageh1} alt="homee_img" fluid rounded />}
                        {imageURL?.map((imageSrcHomee, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcHomee} alt="homee_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageHomeeChange} />
                    </Form.Group>
                        
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>รายละเอียด 1</Form.Label>
                        <Editor as="textarea" rows={3} value={detail1} onChange={event => setDetail1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ 2</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={title2} onChange={event => setTitle2(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>หัวข้อย่อย 2</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={subtitle2} onChange={event => setSubtitle2(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพของร้าน 2</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imageh2} alt="homee_img" fluid rounded />}
                        {imageURL?.map((imageSrcHomee, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcHomee} alt="homee_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageHomeeChange} />
                    </Form.Group>
                        
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>รายละเอียด 2</Form.Label>
                        <Editor as="textarea" rows={3} value={detail2} onChange={event => setDetail2(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ 3</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={title3} onChange={event => setTitle3(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>หัวข้อย่อย 3</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={subtitle3} onChange={event => setSubtitle3(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพของร้าน 3</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imageh3} alt="homee_img" fluid rounded />}
                        {imageURL?.map((imageSrcHomee, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcHomee} alt="homee_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageHomeeChange} />
                    </Form.Group>
                        
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>รายละเอียด 3</Form.Label>
                        <Editor as="textarea" rows={3} value={detail3} onChange={event => setDetail3(event.target.value)} />
                    </Form.Group>

                   
                    <Button variant="danger">
                        ยกเลิก
                    </Button> 
                    <r/>   <Button variant="success" onClick={() => {

                        executeHomeePut({
                            url: '/api/homee/' + homeeData?.id,
                            method: 'PUT',
                            data: {
                                title1 : title1,
                                subtitle1 : subtitle1,
                                detail1 : detail1,
                                imageh1 : imageh1,

                                title2 : title2,
                                subtitle2 : subtitle2,
                                detail2 : detail2,
                                imageh2 : imageh2,

                                title3 : title3,
                                subtitle3 : subtitle3,
                                detail3 : detail3,
                                imageh3 : imageh3,
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
HomeePage.layout = IndexPage;