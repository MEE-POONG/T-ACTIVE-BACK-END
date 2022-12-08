import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'

export default function AboutPage() {
    const [{data: aboutData, loading, error}, getAbout] = useAxios({url: '/api/about/28085e1f-3c40-4d69-b2c9-28e1924cf219' ,method: 'GET'})
    const [{ loading: updateAboutLoading, error: updateAboutError }, executeAboutPut] = useAxios({},{manual: true})



    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

    const [title1, setTitle1] = useState('');
    const [subtitle1, setSubtitle1] = useState('');
    const [detail1, setDetail1] = useState('');
    const [imagea1, setImagea1] = useState('');
    
    const [title2, setTitle2 ] = useState('');
    const [subtitle2, setSubtitle2] = useState('');
    const [detail2, setDetail2] = useState('');
    const [imagea2, setImagea2] = useState('');

    const [title3, setTitle3] = useState('');
    const [subtitle3, setSubtitle3] = useState('');
    const [detail3, setDetail3] = useState('');
    const [imagea3, setImagea3] = useState('');

   

   useEffect(() =>{
    setTitle1(aboutData?.title1)
    setSubtitle1(aboutData?.subtitle1)
    setDetail1(aboutData?.detail1)
    setImagea1(aboutData?.imagea1)

    setTitle2(aboutData?.title2)
    setSubtitle2(aboutData?.subtitle2)
    setDetail2(aboutData?.detail2)
    setImagea2(aboutData?.imagea2)

    setTitle3(aboutData?.title3)
    setSubtitle3(aboutData?.subtitle3)
    setDetail3(aboutData?.detail3)
    setImagea3(aboutData?.imagea3)

   },[aboutData])

    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image1 => newImageUrl.push(URL.createObjectURL(image1)))
        setImageURL(newImageUrl)
    }, [image])

    const onImageAboutChange = (e) => {
        setImagea1([...e.target.files])
        setImagea2([...e.target.files])
        setImagea3([...e.target.files])
    }


    if (loading || updateAboutLoading ) return <p>Loading...</p>
    if (error || updateAboutError ) return <p>Error!</p>
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
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าเกี่ยวกับ</h5>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                </div>

                
                <div className="d-flex align-items-center border-bottom py-2" >
                    <div className="table-responsive w-100">
                    
                    <Form.Group controlId="formFile" className="mb-3">   { /* 1 */}
                        <Form.Label>ชื่อหัวข้อ 1</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={title1} onChange={event => setTitle1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>หัวข้อย่อย 1</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={subtitle1} onChange={event => setSubtitle1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพของร้าน 1</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imagea1} alt="about_img" fluid rounded />}
                        {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="about_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageAboutChange} />
                    </Form.Group>
                        
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>รายละเอียด 1</Form.Label>
                        <Editor as="textarea" rows={3} value={detail1} onChange={event => setDetail1(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ 2</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={title2} onChange={event => setTitle2(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">  { /* 2 */}
                        <Form.Label>หัวข้อย่อย 2</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={subtitle2} onChange={event => setSubtitle2(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพของร้าน 2</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imagea2} alt="about_img" fluid rounded />}
                        {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="about_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageAboutChange} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">    
                    <Form.Label>รายละเอียด 2</Form.Label>
                        <Editor as="textarea" rows={3} value={detail2} onChange={event => setDetail2(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ 3</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={title3} onChange={event => setTitle3(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">   { /* 3 */}
                        <Form.Label>หัวข้อย่อย 3</Form.Label>
                        <Form.Control type="text"style={{ width: "500px" }} value={subtitle3} onChange={event => setSubtitle3(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพของร้าน 3</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imagea3} alt="about_img" fluid rounded />}
                        {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="about_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageAboutChange} />
                    </Form.Group>
                        
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>รายละเอียด 3</Form.Label>
                        <Editor as="textarea" rows={3} value={detail3} onChange={event => setDetail3(event.target.value)} />
                    </Form.Group>

                   
                    <Button variant="danger">
                        ยกเลิก
                    </Button> 
                    <r/>   <Button variant="success" onClick={() => {

                        executeAboutPut({
                            url: '/api/about/' + aboutData?.id,
                            method: 'PUT',
                            data: {
                                title1 : title1,
                                subtitle1 : subtitle1,
                                detail1 : detail1,
                                imagea1 : imagea1,

                                title2 : title2,
                                subtitle2 : subtitle2,
                                detail2 : detail2,
                                imagea2 : imagea2,

                                title3 : title3,
                                subtitle3 : subtitle3,
                                detail3 : detail3,
                                imagea3 : imagea3,
                            }
                        }).then(() => {
                            Promise.all([
                               setTitle1(''),
                               setSubtitle1(''),
                               setDetail1(''),
                               setImagea1(''),

                               setTitle2(''),
                               setDetail2(''),
                               setDetail2(''),
                               setImagea2(''),

                               setTitle3(''),
                               setDetail3(''),
                               setDetail3(''),
                               setImagea3(''),

                                getAbout()
                              
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
AboutPage.layout = IndexPage
// imagedelivery.net