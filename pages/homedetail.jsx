import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
// import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'
import { CKEditor } from "ckeditor4-react";

export default function ProdutsPage() {

    const [{data: homeDetailData, homeDetailLoading, homeDetailError}, getHomeDetail] = useAxios({url: '/api/homedetail'})
    const [{data: homeDetailById,homeDetailByIdLoading, homeDetailByIdError}, getHomeDetailById] = useAxios({}, {manual:true})


    const [{ data: postData, error: errorMessage, loading: productsLoading }, executeHomeDetail] = useAxios({ url: '/api/homedetail', method: 'POST' }, { manual: true });
    const [{ loading: updateProductsLoading, error: updateProductsError }, executeHomeDetailPut] = useAxios({},{manual: true})
    const [{ loading: deleteProductsLoading, error: deleteProductsError }, executeHomeDetailDelete] = useAxios({}, { manual: true })


    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [detail, setDetail] = useState('');
    

    useEffect(() =>{
      setTitle(homeDetailById?.title)
      setSubtitle(homeDetailById?.subtitle)
      setDetail(homeDetailById?.detail)
       },[homeDetailById])

//    Modal
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);

   const ShowModalCreate = () => setShowModalCreate(true);

   const ShowModalEdit = async (id) => { 
     await getHomeDetailById({url: '/api/homedetail/'+id,method:'GET'});
     setIsShowModalEdit(true);
     }

   const CloseModal = () => {setIsShowModalEdit(false),setShowModalCreate(false)};

    return (
        < >
        <Head>
            <title>T-ACTIVE BACKEND</title>
            <meta name="description" content="I2AROBOT 2" />
            <link rel="icon" href="/images/logo.png" />
       </Head>
               
                 
            <Container fluid className=" pt-4 px-4">
                    <div className="bg-secondary rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0 w-m-max me-2">ความสัมคัญ Stevia / Production / Properties</h5>
                    <Button variant="dark" onClick={ShowModalCreate}>
                            <FaPlus />
                        </Button>
                </div>

 
                <div className=" w- d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">

                        <thead>
                        <tr className="text-center">
                            <th >ชื่อหัวข้อ</th>
                            <th >ชื่อหัวข้อย่อย</th>
                            <th >รายละเอียด</th>
                            <th >จัดการ</th>
                        </tr>
                        </thead>

                        <tbody>
                        {homeDetailData?.map((homeDetail,index) => (
                            <tr key={index}>
                            <td className="text-center">{homeDetail.title}</td>
                            <td className="text-center">{homeDetail.subtitle}</td>
                            <td className="text-center"> <div dangerouslySetInnerHTML={{ __html: homeDetail?.detail }} /> </td>
                            <td className="text-center">
                            <r/>  <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(homeDetail.id)}><FaEdit /></a> <t/>     
                                  <a className="btn btn-outline-danger sm-2" onClick={() => executeHomeDetailDelete({ url: '/api/homedetail/' + homeDetail.id, method: 'DELETE'})} ><FaTrash /></a>
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
                    <Modal.Title>เพิ่มข้อมูลหน้าแรก</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ</Form.Label>
                        <Form.Control type="text"  onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อย่อย</Form.Label>
                        <Form.Control type="text" rows={3}  onChange={event => setSubtitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>รายละเอียด</Form.Label>
                
                         
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
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                       
                       await executeHomeDetail({
                            data: {

                                title:title,
                                subtitle:subtitle,
                                detail:detail,
                            } 
                        }).then(() => {
                            Promise.all([
                                setTitle(''),
                                setSubtitle(''),
                                setDetail(''),
                                getHomeDetail()  
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
            <Modal show={isShowModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>แก้ไขข้อมูล</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อ</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อหัวข้อย่อย</Form.Label>
                        <Form.Control type="text" rows={3} value={subtitle} onChange={event => setSubtitle(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>รายละเอียด</Form.Label>
                
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
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {

                  executeHomeDetailPut({
                            url: '/api/homedetail/' + homeDetailById?.id,
                            method: 'PUT',
                            data: {
                                title:title,
                                subtitle:subtitle,
                                detail:detail,

                            }
                        }).then(() => {
                            Promise.all([
                              setTitle(''),
                              setSubtitle(''),
                              setDetail(''),
                              getHomeDetail()
                              
                            ]).then(() => {
                                CloseModal()
                            })
                        })

                    }}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>

            
        </>
    );

}        