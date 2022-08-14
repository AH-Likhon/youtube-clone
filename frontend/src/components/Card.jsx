import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 360px;
    margin-bottom: 45px;
    cursor: pointer;
`;
const Img = styled.img`
    width: 100%;
    height: 202px;
    background-color: #999;
`;

const Details = styled.div`
    display: flex;
    margin-top: 15px;
    gap: 10px;
`;

const ChannelImg = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
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

const Card = () => {
    return (
        <Link style={{ textDecoration: 'none' }} to="/video/test">
            <Container>
                <Img src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA" />
                <Details>
                    <ChannelImg src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
                    <Texts>
                        <Title>New Video</Title>
                        <ChannelName>Likhon Dev</ChannelName>
                        <Info>
                            660,908 views • 1 day ago
                        </Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    );
};

export default Card;