import React from 'react';
import styled from 'styled-components';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useEffect } from 'react';
import { axiosInstance } from '../config';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Comments from '../components/Comments';

const Container = styled.div`
    background-color: ${({ theme }) => theme.bgLighter};
    width: 100%;

    @media only screen and (max-width: 475px) {
        height: auto;
        background-color: transparent;
        margin-bottom: 300px;
    };
`;

const Wrapper = styled.div`
    height: 100%;
    padding: 50px 20px;
    color: ${({ theme }) => theme.text};
`;

const Heading = styled.h3`
    font-weight: 500;
    margin-left: 10px;  
`;

const Search = styled.div`
    width: 50%;
    margin: 10px 0px 10px 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    border: 1px solid transparent;
    color: ${({ theme }) => theme.text};

    @media only screen and (max-width: 475px) {
        
    };
`;

const Input = styled.input`
    width: 100%;
    border: none;
    background-color: transparent;
    outline: none;
    padding: 5px;
    color: ${({ theme }) => theme.text};
`;

const Table = styled.table`
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    overflow-x: scroll;
`;
const TR = styled.tr``;

const TH = styled.th`
    border: 1px solid ${({ theme }) => theme.border};
    padding: 10px 0px;
    color: ${({ theme }) => theme.textSoft};
    font-weight: 500;
`;
const TD = styled.td`
    border: 1px solid ${({ theme }) => theme.border};
    padding: 10px 0px;
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.text};

    :first-child{
        width: 350px;
    }
`;

const InnerTH = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    margin-left: 10px;    
`;


const VideoContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    ${'' /* margin-left: 22px; */}

`;


const Img = styled.img`
    width: 100px;
    height: 60px;
    background-color: #999;
    ${'' /* flex: 1; */}
`;

const Title = styled.h1`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text};
`;



const ManageContent = () => {
    const { currentUser } = useSelector(state => state.user);
    const [videos, setVideos] = useState([]);
    const [click, setClick] = useState(false);
    const [videoId, setVideoId] = useState('');

    // console.log(videos);

    const handleClick = (id) => {
        setClick(!click);
        setVideoId(id);
    }

    const handleDelete = async () => {
        // console.log(videoId);
        await axiosInstance.delete(`/videos/${videoId}`);
        setClick(!click);
    }

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axiosInstance.get(`/videos/${currentUser._id}`);
            // console.log(res);
            setVideos(res.data);
        };
        fetchVideos();
    }, [currentUser, videos]);


    return (
        <Container>
            <Wrapper>
                <Heading>Manage Contents</Heading>

                <Search>
                    <FilterListIcon />
                    <Input placeholder='Filter' onChange={e => console.log(e.target.value)} />
                    {
                        click && <>
                            <EditIcon sx={{ margin: '0px 10px', cursor: 'pointer', fontSize: '22px' }} />
                            <DeleteForeverIcon onClick={handleDelete} sx={{ cursor: 'pointer', fontSize: '22px' }} />
                        </>
                    }
                </Search>

                <Table>
                    <TR>
                        <TH>
                            <InnerTH>
                                <CheckBoxOutlineBlankIcon sx={{ cursor: 'pointer', fontSize: '20px !important', color: 'gray !important' }} /> Video
                            </InnerTH>
                        </TH>
                        <TH>Date</TH>
                        <TH>Views</TH>
                        <TH>Likes</TH>
                        <TH>Dislikes</TH>
                        <TH>Tags</TH>
                        <TH>Comments</TH>
                    </TR>
                    {
                        videos.map(video => <TR>
                            <TD>
                                <InnerTH>
                                    <CheckBoxOutlineBlankIcon onClick={() => handleClick(video._id)} sx={{ cursor: 'pointer', fontSize: '20px', color: 'gray !important', zIndex: 1 }} />
                                    {(click && videoId === `${video._id}`) && <DoneIcon style={{ width: '20px', position: 'absolute', color: 'gray !important', zIndex: 0 }} />}
                                    <VideoContainer type={() => click ? 'true' : ''}>
                                        <Img src={video.imgUrl} />
                                        <Title>{video.title}</Title>
                                    </VideoContainer>
                                </InnerTH>
                            </TD>
                            <TD>{video.createdAt.toString().slice(0, 10)}</TD>
                            <TD>{video.views}</TD>
                            <TD>{video.likes.length}</TD>
                            <TD>{video.dislikes.length}</TD>
                            <TD>
                                {video.tags.join(',')}
                            </TD>
                            <TD>
                                <Comments type="length" videoId={video._id} />
                            </TD>
                        </TR>)
                    }
                </Table>
            </Wrapper>
        </Container>
    );
};

export default ManageContent;