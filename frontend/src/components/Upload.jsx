import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 85%;
    ${'' /* height: 100%; */}
    position: absolute;
    ${'' /* background-color: #000000a7; */}
    diplay: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 600px;
    height: 550px;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    ${'' /* align-items: center;
    justify-content: center; */}
    padding: 20px;
    gap: 20px;
    position: relative;
    ${'' /* top: 0px;
    left: 50px; */}
    margin: 20px auto;
    
`;

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor:pointer;
`;

const Title = styled.h1`
    text-align: center;
`;

const Upload = ({ setOpen }) => {
    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload A New Video</Title>
            </Wrapper>
        </Container>
    );
};

export default Upload;