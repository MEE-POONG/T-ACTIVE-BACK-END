import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { Container, Image, Table, Button, Form, Modal } from 'react-bootstrap';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'
import FormData from 'form-data';
import { CKEditor } from "ckeditor4-react";

export default function AboutPage() {

    // Video
    const [{data: videoData, loading: videoLoading, error: videoError}, getVideolink] =  useAxios({url : '/api/videopresent'})
    const [{data: videoLinkById, loading: videoLinkByIdLoading, error: videoLinkByIdError}, getVideoLinkById] =  useAxios({}, {manual: true})
    const [{ loading: updateVideoLoading, error: updateVideoError }, executeVideoPut] = useAxios({},{manual: true})

    const [titlelink, setTitlelink] = useState('');
    const [linkvideo, setLinkvideo] = useState('');

    useEffect(() => {
        setTitlelink(videoLinkById?.titlelink)
        setLinkvideo(videoLinkById?.linkvideo)
    }, [videoLinkById])



    // ABOUT
    const [{ data: aboutData, loading, error}, getAbout] = useAxios({url: '/api/about'})
    const [{ data: aboutById , loading: aboutByIdLoading , error: aboutByIdError}, getAboutById] = useAxios({},{ manual: true } )
    const [{ data: AboutPost, error: AboutPostError, loading: AboutPostLoading }, executeAboutPost] = useAxios({ url: '/api/about', method: 'POST' }, { manual: true });
    const [{ loading: updateAboutLoading, error: updateAboutError }, executeAboutPut] = useAxios({},{manual: true})
    const [{ loading: deleteAboutLoading, error: deleteAboutError }, executeAboutDelete] = useAxios({}, { manual: true })

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});
  
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [detail, setDetail] = useState('');
    const [img, setImg] = useState('');

    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])


   useEffect(() =>{
    setTitle(aboutById?.title)
    setSubtitle(aboutById?.subtitle)
    setDetail(aboutById?.detail)
    setImg(aboutById?.image)
   },[aboutById])

   useEffect(() => {

    if (image.length < 1) return
    const newImageUrl = []
    image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
    setImageURL(newImageUrl)
    }, [image])

    const onImageAboutChange = (e) => {
        setImage([...e.target.files])
    }



