import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 85%;
    position: absolute;
    diplay: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    top: 230px;
`;

const Wrapper = styled.div`
    width: 600px;
    height: 250px;
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

const Title = styled.h3`
    text-align: center;
`;

const ShareVideo = ({ setShare }) => {

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setShare(false)}>X</Close>
                <Title>Share With Social Media</Title>
            </Wrapper>
        </Container>
    );
};

export default ShareVideo;