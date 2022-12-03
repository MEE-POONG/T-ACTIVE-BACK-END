import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function AboutPage() {
    const [{data: aboutData, loading, error}, getAbout] = useAxios({url: '/api/about'})
    const [{ data: aboutById , loading: aboutByIdLoading , error: aboutByIdError}, getAboutById] = useAxios({},{ manual: true } )
    const [{ loading: updateAboutLoading, error: updateAboutError }, executeAboutPut] = useAxios({},{manual: true})



    // ----ing-----
    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [detail, setDetail] = useState('');
    const [img, setImg] = useState('');

   useEffect(() =>{
    setTitle(aboutById?.title)
    setSubtitle(aboutById?.subtitle)
    setDetail(aboutById?.detail)
    setImg(aboutById?.img)
   },[aboutById])

    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image1 => newImageUrl.push(URL.createObjectURL(image1)))
        setImageURL(newImageUrl)
    }, [image])

    const onImageAboutChange = (e) => {
        setImage([...e.target.files])
    }

   
    const [showModalEdit, setShowModalEdit] = useState(false);

    const ShowModalEdit = async (id) => { 
     await getAboutById({url: '/api/about/'+id,method:'GET'});
      setShowModalEdit(true);
     }
    const CloseModal = () => {setShowModalEdit(false) };
  

    if (loading || aboutByIdLoading || updateAboutLoading) return <p>Loading...</p>
    if (error || aboutByIdError || updateAboutError) return <p>Error!</p>
    return (
        < >
            <Head>
                <title> Lucky Number </title>
                <meta
                    name="description"
                    content="I2AROBOT 2"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Container fluid className=" pt-4 px-4">
                    <div className="bg-secondary rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลร้าน</h5>
                </div>

                <div className="d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <Table className="table table-striped text-start align-middle  align-items-center table-hover ">

                        <thead>
                        <tr>
                            <th >รูปภาพของร้าน</th>
                            <th >Title</th>
                            <th >Subtitle</th>
                            <th >Detail</th>
                        </tr>
                        </thead>
                        <tbody>
                        {aboutData?.map((about,index) => (
                            <tr key={index}>
                            <td> <Image className="logo" style={{ borderRadius: "10px" }} src={about.Image} /></td>
                            <td>{about.title}</td>
                            <td>{about.subtitle}</td>
                            <td>{about.detail}</td>
                            <td>
                            <a className="btn btn-sm btn-success me-2" onClick={() =>ShowModalEdit(about.id)}><FaEdit /></a>
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </Table>
                    </div>
                </div>
                </div>
            </Container>
          

          {/* Edit */}
            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>รายละเอียดสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={img} alt="about_img" fluid rounded />}
                        {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="about_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageAboutChange} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Subtitle</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle} onChange={event => setSubtitle(event.target.value)} />
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

                        executeAboutPut({
                            url: '/api/about/' + aboutById?.id,
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