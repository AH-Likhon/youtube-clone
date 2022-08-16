import React, { useState } from 'react';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { VideoCallOutlined } from '@mui/icons-material';
import Upload from './Upload';

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
    ${'' /* background-color: blue; */}
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
    ${'' /* margin-top: 10px; */}
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

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const { currentUser } = useSelector(state => state.user);

    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input placeholder='Search' />
                        <SearchOutlinedIcon />
                    </Search>
                    {
                        currentUser ? <User>
                            <VideoCallOutlined style={{ cursor: 'pointer' }} onClick={() => setOpen(true)} />
                            <Avatar src={currentUser.img} />
                            {currentUser.name}
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