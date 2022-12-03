import Head from 'next/head';
import { useEffect, useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge, Modal } from 'react-bootstrap';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useAxios from 'axios-hooks'

export default function UserPage() {
  const [{ data: usersData }, getUsers] = useAxios({ url: '/api/users' })

  const [{ data: postData, error: errorMessage, loading: userLoading }, executeUser] = useAxios({ url: '/api/users', method: 'POST' }, { manual: true });

  const [{ data: userById , loading: userByIdLoading , error: userByIdError},getUserById] = useAxios({},{ manual: true } )
  
  const [{ loading: updateUserLoading, error: updateUserError }, executeUserPut] = useAxios({},{manual: true})

  const [{loading: deleteUserLoading , error: deleteUserError},executeUserDelete]= useAxios({},{manual: true})

  const [username, setUserName] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');

  
  useEffect(()=>{
    setUserName(userById?.username)
    setFname(userById?.fname)
    setLname(userById?.lname)
    setTel(userById?.tel)
    setPassword(userById?.password)
  },[userById])

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const ShowModalCreate = () => setShowModalCreate(true);
  const ShowModalEdit = async (id) => { 
   await getUserById({url: '/api/users/'+id,method:'GET'});
    setShowModalEdit(true);
   }
  const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };

  if ( userLoading || userByIdLoading || updateUserLoading ||deleteUserLoading) return <p>Loading...</p>
  if (errorMessage || userByIdError || updateUserError ||deleteUserError) return <p>Error!</p>

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
            <h5 className="mb-0 w-m-max me-2">ชื่อผู้ใช้</h5>
            <Button variant="success" onClick={ShowModalCreate}>
              <FaPlus />
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100">
              <Table className="table table-striped text-start align-middle  align-items-center table-hover ">

                <thead>
                  <tr>
                    <th >username</th>
                    <th >ชื่อ-นามสกุล</th>
                    <th >เบอร์โทรศัพท์</th>
                    <th >จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData?.map((user,index) => (
                     <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.fname} {user.lname}</td>
                    <td>{user.tel}</td>
                    <td>
                    <a className="btn btn-sm btn-success me-2" onClick={() => ShowModalEdit(user.id)}><FaEdit /></a>
                                            <a className="btn btn-sm btn-danger me-2" onClick={()=> executeUserDelete({
                                                url: '/api/users/'+user.id,
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
                    <Modal.Title>เพิ่มสมาชิก</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="text" value={username} onChange={event => setUserName(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อ</Form.Label>
                        <Form.Control type="text" value={fname} onChange={event => setFname(event.target.value)} />
                        <Form.Label>นามสกุล</Form.Label>
                        <Form.Control type="text" value={lname} onChange={event => setLname(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เบอร์โทรศัพท์</Form.Label>
                        <Form.Control type="text" value={tel} onChange={event => setTel(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>password</Form.Label>
                        <Form.Control type="password" value={password} onChange={event => setPassword(event.target.value)} />
                    </Form.Group>
    
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                        await executeUser({
                            data: {
                                username:username,
                                fname:fname,
                                lname:lname,
                                tel:tel,
                                password:password,
                            }
                        }).then(() => {
                            Promise.all([
                              setUserName(''),
                              setFname(''),
                              setLname(''),
                              setTel(''),
                              setPassword(''),
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

            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
            <Modal.Header closeButton >
                    <Modal.Title>แก้ไขสมาชิก</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="text" value={username} onChange={event => setUserName(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อ-นามสกุล</Form.Label>
                        <Form.Control type="text" value={fname} onChange={event => setFname(event.target.value)} />
                        <Form.Control type="text" value={lname} onChange={event => setLname(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เบอร์โทรศัพท์</Form.Label>
                        <Form.Control type="text" value={tel} onChange={event => setTel(event.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>password</Form.Label>
                        <Form.Control type="password" value={password} onChange={event => setPassword(event.target.value)} />
                    </Form.Group>
    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {
                        executeUserPut({
                            url: '/api/users/' + userById?.id,
                            method: 'PUT',
                            data: {
                              username: username,
                              fname: fname,
                              lname: lname,
                              tel: tel,
                              password: password,
                            }
                          }).then(() => {
                            Promise.all([
                              setUserName(''),
                              setFname(''),
                              setLname(''),
                              setTel(''),
                              setPassword(''),
                              getUsers(),
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
UserPage.layout = IndexPage;