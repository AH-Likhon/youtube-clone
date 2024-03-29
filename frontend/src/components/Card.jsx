import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { format } from 'timeago.js';
import { axiosInstance } from '../config';

const Container = styled.div`
    width: ${(props) => props.type !== 'sm' && '360px'};
    margin-bottom: ${(props) => props.type === 'sm' ? '10px' : '45px'};
    cursor: pointer;
    display: ${(props) => props.type === 'sm' && 'flex'};
    gap: 10px;
`;
const Img = styled.img`
    width: 100%;
    height: ${(props) => props.type === 'sm' ? '120px' : '202px'};
    background-color: #999;
    flex: 1;
`;

const Details = styled.div`
    display: flex;
    margin-top: ${(props) => props.type !== 'sm' && '15px'};
    gap: 10px;
    flex: 1;
`;

const ChannelImg = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => props.type === 'sm' && 'none'}
`;

const Texts = styled.div``;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 5px 0px;
`;

const Info = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axiosInstance.get(`/users/find/${video?.userId}`);
            // console.log(res);
            setChannel(res.data);
        };
        fetchChannel();
    }, [video?.userId]);



    return (
        <Link style={{ textDecoration: 'none' }} to={`/video/${video._id}`}>
            <Container type={type}>
                <Img type={type} src={video?.imgUrl} />
                {/* <Img type={type} src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA" /> */}
                <Details type={type}>
                    <ChannelImg type={type} src={channel?.img} />
                    {/* <ChannelImg type={type} src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" /> */}
                    <Texts>
                        <Title>{video.title}</Title>
                        <ChannelName>{channel?.name}</ChannelName>
                        <Info>
                            {video?.views} views • {format(video?.createdAt)}
                        </Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    );
};

export default Card;