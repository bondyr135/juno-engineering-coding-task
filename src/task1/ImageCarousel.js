import React, { useState, useEffect } from "react";
import { fetchImageUrls } from "../api/index";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CircularProgress } from '@mui/material';
import { QrCodeScannerOutlined } from "@mui/icons-material";

const ImageCarousel = (props) => {

    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let images = [];
        const getImages = async () => {
            let promisedImages = await fetchImageUrls();
            images = await Promise.all(promisedImages);
            setImages(images);
        }
        getImages();
    }, [])

    if (!images || images.length <= 0) {
        return <CircularProgress />
    }
    console.log(images)
    return (
        <div className="stage">
            <ArrowBackIosNewIcon className="arrow prev" />
            {images.map((url, idx) => {
                < img src={url} key={idx} className={idx === index ? "slide active" : "slide"
                } />
            })}
            <ArrowForwardIosIcon className="arrow next" />
        </div>
    )

};
export default ImageCarousel;
