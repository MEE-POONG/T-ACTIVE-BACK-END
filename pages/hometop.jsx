import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
import useAxios from 'axios-hooks';
import { CKEditor } from "ckeditor4-react";
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function HomeePage() {

    const [{data: hometopData, loading, error}, gethometop] = useAxios({url: '/api/hometop'})
    const [{ loading: updatehometopLoading, error: updatehometopError }, executeHomeePut] = useAxios({},{manual: true})


 
    const [imge, setImge] = useState([])
    const [imageURL, setImageURL] = useState([])

    const [name, setName] = useState('');
    const [subName, setSubName] = useState('');
    const [link, setLink] = useState('');
   

   useEffect(() =>{
    setName(homeeData?.name)
    setSubName(homeeData?.subName)
    setLink(homeeData?.link)

   },[hometopData])

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
console.log(detail1);

    if (loading ||  updateHomeeLoading ) return <p>Loading...</p>
    if (error ||  updateHomeeError ) return <p>Error!</p>
    return (
        < >
        <Head>
        <title>T-ACTIVE BACKEND</title>
        <meta name="description" content="I2AROBOT 2" />
        <link rel="icon" href="/images/logo.png" />
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
                
                        {detail1? 
                        <CKEditor
                        initData={detail1}
                        onChange={event=> setDetail1( event.editor.getData())}
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
                        :null}
                 
                         
                        
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

                        {detail2? 
                        <CKEditor
                        initData={detail2}
                        onChange={event=> setDetail2( event.editor.getData())}
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
                        :null}

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

                        {detail3? 
                        <CKEditor
                        initData={detail3}
                        onChange={event=> setDetail3( event.editor.getData())}
                        config={{
                          uiColor: "#ddc173",
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
                        :null}
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

                                getHomee(),
                              
                              
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