import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import type { Book } from "@/data/books";

type Props = {
  book: Book | null;
};

const BookSlider: React.FC<Props> = ({ book }) => {
  if ((book === null) || (!book.items || book.items.length === 0)) return null;
  const options: SwiperProps = {
    modules: [Navigation, Pagination, Scrollbar, A11y],
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      prevEl: "#slide__button-prev",
      nextEl: "#slide__button-next",
    },
    pagination: {
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    a11y: { enabled: true },
    loop: false,
  };



  return (
    <div>
      
      <div className="flex justify-center items-center">
        <button
          id="slide__button-prev"
          className="inline-block cursor-pointer w-[60px] h-[60px] flex-none mr-5 bg-mint-800 text-white rounded-full"
        >
          <ruby>
            前<rp>(</rp>
            <rt>まえ</rt>
            <rp>)</rp>
          </ruby>
          へ
        </button>
        <div className="shrink w-full md:max-w-3xl shadow-2xl">
          <Swiper
            {...options}
            className="w-full md:max-w-3xl shadow-2xl
                  [--swiper-pagination-bullet-size:20px]
                  [--swiper-pagination-bullet-width:20px]
                  [--swiper-pagination-bullet-height:20px]
                  [--swiper-pagination-bottom:-15px]
                  [--swiper-pagination-bullet-inactive-opacity:0.2]
                  [--swiper-pagination-bullet-horizontal-gap:10px]"
          >
            {book.items.map(({ src, alt }) => (
              <SwiperSlide key={src}>
                <figure>
                  <img src={src} alt={alt ?? ""} />
                  {alt ? <figcaption>{alt}</figcaption> : null}
                </figure>
              </SwiperSlide>
            ))}

            <div className="pb-5"></div>
          </Swiper>
        </div>
        <button
          id="slide__button-next"
          className="inline-block cursor-pointer w-[60px] h-[60px] flex-none ml-5 bg-mint-800 text-white rounded-full"
        >
          <ruby>
            次<rp>(</rp>
            <rt>つぎ</rt>
            <rp>)</rp>
          </ruby>
          へ
        </button>
      </div>
    </div>
  );
};

export default BookSlider;
