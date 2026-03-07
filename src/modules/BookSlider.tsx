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
    loop: false,
    loopAdditionalSlides: 1,
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

  };



  return (
    <div>
      <div className="flex flex-wrap md:flex-nowrap justify-between md:justify-center items-center">
        <button
          id="slide__button-prev"
          className="order-2 md:order-1 inline-block cursor-pointer w-[60px] h-[60px] flex-none ml-5 md:ml-0 md:mr-5 bg-mint-800 text-white rounded-full"
        >
          <ruby>
            前<rp>(</rp>
            <rt>まえ</rt>
            <rp>)</rp>
          </ruby>
          へ
        </button>
        <div className="w-full md:flex-1 order-1 md:order-2 min-w-0 max-w-full lg:max-w-3xl mb-8 md:mb-0">
          <Swiper
            {...options}
            className="w-full shadow-md
                  [--swiper-pagination-bullet-size:20px]
                  [--swiper-pagination-bullet-width:20px]
                  [--swiper-pagination-bullet-height:20px]
                  [--swiper-pagination-bullet-inactive-opacity:0.2]
                  [--swiper-pagination-bullet-horizontal-gap:10px]"
          >
            {book.items.map(({ src, alt }) => (
              <SwiperSlide key={src}>
                <figure>
                  <img src={src} alt={alt ?? ""} />
                  {alt ? <figcaption className="block p-4 md:mb-4 text-left">{alt}</figcaption> : null}
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <button
          id="slide__button-next"
          className="order-3 inline-block cursor-pointer w-[60px] h-[60px] flex-none mr-5 md:mr-0 md:ml-5 bg-mint-800 text-white rounded-full"
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
