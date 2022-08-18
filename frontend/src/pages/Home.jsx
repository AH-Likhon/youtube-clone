import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    ${'' /* gap: 20px; */}

    @media only screen and (max-width: 475px) {
        justify-content: center;
    };
`;

const Home = ({ type }) => {
    const [videos, setVideos] = useState([]);
    // "proxy": "https://youtube-pr.herokuapp.com/api/"
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/${type}`);
            // console.log(res);
            setVideos(res.data);
        };
        fetchVideos();
    }, [type]);

    return (
        <Container>
            {
                videos.map((video) => <Card key={video._id} video={video} />)
            };
        </Container>
    );
};

export default Home;