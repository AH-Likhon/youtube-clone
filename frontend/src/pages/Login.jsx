import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${'' /* justify-content: center; */}
    height: calc(930px - 56px);
    color: ${({ theme }) => theme.text};
    margin-top: 30px; 
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.soft};    
    gap: 10px;
    padding: 20px 50px;
`;

const Title = styled.h1`
    font-size: 24px;
`;

const SubTitle = styled.h2`
    font-size: 20px;
    font-weight: 300;
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid ${({ theme }) => theme.soft};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    outline: none;
`;

const Button = styled.button`
    border: none;
    border-radius: 3px;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
    display: flex;
    font-size: 12px;
    color: ${({ theme }) => theme.text};
    margin-top: 10px;
`;

const Links = styled.div`
    margin-left: 50px;
`;

const Link = styled.span`
    margin-left: 30px;
`;

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post('/auth/signin', { name, password });
            console.log(res.data);
            dispatch(loginSuccess(res.data));
        } catch (error) {
            dispatch(loginFailure());
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <SubTitle>to continue to YouTube</SubTitle>
                <Input type='text' placeholder='Username' onChange={e => setName(e.target.value)} />
                <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Sign In</Button>

                <Title>or</Title>

                <Input type='text' placeholder='Username' onChange={e => setName(e.target.value)} />
                <Input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <Button>Sign Up</Button>
            </Wrapper>

            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    );
};

export default Login;