import React from 'react';
import styled from 'styled-components';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from '../components/Comments';
import Card from '../components/Card';

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

const Recommendation = styled.div`
    flex: 2;
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

const Video = () => {
    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <iframe
                        width="100%"
                        height="420"
                        src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                    <Title>Best Video</Title>
                    <Details>
                        <Info>7,948,154 views • Aug 14, 2022</Info>
                        <Buttons>
                            <Button>
                                <ThumbUpOutlinedIcon /> 123
                            </Button>
                            <Button>
                                <ThumbDownOffAltOutlinedIcon /> Dislike
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
                            <Img src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
                            <ChannelDetails>
                                <ChannelName>Likhon Dev</ChannelName>
                                <ChannelCounter>200k subscribers</ChannelCounter>
                                <Description>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus laborum delectus unde quaerat dolore culpa sit aliquam at. Vitae facere ipsum totam ratione exercitationem. Suscipit animi accusantium dolores ipsam ut.
                                </Description>
                            </ChannelDetails>
                        </ChannelInfo>
                        <Subscribe>SUBSCRIBE</Subscribe>
                    </Channel>

                    <Hr />
                    <Comments />
                </VideoWrapper>
            </Content>
            <Recommendation>
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
            </Recommendation>
        </Container>
    );
};

export default Video;