import React from 'react';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styled from 'styled-components';

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
`;

const Input = styled.input`
    border: none;
    background-color: transparent;
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

const NavBar = () => {
    return (
        <Container>
            <Wrapper>
                <Search>
                    <Input placeholder='Search' />
                    <SearchOutlinedIcon />
                </Search>
                <Button>
                    <AccountCircleOutlinedIcon />
                    SIGN IN
                </Button>
            </Wrapper>
        </Container>
    );
};

export default NavBar;