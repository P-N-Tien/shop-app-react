import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/thumbs";
import "./style.css";

export default function ProductGallery({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const defaultIndex = images.findIndex((img) => img.isPrimary === true);
  const sortedImages = images.sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div
      className="product-gallery"
      style={{
        display: "flex",
        gap: 12,
      }}
    >
      <Swiper
        onSwiper={setThumbsSwiper}
        initialSlide={defaultIndex}
        direction="vertical"
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        className="thumbs-swiper"
      >
        {sortedImages.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img?.imageUrl}
              style={{
                width: "100%",
                cursor: "pointer",
                borderRadius: 6,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        initialSlide={defaultIndex}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        className="main-swiper"
      >
        {sortedImages.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img?.imageUrl}
              style={{
                width: "100%",
                borderRadius: 8,
                objectFit: "contain",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
