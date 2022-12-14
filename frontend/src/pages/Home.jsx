import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { axiosInstance } from '../config';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 22px;

    @media only screen and (max-width: 475px) {
        justify-content: center;
        gap: 0px;
    };
`;

const Home = ({ type }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axiosInstance.get(`/videos/${type}`);
            // console.log(res);
            setVideos(res.data);
        };
        fetchVideos();
    }, [type]);

    return (
        <Container>
            {
                videos.map((video) => <Card key={video._id} video={video} />)
            }
        </Container>
    );
};

export default Home;