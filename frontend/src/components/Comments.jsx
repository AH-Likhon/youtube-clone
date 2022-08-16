import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Comment from './Comment';

const Container = styled.div``;

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const Input = styled.input`
    width: 100%;
    padding: 5px;    
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.soft};
    background: transparent;
    outline: none;
`;

const Comments = ({ videoId }) => {
    const { currentUser } = useSelector(state => state.user);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/comments/${videoId}`);
                setComments(res.data);
            } catch (error) { };
        };
        fetchData();
    }, [videoId]);

    return (
        <Container>
            <NewComment>
                {/* <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" /> */}
                <Avatar src={currentUser?.img} />
                <Input placeholder='Add a comment.....' />
            </NewComment>
            {
                comments.map(comment => <Comment key={comment._id} comment={comment} />)
            }
        </Container>
    );
};

export default Comments;