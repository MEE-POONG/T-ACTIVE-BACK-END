
import Head from 'next/head';
import { useEffect, useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge, Modal } from 'react-bootstrap';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useAxios from 'axios-hooks'


export default function LockNumberPage() {
    const [{ data: locknumberData }, getLocknumber] = useAxios({ url: '/api/locknumber' })

    const [{ data: postData, error: errorMessage, loading: locknumberLoading }, executeLocknumber] = useAxios({ url: '/api/locknumber', method: 'POST' }, { manual: true });
  
    const [{ data: locknumberById , loading: locknumberByIdLoading , error: locknumberByIdError},getLocknumberById] = useAxios({},{ manual: true } )
    
    const [{ loading: updateLocknumberLoading, error: updateLocknumberError }, executeLocknumberPut] = useAxios({},{manual: true})
  
    const [{loading: deleteLocknumberLoading , error: deleteLocknumberError},executeLocknumberDelete]= useAxios({},{manual: true})
  
    const [name, setName] = useState('');
   
    
    useEffect(()=>{
      setName(locknumberById?.name)
    
    },[locknumberById])
  
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
  
    const ShowModalCreate = () => setShowModalCreate(true);
    const ShowModalEdit = async (id) => { 
     await getLocknumberById({url: '/api/locknumber/'+id,method:'GET'});
      setShowModalEdit(true);
     }
    const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };
  
    if ( locknumberLoading || locknumberByIdLoading || updateLocknumberLoading ||deleteLocknumberLoading) return <p>Loading...</p>
    if (errorMessage || locknumberByIdError || updateLocknumberError ||deleteLocknumberError) return <p>Error!</p>



  
  return (
    <>
      <Head>
        <title>Lucky Number</title>
        <meta name="description" content="I2AROBOT 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className=" pt-4 px-4">
        <div className="bg-secondary rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="mb-0 w-m-max me-2">เลขอั้น</h5>
            <Button variant="success" onClick={ShowModalCreate}>
              <FaPlus />
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100">
              <Table className="table table-striped text-start align-middle  align-items-center table-hover ">
                <thead>
                  <tr>
                    <th>เลขอั้น
                        
                    </th>
                   <th>จัดการ </th>
                  </tr>
                </thead>
                <tbody>
                  {locknumberData?.map((locknumber,index) => (
                     <tr key={index}>
                    <td>{locknumber.name}</td>
                   
                    <td>
                    <a className="btn btn-sm btn-success me-2" onClick={() => ShowModalEdit(locknumber.id)}><FaEdit /></a>
                                            <a className="btn btn-sm btn-danger me-2" onClick={()=> executeLocknumberDelete({
                                                url: '/api/locknumber/'+locknumber.id,
                                                method: 'DELETE'

                                            })}><FaTrash /></a>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>

      <Modal show={showModalCreate} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มเลขอั้น</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อ เลขอั้น</Form.Label>
                        <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} />
                    </Form.Group>

                    
    
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                        await executeLocknumber({
                            data: {
                                name:name,
                               
                            }
                        }).then(() => {
                            Promise.all([
                              setName(''),
                              getLocknumber()
                              
                            ]).then(() => {
                                CloseModal()
                            })
                        })
                    }}>
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>
     

            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
            <Modal.Header closeButton >
                    <Modal.Title>แก้ไข เลขอั้น</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label> เลขอั้น</Form.Label>
                        <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} />
                    </Form.Group>

                    
    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {
                        executeLocknumberPut({
                            url: '/api/locknumber/' + locknumberById?.id,
                            method: 'PUT',
                            data: {
                              name: name,
                             
                            }
                          }).then(() => {
                            Promise.all([
                              setName(''),
                              getLocknumber()
                             
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
LockNumberPage.layout = IndexPage;