import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Yerel fotoğrafları import edin
import Image1 from '../../assets/1.jpg';
import Image2 from '../../assets/2.jpg';
import Image3 from '../../assets/3.jpg';
import Image4 from '../../assets/4.jpg';

const PhotoSlider = () => {
    // Slider ayarları
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', mt: 5 }}>
            <Slider {...settings}>
                <div>
                    <img src={Image1} alt="Slide 1" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div>
                    <img src={Image2} alt="Slide 2" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div>
                    <img src={Image3} alt="Slide 3" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div>
                    <img src={Image4} alt="Slide 4" style={{ width: '100%', height: 'auto' }} />
                </div>
            </Slider>
        </Box>
    );
};

export default PhotoSlider;
