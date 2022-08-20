import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import { axiosInstance } from '../config';

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0px;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
    font-size: 13px;
    font-wight: 500;
`;

const Date = styled.span`
    font-ize: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.stextSft};
    margin-left: 5px;
`;

const Text = styled.span`
    font-size: 14px;
    font-weight: 400;
`;

const Comment = ({ comment, sComment }) => {
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchComment = async () => {
            const res = await axiosInstance.get(`/users/find/${comment.userId}`);
            setChannel(res.data);
        };
        fetchComment();
    }, [comment.userId]);

    return (
        <Container>
            <Avatar src={channel?.img} />
            {/* <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" /> */}
            <Details>
                <Name>{channel?.name} <Date>{format(comment?.createdAt)}</Date></Name>
                <Text>
                    {comment?.desc}
                    {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus laborum delectus unde quaerat dolore culpa sit aliquam at. Vitae facere ipsum totam ratione exercitationem. Suscipit animi accusantium dolores ipsam ut. */}
                </Text>
            </Details>
        </Container>
    );
};

export default Comment;