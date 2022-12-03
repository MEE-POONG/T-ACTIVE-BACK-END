import Head from 'next/head';
import { useEffect, useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge, Modal } from 'react-bootstrap';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useAxios from 'axios-hooks'


export default function LotteryPage() {

  const [{ data: lotteryData }, getLottery] = useAxios({ url: '/api/lottery' }) 
  const [{data: lottotypeData}, getLottotype] = useAxios({ url: '/api/lottotype' })

  const [{ data: postData, error: errorMessage, loading: lotteryLoading }, executeLottery] = useAxios({ url: '/api/lottery', method: 'POST' }, { manual: true });

  const [{ data: lotteryById , loading: lotteryByIdLoading , error: lotteryByIdError},getLotteryById] = useAxios({},{ manual: true } )
  
  const [{ loading: updateLotteryLoading, error: updateLotteryError }, executeLotteryPut] = useAxios({},{manual: true})

  const [{loading: deleteLotteryLoading , error: deleteLotteryError},executeLotteryDelete]= useAxios({},{manual: true})

  const [numberlotto, setNumberlotto] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  
  useEffect(()=>{
    setNumberlotto(lotteryById?.numberlotto)
    setPrice(lotteryById?.price)
    setType(lotteryById?.lottotypeId)
  },[lotteryById])

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const ShowModalCreate = () => setShowModalCreate(true);
  const ShowModalEdit = async (id) => { 
   await getLotteryById({url: '/api/lottery/'+id,method:'GET'});
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
            <h5 className="mb-0 w-m-max me-2">เลขหวย</h5>
            <Button variant="success" onClick={ShowModalCreate}>
              <FaPlus />
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100">
              <Table className="table table-striped text-start align-middle  align-items-center table-hover ">

                <thead>
                  <tr>
                    <th >เลขหวย</th>
                    <th >ราคา</th>
                    <th >ประเภท</th>
                    <th >จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {lotteryData?.map((lottery,index) => (
                     <tr key={index}>
                    <td>{lottery.numberlotto}</td>
                    <td>{lottery.price}</td>
                    <td>{lottery?.lottotype?.name}</td>
                    <td>
                    <a className="btn btn-sm btn-success me-2" onClick={() => ShowModalEdit(lottery.id)}><FaEdit/></a>
                                        <a className="btn btn-sm btn-danger me-2" onClick={()=> executeLotteryDelete({
                                                url: '/api/lottery/'+lottery.id,
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

      <Modal show={lotteryLoading || lotteryByIdLoading || updateLotteryLoading ||deleteLotteryLoading}>
        <Modal.Body className='text-center'>Lodeing........</Modal.Body>
      </Modal>

      <Modal  show={errorMessage || lotteryByIdError || updateLotteryError ||deleteLotteryError} >
        <Modal.Body className='text-center'>Error........</Modal.Body>
      </Modal>

      <Modal show={showModalCreate} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มหวย</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Select value={type} onChange={event => setType(event.target.value)}>
                            <option value="">ประเภทหวย</option>
                            {lottotypeData?.map((type, index) => (
                                <option key={index} value={type.id}>{type.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เลขหวย</Form.Label>
                        <Form.Control type="number" value={numberlotto} onChange={event => setNumberlotto(event.target.value)} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ราคา</Form.Label>
                        <Form.Control type="number" value={price} onChange={event => setPrice(event.target.value)} />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                        await executeLottery({
                            data: {                        
                                lottotypeId:type,
                                numberlotto:numberlotto,
                                price:price,
                            }
                        }).then(() => {
                            CloseModal()
                            Promise.all([
                                setType(''),
                                setNumberlotto(''),
                                setPrice(''),
                                getLottery(),
                                getLottotype(),
                            ])
                        })
                    }}>
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
            <Modal.Header closeButton >
                    <Modal.Title>แก้ไขหวย</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Select value={type} onChange={event => setType(event.target.value)}>
                            <option value="">ประเภทหวย</option>
                            {lottotypeData?.map((type, index) => (
                                <option key={index} value={type.id}>{type.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>เลขหวย</Form.Label>
                        <Form.Control type="number" value={numberlotto} onChange={event => setNumberlotto(event.target.value)} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ราคา</Form.Label>
                        <Form.Control type="number" value={price} onChange={event => setPrice(event.target.value)} />
                    </Form.Group>
    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {
                        executeLotteryPut({
                            url: '/api/lottery/' + lotteryById?.id,
                            method: 'PUT',
                            data: {
                                lottotypeId:type,
                                numberlotto:numberlotto,
                                price:price,
                            }
                          }).then(() => {
                            Promise.all([
                                setType(''),
                                setNumberlotto(''),
                                setPrice(''),
                                getLottery(),
                                getLottotype(),
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
LotteryPage.layout = IndexPage;