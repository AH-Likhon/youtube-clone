import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { axiosInstance } from '../config';
import Comment from './Comment';

const Container = styled.div``;

const NewComment = styled.form`
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
    color: ${({ theme }) => theme.text};
`;


const Comments = ({ videoId }) => {
    const { currentUser } = useSelector(state => state.user);
    const [comments, setComments] = useState([]);
    const [sComment, setSComment] = useState("");

    // console.log(currentUser, videoId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/comments/${videoId}`);
                // console.log(res?.data);
                setComments(res.data);
            } catch (error) { };
        };
        fetchData();
    }, [videoId, sComment, comments]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const addComment = async () => {
            try {
                await axiosInstance.post("/comments", { videoId, desc: sComment });
            } catch (error) { }
        };
        addComment();
        setSComment("");
        // console.log("Submit Form");
    };

    // console.log(comment);

    return (
        <Container>
            <NewComment onSubmit={handleSubmit}>
                {/* <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" /> */}
                <Avatar src={currentUser?.img} />
                <Input value={sComment} onChange={(e) => setSComment(e.target.value)} placeholder='Add a comment.....' />
                {/* <Button>Add</Button> */}
            </NewComment>
            {
                comments.map(comment => <Comment sComment={sComment} key={comment._id} comment={comment} />)
            }
        </Container>
    );
};

export default Comments;