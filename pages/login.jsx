import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import useAxios from 'axios-hooks';

import { signIn, getCsrfToken, useSession } from "next-auth/react";

import { useRouter } from "next/router";

export default function LoginPage() {

    const router = useRouter();

    // Video
    const [{ data: videoData, loading: videoLoading, error: videoError }, getVideolink] = useAxios({ url: '/api/videopresent' })
    const [{ data: videoLinkById, loading: videoLinkByIdLoading, error: videoLinkByIdError }, getVideoLinkById] = useAxios({}, { manual: true })
    const [{ loading: updateVideoLoading, error: updateVideoError }, executeVideoPut] = useAxios({}, { manual: true })

    const [titlelink, setTitlelink] = useState('');
    const [linkvideo, setLinkvideo] = useState('');

    useEffect(() => {
        setTitlelink(videoLinkById?.titlelink)
        setLinkvideo(videoLinkById?.linkvideo)
    }, [videoLinkById])



    // ABOUT
    const [{ data: aboutData, loading, error }, getAbout] = useAxios({ url: '/api/about' })
    const [{ data: aboutById, loading: aboutByIdLoading, error: aboutByIdError }, getAboutById] = useAxios({}, { manual: true })
    const [{ data: AboutPost, error: AboutPostError, loading: AboutPostLoading }, executeAboutPost] = useAxios({ url: '/api/about', method: 'POST' }, { manual: true });
    const [{ loading: updateAboutLoading, error: updateAboutError }, executeAboutPut] = useAxios({}, { manual: true })
    const [{ loading: deleteAboutLoading, error: deleteAboutError }, executeAboutDelete] = useAxios({}, { manual: true })

    const [{ loading: imgLoading, error: imgError }, uploadImage] = useAxios({ url: '/api/upload', method: 'POST' }, { manual: true });

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [detail, setDetail] = useState('');
    const [img, setImg] = useState('');

    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])


    useEffect(() => {
        setTitle(aboutById?.title)
        setSubtitle(aboutById?.subtitle)
        setDetail(aboutById?.detail)
        setImg(aboutById?.image)
    }, [aboutById])

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
        await getAboutById({ url: '/api/about/' + id, method: 'GET' });
        setShowModalEdit(true);
    }

    const ShowModalEditSecond = async (id) => {
        await getVideoLinkById({ url: '/api/videopresent/' + id, method: 'GET' });
        setShowModalEditSecond(true);
    }

    const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false), setShowModalEditSecond(false) };

    if (loading || aboutByIdLoading || AboutPostLoading || updateAboutLoading || deleteAboutLoading || imgLoading || videoLinkByIdLoading || videoLoading || updateVideoLoading) return <p>Loading...</p>
    if (error || aboutByIdError || AboutPostError || updateAboutError || deleteAboutError || imgError || videoLinkByIdError || videoError || updateVideoError) return <p>Error!</p>
    return (
        < >
            <Head>
                <title>T-ACTIVE BACKEND</title>
                <meta name="description" content="I2AROBOT 2" />
                <link rel="icon" href="/images/logo.png" />
            </Head>


            <Container fluid className="login">
                <div className="bg-secondary rounded shadow p-4">
                    <div className='text-center'>
                        <Image src="https://t-active-stevia.com/images/logo.png" />
                    </div>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const username = e.target.username.value;
                            const password = e.target.password.value;

                            const res = await signIn("credentials", {
                                redirect: false,
                                username: username,
                                password: password,
                                callbackUrl: `${window.location.origin}`,
                            });
                            if (res?.error) {
                                return alert('username or password is incorrect')
                            }
                            router.push('/');
                        }}
                    >

                        <h3>Sign In</h3>
                        <div className="mb-3">
                            <label>Username</label>
                            <input
                                type="test"
                                name="username"
                                id="username"
                                className="form-control"
                                placeholder="Enter text"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name='password'
                                id='password'
                                className="form-control"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Container>

        </ >
    );

}