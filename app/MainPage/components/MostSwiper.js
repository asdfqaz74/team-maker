"use client";

import { useState, useRef } from "react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Image from "next/image";

export default function MostSwiper({ champions }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shiftedChampions = [...champions.slice(1), champions[0]];

  // 스와이퍼 참초 객체
  const contentSwiperRef = useRef(null);
  const bgSwiperRef = useRef(null);

  // 버튼 동기화
  const handleNext = () => {
    contentSwiperRef.current?.slideNext();
    bgSwiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    contentSwiperRef.current?.slidePrev();
    bgSwiperRef.current?.slidePrev();
  };

  return (
    <div className="relative w-full h-[37.5rem] rounded-2xl">
      {/* 배경 이미지 Swiper */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        speed={1000}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        allowTouchMove={false}
        onSwiper={(swiper) => (bgSwiperRef.current = swiper)}
        className="absolute inset-0 opacity-70 z-0 rounded-2xl"
      >
        {shiftedChampions.map((champion, idx) => {
          return (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-[37.5rem]">
                <Image
                  src={champion.logo}
                  alt={champion.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* 타이틀 */}
      <Image
        src="/images/MainPage/MostLogo.png"
        alt="모스트 챔피언 5"
        width={400}
        height={100}
        className="absolute top-5 left-10 z-20"
      />

      {/* Swiper 콘텐츠 */}

      <div className="absolute inset-0 z-10 py-10 px-5">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-custom-next",
            prevEl: ".swiper-custom-prev",
          }}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          speed={1000}
          allowTouchMove={false}
          onSwiper={(swiper) => (contentSwiperRef.current = swiper)}
          className="w-full h-full z-10"
        >
          {champions.map((champion, idx) => {
            const isSecondSlide = idx === (activeIndex + 1) % champions.length;

            return (
              <SwiperSlide key={idx} className="flex justify-center items-end">
                <div
                  className={`relative rounded-2xl shadow-lg overflow-visible transition-all duration-300 border border-amber-50 translate-x-15 ${
                    isSecondSlide
                      ? "w-60 h-90 translate-y-40"
                      : "w-50 aspect-square translate-y-80"
                  }`}
                >
                  <div
                    className={`absolute w-full h-full rounded-2xl overflow-hidden
                      }`}
                  >
                    <Image
                      src={champion.image}
                      alt={champion.name}
                      fill
                      priority
                      className={`object-cover rounded-2xl ${
                        isSecondSlide ? "object-center" : "object-[center_20%]"
                      }`}
                    />
                  </div>
                </div>
                {isSecondSlide && (
                  <div className="absolute top-0 -right-[31.25rem]">
                    <div className="flex flex-col gap-4">
                      <p className="text-4xl font-bold">{champion.name}</p>
                      <div className="flex gap-4 items-end">
                        <p className="text-xl font-semibold">총 게임 수</p>
                        <p>{champion.count} 게임</p>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* 커스텀 버튼 */}
      <button
        className="swiper-custom-prev absolute -left-20 top-1/2 -translate-y-1/2 z-30 w-[60px] h-[60px] cursor-pointer"
        onClick={handlePrev}
      >
        <Image
          src="/images/MainPage/Left circle.png"
          alt="이전 슬라이드"
          fill
          className="object-contain"
        />
      </button>

      <button
        className="swiper-custom-next absolute -right-20 top-1/2 -translate-y-1/2 z-30 w-[50px] h-[50px] cursor-pointer rotate-180"
        onClick={handleNext}
      >
        <Image
          src="/images/MainPage/Left circle.png"
          alt="다음 슬라이드"
          fill
          className="object-contain"
        />
      </button>
    </div>
  );
}
