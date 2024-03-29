import Head from "next/head";
import { useState, useEffect } from "react";
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
// import useAxios from 'axios-hooks';
import axios from 'axios'
import FormData from 'form-data';
import {
  Container,
  Image,
  Table,
  Button,
  Form,
  OverlayTrigger,
  Badge,
  Modal,
  Row,
} from "react-bootstrap";
import useAxios from "axios-hooks";
import { CKEditor } from "ckeditor4-react";
import { FaReply, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function HomeTopPage() {

  const [{ data: hometopData, loading, error }, getHometop] = useAxios({ url: "/api/hometop", });

  const [{data: homeTopById,homeTopByIdLoading, homeTopByIdError}, getHomeTopId] = useAxios({}, {manual:true})

  const [{ loading: updateHomeTopLoading, error: updateHomeTopError }, executeHomeTopPut] = useAxios({},{manual: true})

  const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});


  const [name, setName] = useState("");
  const [subname, setSubName] = useState("");
  const [link, setLink] = useState("");
  const [img, setImg] = useState('');

    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

  useEffect(() => {
    setName(homeTopById?.name);
    setSubName(homeTopById?.subname);
    setLink(homeTopById?.link);
    setImg(homeTopById?.image)
  }, [homeTopById]);

  //    Modal
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const ShowModalEdit = async (id) => { 
    await getHomeTopId({url: '/api/hometop/'+id,method:'GET'});
    setIsShowModalEdit(true);
    }

  useEffect(() => {
    if (image.length < 1) return
    const newImageUrl = []
    image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
    setImageURL(newImageUrl)
    }, [image])

  const onImageHometopChange = (e) => {
    setImage([...e.target.files]);
  };

  const CloseModal = () => {setIsShowModalEdit(false)};

  return (
    <>
      <Head>
        <title>T-ACTIVE BACKEND</title>
        <meta name="description" content="I2AROBOT 2" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

           
      <Container fluid className=" pt-4 px-4">
                    <div className="bg-secondary rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0 w-m-max me-2">ข้อมูลโปสเตอร์ภาพ</h5>
                </div>

 
                <div className=" w- d-flex align-items-center border-bottom py-2">
                    <div className="table-responsive w-100">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">

                        <thead>
                        <tr className="text-center">
                            <th >รูปภาพของร้าน</th>
                            <th >ชื่อร้าน</th>
                            <th >รายละเอียดย่อย</th>
                            {/* <th >ลิงค์</th> */}
                            <th >จัดการ</th>
                        </tr>
                        </thead>

                        <tbody>
                        {hometopData?.map((hometop,index) => (
                            <tr key={index}>
                               <td className="text-center"> 
                                <img className="logo" alt="" style={{ width: "150px" }}src={hometop.image} />
                            </td>
                            <td className="text-center">{hometop.name}</td>
                            <td className="text-center">{hometop.subname}</td>
                            {/* <td className="text-center"> <div dangerouslySetInnerHTML={{ __html: hometop?.link }} /> </td> */}
                            <td className="text-center">
                            <r/>  <a className="btn btn-outline-primary sm-2" onClick={() =>ShowModalEdit(hometop.id)}><FaEdit /></a> <t/>     
                                  {/* <a className="btn btn-outline-danger sm-2" onClick={() => executeHomeDetailDelete({ url: '/api/homedetail/' + hometop.id, method: 'DELETE'})} ><FaTrash /></a> */}
                       </td>
                        </tr>
                        ))}
                        </tbody>
                        </table>
                        </div>
                    </div>
                </div>

            </Container>

         {/* Edit */}
      <Modal show={isShowModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>แก้ไขข้อมูลหน้าหลัก</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพสินค้า1</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={img} alt="Hometop_img" fluid rounded />}
                        {imageURL?.map((imageSrcHometop, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcHometop} alt="Hometop_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageHometopChange} />
                    </Form.Group>
                    
                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อร้าน</Form.Label>
                        <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดย่อย</Form.Label>
                        <Form.Control type="text" value={subname} onChange={event => setSubName(event.target.value)} />
                    </Form.Group>

                    
                    {/* <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ลิงค์</Form.Label>
                        <Form.Control type="text"value={link} onChange={event => setLink(event.target.value)} />
                    </Form.Group> */}

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

                      await executeHomeTopPut({
                            url: '/api/hometop/' + homeTopById?.id,
                            method: 'PUT',
                            data: {
                                name: name,
                                subname: subname,
                                link: link,
                                image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
                           
                              }
                            }).then(() => {
                                Promise.all([
                                    setName(''),
                                    setSubName(''),          
                                    // setLink(''),
                                    setImage(''),
                                    getHometop()
                                  
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

  
  function detail(label, value) {
    return (
      <div>
        <h5>{label}</h5>
        <p>{value}</p>
      </div>
    );
  }
}
