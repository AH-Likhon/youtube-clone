import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config';
import Swal from 'sweetalert2';

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
    color: ${({ theme }) => theme.text};
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
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/auth/signup', { name, email, password });
            if (res.data) {
                setName("");
                setEmail("");
                setPassword("");
            }
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: `${res.data}`,
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error.response.data.message);
            console.log(error);
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 2500
            });
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axiosInstance.post('/auth/signin', { name, password });
            console.log(res.data);
            dispatch(loginSuccess(res.data));
            navigate("/");
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Successfully logged in!',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            dispatch(loginFailure());
        }
    };


    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
            .then((result) => {
                axiosInstance.post("/auth/google", {
                    name: result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL,
                    password: '123456'
                }).then((res) => {
                    console.log(res.data)
                    dispatch(loginSuccess(res.data));
                    navigate("/");
                });
            })
            .catch((error) => {
                // console.log(error);
                dispatch(loginFailure());
            });
    }

    return (
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <SubTitle>to continue to YouTube</SubTitle>
                <Input type='text' placeholder='Username' onChange={e => setName(e.target.value)} value={name} />
                <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} value={password} />
                <Button onClick={handleLogin}>Sign In</Button>

                <Title>OR</Title>

                <Button onClick={signInWithGoogle}>
                    Signin with Google
                </Button>

                <Title>OR</Title>

                <Input type='text' placeholder='Username' onChange={e => setName(e.target.value)} value={name} />
                <Input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)} value={email} />
                <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} value={password} />
                <Button onClick={handleSignUp}>Sign Up</Button>
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