//    Modal
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalEditSecond, setShowModalEditSecond] = useState(false);
   

    const ShowModalCreate = () => setShowModalCreate(true);
    const ShowModalEdit = async (id) => { 
    await getAboutById({url: '/api/about/'+id,method:'GET'});
    setShowModalEdit(true);
    }

    const ShowModalEditSecond = async (id) => { 
        await getVideoLinkById({url: '/api/videopresent/'+id,method:'GET'});
        setShowModalEditSecond(true);
        }
    
   const CloseModal = () => {setShowModalCreate(false) ,setShowModalEdit(false), setShowModalEditSecond(false)};

    if (loading || aboutByIdLoading || AboutPostLoading || updateAboutLoading || deleteAboutLoading || imgLoading || videoLinkByIdLoading || videoLoading || updateVideoLoading) return <p>Loading...</p>
    if (error || aboutByIdError || AboutPostError || updateAboutError || deleteAboutError || imgError || videoLinkByIdError || videoError || updateVideoError) return <p>Error!</p>
    return (
        < >
        <Head>
            <title>T-ACTIVE BACKEND</title>
            <meta name="description" content="I2AROBOT 2" />
            <link rel="icon" href="/images/logo.png" />
       </Head>
               
                 
            <Container fluid className=" pt-4 px-4">
            <div className="bg-secondary rounded shadow p-4">
                <h5>????????????????????????????????????</h5>
                    <div className="table-responsive w-100">
                    <Table className="table text-start align-middle table-bordered table-hover mb-0">              
                    <thead>
                        <tr className="text-center">
                            <th >??????????????????????????????</th>
                            <th >?????????????????????????????????</th>
                        </tr>
                        </thead>

                        <tbody>
                        {videoData?.map((videopresent,index) => (
                            <tr key={index}>
                            <td className="text-center">{videopresent.titlelink}</td>
                            <td className="text-center"> <iframe src={videopresent.linkvideo}></iframe> </td>
                            <td className="text-center">
                            <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEditSecond(videopresent.id)}><FaEdit/></a>    
                       </td>
                        </tr>
                        ))}
                          </tbody>
                         </Table>
                        </div> <br />
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h5 className="mb-0 w-m-max me-2">??????????????????</h5>
                        <Button variant="dark" onClick={ShowModalCreate}>
                                <FaPlus />
                        </Button>
                    </div>
 
                <div className=" w- d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                        <tr className="text-center">
                            <th >??????????????????</th>
                            <th >????????????</th>
                            <th >??????????????????????????????</th>
                            <th >?????????????????????????????????????????????</th>
                            <th >??????????????????</th>
                        </tr>
                        </thead>

                        <tbody>
                        {aboutData?.map((about,index) => (
                            <tr key={index}>
                            <td className="text-center"> 
                                <img className="logo" alt="" style={{ width: "150px" }} src={about.image} />
                            </td>
                            <td className="text-center">{about.title}</td>
                            <td className="text-center">{about.subtitle}</td>
                            <td className="text-center"><div dangerouslySetInnerHTML={{ __html: about?.detail }} /> </td>
                            <td className="text-center">
                                <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(about.id)}><FaEdit /></a>     
                                <a className="btn btn-outline-danger sm-2" onClick={() => executeAboutDelete({ url: '/api/about/' + about.id, method: 'DELETE'})} ><FaTrash /></a>
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
                    <Modal.Title>?????????????????????????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>??????????????????</Form.Label>
                            {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="About_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageAboutChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>????????????</Form.Label>
                        <Form.Control type="text"  onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>??????????????????????????????</Form.Label>
                        <Form.Control as="textarea"   onChange={event => setSubtitle(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>?????????????????????????????????????????????</Form.Label>

                        <CKEditor
                        onChange={event=> setDetail( event.editor.getData())}
                        config={{
                          uiColor: "#ddc173 ",
                          language: "th",
                          // extraPlugins: "uploadimage",
                          // filebrowserUploadMethod: "form",
                          // filebrowserUploadUrl: ("/uploader/upload"),
                          // filebrowserBrowseUrl: '/addgallery',
                          // toolbar: [
                          // ],
                          extraPlugins: "easyimage,autogrow,emoji",
                          // removePlugins: 'image',
                        }}
                        />

                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ??????????????????
                    </Button>
                    <Button variant="success" onClick={async event => {
                       
                       let data =new FormData()
                       data.append('file', image[0])
                       const imageData = await uploadImage({data: data})
                       const id =imageData.data.result.id
                       
                       await executeAboutPost({
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
                                getAbout()
                            ]).then(() => {
                                CloseModal()
                            })
                        })
                    }}>
                        ???????????????
                    </Button>
                </Modal.Footer>
            </Modal>

        {/* Edit Video */}
        <Modal show={showModalEditSecond} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>?????????????????????????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>??????????????????????????????</Form.Label>
                        <Form.Control type="text" value={titlelink} onChange={event => setTitlelink(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>???????????????:</Form.Label>
                        <Form.Control type="text" value={linkvideo} onChange={event => setLinkvideo(event.target.value)} />
                    </Form.Group>
                        

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ??????????????????
                    </Button>
                    <Button variant="success" onClick={() => {

                        executeVideoPut({
                            url: '/api/videopresent/' + videoLinkById?.id,
                            method: 'PUT',
                            data: {
                                titlelink:titlelink,
                                linkvideo:linkvideo,
                            }
                        }).then(() => {
                            Promise.all([
                                setTitlelink(''),
                                setLinkvideo(''),
                                getVideolink()
                              
                            ]).then(() => {
                                CloseModal()
                            })
                        })

                    }}>
                        ??????????????????
                    </Button>
                </Modal.Footer>
            </Modal>

         {/* Edit About */}
            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>??????????????????????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>??????????????????</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={img} alt="About_img" fluid rounded />}
                        {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="About_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageAboutChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>????????????</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>??????????????????????????????</Form.Label>
                        <Form.Control as="textarea" rows={3} value={subtitle} onChange={event => setSubtitle(event.target.value)} />
                    </Form.Group>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>?????????????????????????????????????????????</Form.Label>

                        {detail? 
                        <CKEditor
                        initData={detail}
                        onChange={event=> setDetail( event.editor.getData())}
                        config={{
                          uiColor: "#ddc173 ",
                          language: "th",
                          // extraPlugins: "uploadimage",
                          // filebrowserUploadMethod: "form",
                          // filebrowserUploadUrl: ("/uploader/upload"),
                          // filebrowserBrowseUrl: '/addgallery',
                          // toolbar: [
                          // ],
                          extraPlugins: "easyimage,autogrow,emoji",
                          // removePlugins: 'image',
                        }}
                        />
                        :
                        <CKEditor
                        onChange={event=> setDetail( event.editor.getData())}
                        config={{
                          uiColor: "#ddc173 ",
                          language: "th",
                          // extraPlugins: "uploadimage",
                          // filebrowserUploadMethod: "form",
                          // filebrowserUploadUrl: ("/uploader/upload"),
                          // filebrowserBrowseUrl: '/addgallery',
                          // toolbar: [
                          // ],
                          extraPlugins: "easyimage,autogrow,emoji",
                          // removePlugins: 'image',
                        }}
                        />}

                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ??????????????????
                    </Button>
                    <Button variant="success" onClick={async () => {

                        let data =new FormData()
                        data.append('file', image[0])
                        const imageData = await uploadImage({data: data})
                        const id =imageData.data.result.id
                        
                        await executeAboutPut({
                            url: '/api/about/' + aboutById?.id,
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
                                getAbout()
                            ]).then(() => {
                                CloseModal()
                            })
                        })

                    }}>
                        ??????????????????
                    </Button>
                </Modal.Footer>
            </Modal>
        </ >
    );

}        
AboutPage.layout = IndexPage;