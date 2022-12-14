import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config';

const Container = styled.div`
    width: 85%;
    position: absolute;
    diplay: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

const Wrapper = styled.div`
    width: 600px;
    height: 550px;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    position: relative;
    margin: 20px auto;

    @media only screen and (max-width: 475px) {
        width: 380px;
        margin-left: 30px;
    };
    
`;

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor:pointer;
`;

const Title = styled.h2`
    text-align: center;
`;

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const TextArea = styled.textarea`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
    font-size: 14px;
`;

const Upload = ({ setOpen }) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    // const [desc, setDesc] = useState("");
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    const handleTags = e => {
        setTags(e.target.value?.split(","));
    };

    const handleChange = e => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        })
    }

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file?.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === 'imgUrl' ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs(prev => {
                        return { ...prev, [urlType]: downloadURL };
                    });
                });
            }
        );

    };

    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video]);

    useEffect(() => {
        img && uploadFile(img, "imgUrl");
    }, [img]);

    const handleUpload = async (e) => {
        e.preventDefault();
        const res = await axiosInstance.post('/videos', { ...inputs, tags });
        setOpen(false);
        res.status === 200 && navigate(`/video/${res.data._id}`);
    }


    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload A New Video</Title>
                <Label>Video</Label>
                {
                    videoPerc > 0 ? ("Uploading: " + videoPerc + "%") : (<Input
                        type="file"
                        accept="video/*"
                        onChange={e => setVideo(e.target.files[0])}
                    />)
                }
                <Input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />
                <TextArea
                    placeholder='Description'
                    rows={8} name="desc"
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Separarte the tags with commas."
                    onChange={handleTags}
                />
                <Label>Image</Label>
                {
                    imgPerc > 0 ? ("Uploading: " + imgPerc + "%") : (<Input
                        type="file"
                        accept="image/*"
                        onChange={e => setImg(e.target.files[0])}
                    />)
                }
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    );
};

export default Upload;