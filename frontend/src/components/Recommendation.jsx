import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div`
    flex: 2;
    @media only screen and (max-width: 475px) {
        display: none;
    };
`;

const Recommendation = ({ currentVideo }) => {
    const [videos, setVideos] = useState([]);

    // console.log(currentVideo.tags);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/tags?tags=${currentVideo.tags}`);
            const result = res.data.filter(video => video._id !== currentVideo._id);
            setVideos(result);
        };
        fetchVideos();
    }, [currentVideo.tags]);

    return (
        <Container>
            {
                videos.map((video) => (<Card type="sm" key={video._id} video={video} />))
            }
        </Container>
    );
};

export default Recommendation;