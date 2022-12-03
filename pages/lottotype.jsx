
import Head from 'next/head';
import { useEffect, useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge, Modal } from 'react-bootstrap';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useAxios from 'axios-hooks'


export default function NumberTypePage() {
    const [{ data: lottotypeData }, getLottotype] = useAxios({ url: '/api/lottotype' })

    const [{ data: postData, error: errorMessage, loading: lottotypeLoading }, executeLottotype] = useAxios({ url: '/api/lottotype', method: 'POST' }, { manual: true });
  
    const [{ data: lottotypeById , loading: lottotypeByIdLoading , error: lottotypeByIdError},getLottotypeById] = useAxios({},{ manual: true } )
    
    const [{ loading: updateLottotypeLoading, error: updateLottotypeError }, executeLottotypePut] = useAxios({},{manual: true})
  
    const [{loading: deleteLottotypeLoading , error: deleteLottotypeError},executeLottotypeDelete]= useAxios({},{manual: true})
  
    const [name, setName] = useState('');
   
    
    useEffect(()=>{
      setName(lottotypeById?.name)
    
    },[lottotypeById])
  
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
  
    const ShowModalCreate = () => setShowModalCreate(true);
    const ShowModalEdit = async (id) => { 
     await getLottotypeById({url: '/api/lottotype/'+id,method:'GET'});
      setShowModalEdit(true);
     }
    const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };
  
    if ( lottotypeLoading || lottotypeByIdLoading || updateLottotypeLoading ||deleteLottotypeLoading) return <p>Loading...</p>
    if (errorMessage || lottotypeByIdError || updateLottotypeError ||deleteLottotypeError) return <p>Error!</p>



  
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
            <h5 className="mb-0 w-m-max me-2">ประเภทหวย</h5>
            <Button variant="success" onClick={ShowModalCreate}>
              <FaPlus />
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100">
              <Table className="table table-striped text-start align-middle  align-items-center table-hover ">
                <thead>
                  <tr>
                    <th>ชื่อ ประเภทหวย</th>
                   <th>จัดการ </th>
                  </tr>
                </thead>
                <tbody>
                  {lottotypeData?.map((lottotype,index) => (
                     <tr key={index}>
                    <td>{lottotype.name}</td>
                   
                    <td>
                    <a className="btn btn-sm btn-success me-2" onClick={() => ShowModalEdit(lottotype.id)}><FaEdit /></a>
                                            <a className="btn btn-sm btn-danger me-2" onClick={()=> executeLottotypeDelete({
                                                url: '/api/lottotype/'+lottotype.id,
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
                    <Modal.Title>เพิ่มประเภทหวย</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อ ประเภทหวย</Form.Label>
                        <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} />
                    </Form.Group>

                    
    
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                        await executeLottotype({
                            data: {
                                name:name,
                               
                            }
                        }).then(() => {
                            Promise.all([
                              setName(''),
                              getLottotype()
                              
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
                    <Modal.Title>เพิ่มประเภทหวย</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อ ประเภทหวย</Form.Label>
                        <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} />
                    </Form.Group>

                    
    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {
                        executeLottotypePut({
                            url: '/api/lottotype/' + lottotypeById?.id,
                            method: 'PUT',
                            data: {
                              name: name,
                             
                            }
                          }).then(() => {
                            Promise.all([
                              setName(''),
                              getLottotype()
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
NumberTypePage.layout = IndexPage;
