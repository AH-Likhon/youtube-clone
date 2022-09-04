import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../css/styles.css";


const Container = styled.div`
    width: 85%;
    position: absolute;
    diplay: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    top: 320px;

    @media only screen and (max-width: 475px) {
        top: 200px;
    };
`;

const Wrapper = styled.div`
    width: 600px;
    height: 160px;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    position: relative;
    margin: 20px auto;

    @media only screen and (max-width: 475px) {
        width: 385px;
    };
    
`;

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor:pointer;
`;

const Title = styled.h3`
    position: absolute;
    top: 10px;
    left: 10px;
    font-weight: 500;
`;

const Search = styled.div`
    position: absolute;
    width: 60%;
    top: 140px;
    left: 0px;
    right: 0px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: ${({ theme }) => theme.text};

    @media only screen and (max-width: 475px) {
        right: 0px;
    };
`;

const Input = styled.input`
    border: none;
    background-color: transparent;
    outline: none;
    color: ${({ theme }) => theme.text};
`;

const Copy = styled.p`
    cursor: pointer;
    z-index: 99999;
    color: #2966e7;
    font-size: 14px;
    font-weight: 700;
`;

const ShareVideo = ({ setShare, currentVideo }) => {
    // console.log(currentVideo);
    const [alert, setAlert] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(currentVideo.videoUrl);
        setAlert("COPIED");

        setTimeout(() => {
            setAlert("");
        }, 800);
    };

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setShare(false)}>X</Close>
                <Title>Share</Title>

                <Swiper
                    // style={{ paddingLeft: '10px' }}
                    slidesPerView={1}
                    spaceBetween={-20}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Navigation]}
                >
                    <SwiperSlide>
                        <FacebookShareButton className='whatssp' url={currentVideo.videoUrl} quote={currentVideo.title} hashtag={`${currentVideo.tags.map(e => '#' + e)}`}>
                            <FacebookIcon size={42} round={true} />
                        </FacebookShareButton>
                        <WhatsappShareButton style={{ margin: '0px -170px', }} url={currentVideo.videoUrl} quote={currentVideo.title} hashtag={`${currentVideo.tags.map(e => '#' + e)}`}>
                            <WhatsappIcon size={42} round={true} />
                        </WhatsappShareButton>
                        <LinkedinShareButton style={{ marginRight: '-170px', }} url={currentVideo.videoUrl} quote={currentVideo.title} hashtag={`${currentVideo.tags.map(e => '#' + e)}`}>
                            <LinkedinIcon size={42} round={true} />
                        </LinkedinShareButton>
                        <TwitterShareButton style={{ marginRight: '-170px', }} url={currentVideo.videoUrl} quote={currentVideo.title} hashtag={`${currentVideo.tags.map(e => '#' + e)}`}>
                            <TwitterIcon size={42} round={true} />
                        </TwitterShareButton>
                        <TelegramShareButton style={{ marginRight: '-170px', }} url={currentVideo.videoUrl} quote={currentVideo.title} hashtag={`${currentVideo.tags.map(e => '#' + e)}`}>
                            <TelegramIcon size={42} round={true} />
                        </TelegramShareButton>
                        <EmailShareButton url={currentVideo.videoUrl} quote={currentVideo.title} hashtag={`${currentVideo.tags.map(e => '#' + e)}`}>
                            <EmailIcon size={42} round={true} />
                        </EmailShareButton>
                    </SwiperSlide>
                </Swiper>

                <Search>
                    <Input placeholder={currentVideo.videoUrl} />
                    {
                        alert ? <Copy>{alert}</Copy> : <Copy onClick={handleCopy}>COPY</Copy>
                    }
                </Search>
            </Wrapper>
        </Container>
    );
};

export default ShareVideo;