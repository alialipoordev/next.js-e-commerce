"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductImageGalleryProps {
  images: string[];
}

const settings: Settings = {
  dots: false,
  lazyLoad: "anticipated",
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
  className: "w-[500px]",
};

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slider = useRef<Slider>(null);

  return (
    <div>
      {images.length > 1 ? (
        <Slider
          {...settings}
          afterChange={(currentSlide) => {
            setCurrentSlide(currentSlide);
          }}
          ref={slider}
        >
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="testing"
              width={500}
              height={500}
            />
          ))}
        </Slider>
      ) : (
        <Image src={images[0]} alt="testing" width={500} height={500} />
      )}

      <div className="flex py-2 space-x-2">
        {images.length > 1 ? (
          images.map((img, index) => (
            <Image
              onClick={() => slider.current?.slickGoTo(index)}
              className={index === currentSlide ? "ring ring-blue-500" : ""}
              key={index}
              src={img}
              alt="testing"
              width={80}
              height={80}
            />
          ))
        ) : (
          <Image src={images[0]} alt="testing" width={80} height={80} />
        )}
      </div>
    </div>
  );
}
