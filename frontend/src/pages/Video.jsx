import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from '../components/Comments';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { ThumbUp, ThumbUpOutlined, ThumbDownOffAltOutlined, ThumbDown } from '@mui/icons-material';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';

const Container = styled.div`
    display: flex;
    gap: 24px;
`;

const Content = styled.div`
    flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Info = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
    display: flex;
    gap: 20px;
    color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    cursor: pointer;
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ChannelInfo = styled.div`
    display: flex;
    gap: 20px;
`;

const Img = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const ChannelDetails = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
    font-weight: 500;
`;

const ChannelCounter = styled.span`
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.textSoft};
`;

const Description = styled.p`
    font-size: 14px;
`;

const Subscribe = styled.button`
    height: max-content;
    background-color: #cc1a00;
    color: #fff;
    font-weight: 500;
    border: none;
    border-radius; 3px;
    padding: 10px 20px;
    cursor: pointer;
`;

const VideoFrame = styled.video`
    max-height: 420px;
    width: 100%;
    object-fit: cover;
`;

const Video = () => {
    const { currentUser } = useSelector(state => state.user);
    const { currentVideo } = useSelector(state => state.video);
    const dispatch = useDispatch();

    const path = useLocation().pathname.split('/')[2];
    // console.log(path);

    // const [video, setVideo] = useState({});
    const [channel, setChannel] = useState({});
    const [tagsVideos, setTagsVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(`/videos/find/${path}`);
                const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);

                // console.log(videoRes.data);

                // setVideo(videoRes.data);
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data));
            } catch (error) {

            }
        };
        fetchData();
    }, [path, dispatch]);

    const handleLike = async () => {
        await axios.put(`/users/like/${currentVideo._id}`);
        dispatch(like(currentUser._id));
    };

    const handleDislike = async () => {
        await axios.put(`/users/dislike/${currentVideo._id}`);
        dispatch(dislike(currentUser._id));
    };

    const handleSub = async () => {
        currentUser.subscribedUsers.includes(channel._id) ? await axios.put(`/users/unsub/${channel._id}`) : await axios.put(`/users/sub/${channel._id}`);
        dispatch(subscription(channel._id));
    };

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={currentVideo?.videoUrl} controls />
                    {/* <iframe
                        width="100%"
                        height="420"
                        src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe> */}
                    <Title>{currentVideo?.title}</Title>
                    <Details>
                        <Info>{currentVideo?.views} views • {format(currentVideo?.createdAt)} </Info>
                        <Buttons>
                            <Button onClick={handleLike}>
                                {currentVideo?.likes?.includes(currentUser?._id) ? (
                                    <ThumbUp />
                                ) : (
                                    <ThumbUpOutlined />
                                )}{" "} {currentVideo?.likes?.length}
                            </Button>
                            <Button onClick={handleDislike}>
                                {currentVideo?.dislikes?.includes(currentUser?._id) ? <ThumbDown /> : <ThumbDownOffAltOutlined />}{" "} Dislike
                            </Button>
                            <Button>
                                <ReplyOutlinedIcon /> Share
                            </Button>
                            <Button>
                                <AddTaskOutlinedIcon /> Save
                            </Button>
                        </Buttons>
                    </Details>
                    <Hr />
                    <Channel>
                        <ChannelInfo>
                            <Img src={channel?.img} />
                            {/* <Img src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" /> */}
                            <ChannelDetails>
                                <ChannelName>{channel?.name}</ChannelName>
                                <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
                                <Description>
                                    {currentVideo?.desc}
                                </Description>
                            </ChannelDetails>
                        </ChannelInfo>
                        <Subscribe onClick={handleSub}>
                            {currentUser?.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
                        </Subscribe>
                    </Channel>

                    <Hr />
                    <Comments videoId={currentVideo._id} />
                </VideoWrapper>
            </Content>
            <Recommendation currentVideo={currentVideo} />
        </Container>
    );
};

export default Video;