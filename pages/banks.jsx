import Head from 'next/head';
import { useEffect, useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { Container, Table, Button, Form, OverlayTrigger, Badge, Modal } from 'react-bootstrap';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useAxios from 'axios-hooks'

export default function BanksPage() {

  const [{ data: banksData }, getBanks] = useAxios({ url: '/api/banks' })
  const [{ data: userData }, getUsers] = useAxios({ url: '/api/users' })

  const [{ data: postData, error: errorMessage, loading: banksLoading }, executeBanks] = useAxios({ url: '/api/banks', method: 'POST' }, { manual: true });

  const [{ data: banksById , loading: banksByIdLoading , error: banksByIdError},getBanksById] = useAxios({},{ manual: true } )
  
  const [{ loading: updateBanksLoading, error: updateBanksError }, executeBanksPut] = useAxios({},{manual: true})

  const [{loading: deleteBanksLoading , error: deleteBanksError},executeBanksDelete]= useAxios({},{manual: true})

  const [username, setUserName] = useState('');
  const [accountname, setAccountname] = useState('');
  const [namebank, setNamebank] = useState('');
  const [numberbank, setNumberbank] = useState('');

  
  useEffect(()=>{
    setUserName(banksById?.userId);
    setAccountname(banksById?.accountname);
    setNamebank(banksById?.namebank);
    setNumberbank(banksById?.numberbank);
  },[banksById]);

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const ShowModalCreate = () => setShowModalCreate(true);
  const ShowModalEdit = async (id) => { 
   await getBanksById({url: '/api/banks/'+id,method:'GET'});
    setShowModalEdit(true);
   }
  const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };

  return (
    < >
      <Head>
        <title>Lucky Number</title>
        <meta
          name="description"
          content="I2AROBOT 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className=" pt-4 px-4">
        <div className="bg-secondary rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="mb-0 w-m-max me-2">ธนาคาร</h5>
            <Button variant="success" onClick={ShowModalCreate}>
              <FaPlus />
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100">
              <Table className="table table-striped text-start align-middle  align-items-center table-hover ">

                <thead>
                  <tr>
                    <th >ชื่อผู้ใช้</th>
                    <th >ธนาคาร</th>
                    <th >ชื่อเจ้าของบัญชี</th>
                    <th >เลขบัญชีธนาคาร</th>
                    <th >จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {banksData?.map((banks,index) => (
                     <tr key={index}>
                    <td>{banks?.user?.username}</td>
                    <td>{banks.accountname}</td>
                    <td>{banks.namebank}</td>
                    <td>{banks.numberbank}</td>
                    <td>
                    <a className="btn btn-sm btn-success me-2" onClick={() => ShowModalEdit(banks.id)}><FaEdit /></a>
                                            <a className="btn btn-sm btn-danger me-2" onClick={()=> executeBanksDelete({
                                                url: '/api/banks/'+banks.id,
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

      <Modal show={banksLoading || banksByIdLoading || updateBanksLoading ||deleteBanksLoading}>
        <Modal.Body className='text-center'>Loading........</Modal.Body>
      </Modal>

      <Modal  show={errorMessage || banksByIdError || updateBanksError ||deleteBanksError} >
        <Modal.Body className='text-center'>Error........</Modal.Body>
      </Modal>

      <Modal show={showModalCreate} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มบัญชี</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Select value={username} onChange={event => setUserName(event.target.value)}>
                            <option value="">ชื่อผู้ใช้</option>
                            {userData?.map((user, index) => (
                                <option key={index} value={user.id}>{user.username}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ธนาคาร</Form.Label>
                        <Form.Control type="text" value={accountname} onChange={event => setAccountname(event.target.value)} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อเจ้าของบัญชี</Form.Label>
                        <Form.Control type="text" value={namebank} onChange={event => setNamebank(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เลขบัญชีธนาคาร</Form.Label>
                        <Form.Control type="text" value={numberbank} onChange={event => setNumberbank(event.target.value)} />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                        await executeBanks({
                            data: {                        
                                userId:username,
                                accountname:accountname,
                                namebank: namebank,
                                numberbank: numberbank,
 
                            },
                        }).then(() => {
                            Promise.all([
                              setUserName(''),
                              setAccountname(''),
                              setNamebank(''),
                              setNumberbank(''),
                              getBanks(),
                              getUsers(),
                            ]).then(() => {
                                CloseModal()
                            })
                        })
                    }}>
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>

              <Modal show={banksLoading || banksByIdLoading || updateBanksLoading ||deleteBanksLoading}>
        <Modal.Body className='text-center'>Loading........</Modal.Body>
      </Modal>

      <Modal  show={errorMessage || banksByIdError || updateBanksError ||deleteBanksError} >
        <Modal.Body className='text-center'>Error........</Modal.Body>
      </Modal>

            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
            <Modal.Header closeButton >
                    <Modal.Title>แก้ไขข้อมูลบัญชี</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อผู้ใช้</Form.Label>
                        <Form.Control type="text" value={username} onChange={event => setUserName(event.target.value)} readOnly />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ธนาคาร</Form.Label>
                        <Form.Control type="text" value={accountname} onChange={event => setAccountname(event.target.value)} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อเจ้าของบัญชี</Form.Label>
                        <Form.Control type="text" value={namebank} onChange={event => setNamebank(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เลขบัญชีธนาคาร</Form.Label>
                        <Form.Control type="text" value={numberbank} onChange={event => setNumberbank(event.target.value)} />
                    </Form.Group>
    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {
                        executeBanksPut({
                            url: '/api/banks/' + banksById?.id,
                            method: 'PUT',
                            data: {
                              userId:username,
                              accountname:accountname,
                              namebank: namebank,
                              numberbank: numberbank,
                            },
                          }).then(() => {
                            Promise.all([
                              setUserName(''),
                              setAccountname(''),
                              setNamebank(''),
                              setNumberbank(''),
                              getBanks(),
                              getUser(),
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
BanksPage.layout = IndexPage;