import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import channel from '../images/channel.svg';
import Card from '../components/Card';
import { useEffect } from 'react';
import { axiosInstance } from '../config';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
    background-color: ${({ theme }) => theme.bgLighter};
    height: 120px;
    width: 100%;
    ${'' /* margin-bottom: 5000px; */}

    @media only screen and (max-width: 475px) {
        height: auto;
        background-color: transparent;
        margin-bottom: 300px;
    };
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0px 20px;
`;

const User = styled.div`
    display: flex;
    align-items: center;
    justify: center;
    gap: 10px;
    color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
    width: 82px;
    height: 82px;
    border-radius: 50%;
    background-color: #999;
    cursor: pointer;

    @media only screen and (max-width: 475px) {
        width: 52px;
        height: 52px;
    };
`;

const ChannelDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h3`
    font-weight: 500;

    @media only screen and (max-width: 475px) {
        font-size: 12px;
    };
`;

const ChannelCounter = styled.span`
    font-size: 14px;
    margin-top: 2px;
    color: ${({ theme }) => theme.textSoft};

    @media only screen and (max-width: 475px) {
        font-size: 10px;
    };
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    @media only screen and (max-width: 475px) {
        flex-direction: column;
        gap: 5px;
    };
`;

const Button = styled.button`
    padding: 8px 10px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;

    @media only screen and (max-width: 475px) {
        padding: 5px 8px;
        font-size: 13px;
    };
`;


const MenuWrapper = styled.div`
    ${'' /* width: 100%; */}
`;

const MenuUL = styled.ul`
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.bgLighter};
    height: 100%;
    padding: 10px 20px;
    
    @media only screen and (max-width: 475px) {
        padding: 4px 10px;
        background-color: transparent;
    };
`;

const MenuLI = styled.li`
    list-style: none;
    text-align: center;
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 6px 8px;
    text-transform: uppercase;
    display: flex;
    align-items: center;


    &:first-child{
        background-color: #e10d0d;
        ${'' /* background-color: #3EA6FF; */}
    }

    @media only screen and (max-width: 475px) {
        font-size: 11px;
    };

    ${'' /* &:hover{
        background-color: #3EA6FF;
    } */}
`;

const MenuBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme.text};
    position: relative;
    top: 30%;
`;

const MenuBoxImg = styled.img`
    width: 250px;
    height: 180px;
    margin: 10px 0px;
    ${'' /* border-radius: 50%; */}
    ${'' /* background-color: #999; */}
    cursor: pointer;

    @media only screen and (max-width: 475px) {
        width: 200px;
        height: 150px;
    };
`;

const VideoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px auto;
    ${'' /* gap: 20px; */}

    @media only screen and (max-width: 475px) {
        justify-content: center;
    };
`;

const MyChannel = () => {
    const { currentUser } = useSelector(state => state.user);
    const [menu, setMenu] = useState("home");
    const [videos, setVideos] = useState([]);

    const navigate = useNavigate();

    // console.log(currentUser._id);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axiosInstance.get(`/videos/${currentUser._id}`);
            // console.log(res);
            setVideos(res.data);
        };
        fetchVideos();
    }, [currentUser]);

    // console.log(videos);

    return (
        <Container>
            <Wrapper>
                <User>
                    <Avatar src={currentUser?.img} />
                    <ChannelDetails>
                        <ChannelName>{currentUser.name}</ChannelName>
                        <ChannelCounter>{currentUser.subscribers} subscribers</ChannelCounter>
                    </ChannelDetails>
                </User>

                <ButtonGroup>
                    <Button>
                        CUSTOMIZE CHANNEL
                    </Button>
                    <Button onClick={() => navigate('/manage-videos')}>
                        MANAGE VIDEOS
                    </Button>
                </ButtonGroup>
            </Wrapper>

            <MenuWrapper>
                <MenuUL>
                    <MenuLI onClick={() => setMenu("home")}>Home</MenuLI>
                    <MenuLI onClick={() => setMenu("videos")}>Videos</MenuLI>
                    <MenuLI onClick={() => setMenu("playlists")}>Playlists</MenuLI>
                    <MenuLI onClick={() => setMenu("channels")}>Channels</MenuLI>
                    <MenuLI onClick={() => setMenu("about")}>About</MenuLI>
                    <MenuLI onClick={() => setMenu("search")}>
                        <SearchOutlinedIcon />
                    </MenuLI>
                </MenuUL>
            </MenuWrapper>

            {
                menu === "home" && <MenuBox>
                    <MenuBoxImg src={channel} />
                    <ChannelName>Upload a video to get started</ChannelName>
                    <ChannelCounter>Start sharing your story and connecting with viewers. Videos you upload will show up here.</ChannelCounter>
                    <Button style={{ margin: '10px 0px' }}>
                        UPLOAD VIDEO
                    </Button>
                    <ChannelCounter>Learn more about <span style={{ color: '#3ea6ff', cursor: 'pointer' }}>how to get started</span></ChannelCounter>
                </MenuBox>
            }

            {
                menu === "videos" && <VideoContainer>
                    {
                        videos.map((video) => <Card key={video._id} video={video} />)
                    }
                </VideoContainer>
            }
        </Container>
    );
};

export default MyChannel;