import Head from "next/head";
import { useState, useEffect } from "react";
import IndexPage from "components/layouts/IndexPage";
// import { useRouter } from 'next/router';
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

export default function hometopPage() {

  const [{ data: hometopData, loading, error }, gethometop] = useAxios({
    url: "/api/hometop",
  });
  const [{data: homeTopById,homeTopByIdLoading, homeTopByIdError}, getHomeTopId] = useAxios({}, {manual:true})

  const [
    { loading: updatehometopLoading, error: updatehometopError },
    executeHomeePut,
  ] = useAxios({}, { manual: true });

  const [{ loading: updateHomeTopLoading, error: updateHomeTopError }, executeHomeTopPut] = useAxios({},{manual: true})

  const [imge, setImge] = useState([]);
  const [imageURL, setImageURL] = useState([]);

  const [name, setName] = useState("");
  const [subname, setSubName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setName(homeTopById?.name);
    setSubName(homeTopById?.subname);
    setLink(homeTopById?.link);
  }, [homeTopById]);

  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const ShowModalEdit = async (id) => { 
    await getHomeTopId({url: '/api/hometop/'+id,method:'GET'});
    setIsShowModalEdit(true);
    }

  useEffect(() => {
    if (imge.length < 1) return;
    const newImageUrl = [];
    imge.forEach((image1) => newImageUrl.push(URL.createObjectURL(image1)));
    setImageURL(newImageUrl);
  }, [imge]);

  const onImageHomeeChange = (e) => {
    setImage([...e.target.files]);
  };

  const CloseModal = () => {setIsShowModalEdit(false)};

  // if (loading ||  updateHomeeLoading ) return <p>Loading...</p>
  // if (error ||  updateHomeeError ) return <p>Error!</p>
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
            <h5 className="mb-0 w-m-max me-2">ข้อมูลหน้าบ้าน</h5>
          </div>

          {hometopData?.map((hometopData, index) => (
            <div key={index}>
              {detail("รูปภาพของร้าน", imageURL?.length === 0 && (
                    <Image
                      className="mb-2"
                      style={{ height: 200 }}
                      src={hometopData.image}
                      alt="hometop_img"
                      fluid
                      rounded
                    />
                  ))}
              {detail("ชื่อร้าน", hometopData.name)}
              {detail("รายละเอียดย่อย", hometopData.subname)}
              {detail("link", hometopData.link)}

              

              <Button
                variant="success"
                onClick={() =>ShowModalEdit(hometopData.id)}
              >
                แก้ไข
              </Button>
            </div>
          ))}
        </div>
      </Container>

      <Modal show={isShowModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>แก้ไขข้อมูลหน้าสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปภาพของร้าน</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={image} alt="ho_img" fluid rounded />}
                        {imageURL?.map((imageSrcHomee, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcHomee} alt="homee_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageHomeeChange} />
                    </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อร้าน</Form.Label>
                        <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดย่อย</Form.Label>
                        <Form.Control type="text" value={subname} onChange={event => setSubName(event.target.value)} />
                    </Form.Group>

                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>link</Form.Label>subtitle1
                        <Form.Control type="text"value={link} onChange={event => setLink(event.target.value)} />
                    </Form.Group>

                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {

                            executeHomeTopPut({
                            url: '/api/hometop/' + homeTopById?.id,
                            method: 'PUT',
                            data: {
                                image: '',
                                name: name,
                                subname: subname,
                                link: link,
                            }
                        }).then(() => {
                            Promise.all([
                                setImage(''),
                                setName(''),
                                setSubName(''),
                                setLink(''),
                                gethometop()
                              
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
hometopPage.layout = IndexPage;
