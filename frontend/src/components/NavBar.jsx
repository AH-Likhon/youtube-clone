import React, { useState } from 'react';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { VideoCallOutlined, Logout } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import Upload from './Upload';
import { logOut } from '../redux/userSlice';
import logo from '../images/logo.png';
import { axiosInstance } from '../config';
import Swal from 'sweetalert2';

const Container = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.bgLighter};
    height: 56px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    height: 100%;
    padding: 0px 20px;
`;
const Search = styled.div`
    position: absolute;
    width: 40%;
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
        left: -160px;
        right: 0px;
    };
`;

const Input = styled.input`
    border: none;
    background-color: transparent;
    outline: none;
    color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
    padding: 3px 10px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #999;
`;

const Text = styled.p`
    @media only screen and (max-width: 475px) {
        display: none;
    };
`;

const Logo = styled.div`
    display: none;

    @media only screen and (max-width: 475px) {
        display: block;
        position: relative;
        margin: auto;
        left: -240px;
        width: 10%;
    };
`;

const Logo1 = styled.div`
    display: none;

    @media only screen and (max-width: 475px) {
        display: block;
        position: relative;
        margin: auto;
        left: -320px;
        width: 10%;
    };
`;

const Img = styled.img`
    height: 22px;
`;

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSignOut = (e) => {
        e.preventDefault();
        // console.log(currentUser);
        dispatch(logOut());
        axiosInstance.get('/auth/logOut');
        navigate("/");
        Swal.fire({
            position: 'top',
            icon: 'warning',
            title: 'Successfully logged out!',
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <>
            <Container>
                <Wrapper>

                    {
                        currentUser ? <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
                            <Logo>
                                <Img src={logo} />
                            </Logo>
                        </Link> : <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
                            <Logo1>
                                <Img src={logo} />
                            </Logo1>
                        </Link>
                    }


                    <Search>
                        <Input placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
                        <SearchOutlinedIcon sx={{ cursor: 'pointer' }} onClick={() => navigate(`/search?q=${query}`)} />
                    </Search>
                    {
                        currentUser ? <User>
                            <VideoCallOutlined style={{ cursor: 'pointer' }} onClick={() => setOpen(true)} />
                            <Avatar src={currentUser?.img} />
                            <Text>
                                {currentUser?.name?.slice(0, 11)}
                            </Text>
                            <Button onClick={handleSignOut}>
                                <Logout />
                                SIGN OUT
                            </Button>
                        </User> : <Link style={{ textDecoration: 'none', color: 'inherit' }} to="signin">
                            <Button>
                                <AccountCircleOutlinedIcon />
                                SIGN IN
                            </Button>
                        </Link>
                    }
                </Wrapper>
            </Container>
            {
                open && <Upload setOpen={setOpen} />
            }
        </>
    );
};

export default NavBar;