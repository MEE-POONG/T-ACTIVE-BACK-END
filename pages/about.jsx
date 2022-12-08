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
    const [{data: aboutData, loading, error}, getAbout] = useAxios({url: '/api/about'})
    const [{ data: aboutById , loading: aboutByIdLoading , error: aboutByIdError}, getAboutById] = useAxios({},{ manual: true } )
   

    const [{ data: postData, error: errorMessage, loading: aboutLoading }, executeAbout] = useAxios({ url: '/api/about', method: 'POST' }, { manual: true });
    const [{ loading: updateAboutLoading, error: updateAboutError }, executeAboutPut] = useAxios({},{manual: true})
    const [{ loading: deleteAboutLoading, error: deleteAboutError }, executeAboutDelete] = useAxios({}, { manual: true })
    const [{loading: imgLoading, error: imgError},uploadImage] = useAxios({url: '/api/upload', method: 'POST'}, {manual: true})

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

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

   useEffect(() =>{
    setTitle1(aboutById?.title1)
    setSubtitle1(aboutById?.subtitle1)
    setDetail1(aboutById?.detail1)
    setImagea1(aboutById?.imagea1)

    setTitle2(aboutById?.title2)
    setSubtitle2(aboutById?.subtitle2)
    setDetail2(aboutById?.detail2)
    setImagea2(aboutById?.imagea2)

    setTitle3(aboutById?.title3)
    setSubtitle3(aboutById?.subtitle3)
    setDetail3(aboutById?.detail3)
    setImagea3(aboutById?.imagea3)
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
                    <div className="bg-secondary rounded shadow p-4">
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าเกี่ยวกับ</h5>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                </div>

                {aboutData?.map((about, index) => (
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
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={imagea1} alt="about_img" fluid rounded />}
                        {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="about_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageAboutChange} />
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

                        executeAboutPut({
                            url: '/api/about/' + aboutById?.id,
                            method: 'PUT',
                            data: {
                                title1 : req.body.title1,
                                subtitle1 : req.body.subtitle1,
                                detail1 : req.body.detail1,
                                imagea1 : req.body.imagea1,

                                title2 : req.body.title2,
                                subtitle2 : req.body.subtitle2,
                                detail2 : req.body.detail2,
                                imagea2 : req.body.imagea2,

                                title3 : req.body.title3,
                                subtitle3 : req.body.subtitle3,
                                detail3 : req.body.detail3,
                                imagea3 : req.body.imagea3,
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

        </ >
    );
}
AboutPage.layout = IndexPage
// imagedelivery.net