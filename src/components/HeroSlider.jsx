import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
// assets
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const FarmHeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  const slides = [
    {
      image: img1,
      title: "From Our Farms",
      subtitle: "To Your Hands",
      welcome: "Welcome To Tertwenty Farms",
    },
    {
      image: img2,
      title: "Fresh Produce",
      subtitle: "Every Season",
      welcome: "Quality You Can Trust",
    },
    {
      image: img3,
      title: "Sustainable Farming",
      subtitle: "For Tomorrow",
      welcome: "Growing With Care",
    },
    {
      image: img4,
      title: "Organic Excellence",
      subtitle: "Natural Goodness",
      welcome: "Pure & Healthy",
    },
  ];

  // const AUTOPLAY_DURATION = 5000;
  const AUTOPLAY_DURATION = 5000;

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    script.async = true;

    script.onload = () => {
      setSwiperLoaded(true);
      if (window.Swiper) {
        swiperRef.current = new window.Swiper(".swiper-container", {
          effect: "fade",
          fadeEffect: { crossFade: true },
          speed: 700,
          autoplay: { delay: AUTOPLAY_DURATION, disableOnInteraction: false },
          on: {
            slideChange: (swiper) => {
              setActiveSlide(swiper.activeIndex);
              setProgress(0);
            },
            autoplayTimeLeft: (swiper, time, progressValue) => {
              setProgress((1 - progressValue) * 100);
            },
          },
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (swiperRef.current && swiperRef.current.destroy)
        swiperRef.current.destroy();
    };
  }, []);

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const handleSlideClick = (index) => {
    if (swiperRef.current) swiperRef.current.slideTo(index);
  };

  return (
    <div className="relative h-[100dvh] bg-gray-100 overflow-hidden">
      {/* Swiper Hero */}
      <div className="swiper-container absolute inset-0">
        <div className="swiper-wrapper">
          {slides.map((slide, index) => (
            <div key={index} className="swiper-slide">
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
                <div className="absolute top-1/2 left-6 md:left-28 transform -translate-y-1/2 flex items-center justify-center z-10">
                  <motion.div
                    className="text-custom-white-color"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.p
                      className="text-xl mb-6 tracking-wide"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      {/* {slide.welcome} */}
                      Welcome To TenTwenty Farms
                    </motion.p>
                    <motion.h1
                      className="text-4xl md:text-6xl font-normal mb-1 drop-shadow-lg capitalize"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {slide.title}
                      {/* From our Farms */}
                    </motion.h1>
                    <motion.h2
                      className="text-4xl md:text-6xl font-normal mb-1 drop-shadow-lg capitalize"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {slide.subtitle}
                      {/* to your hands */}
                    </motion.h2>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-12 left-6 md:left-28 z-20 flex items-center gap-4 md:gap-8">
        {/* Thumbnail with Next Button */}
        <motion.div
          className="relative w-32 h-32 md:w-36 md:h-36 overflow-hidden shadow-2xl 
           flex justify-center items-center"
          key={activeSlide}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer transparent border frame */}
          <div className="absolute inset-1 border border-white/30"></div>
          <img
            src={slides[(activeSlide + 1) % slides.length].image}
            //  src={
            //   slides[(activeIndex + 1) % slides.length].image
            // }
            alt={slides[activeSlide].title}
            className="object-cover w-20 h-20 md:w-24 md:h-24"
          />

          {/* Progress Border */}
          <svg
            className="absolute -inset-1 pointer-events-none"
            style={{ width: "calc(100% + 8px)", height: "calc(100% + 8px)" }}
          >
            <rect
              x="4"
              y="4"
              width="calc(100% - 8px)"
              height="calc(100% - 8px)"
              fill="none"
              stroke="white"
              strokeWidth="20"
              rx="0"
              strokeDasharray="600"
              strokeDashoffset={600 - (600 * progress) / 100}
              style={{
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
          </svg>

          {/* Next Button Overlay */}
          <motion.button
            onClick={handleNext}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <span className="text-custom-white-color font-medium text-lg">
              Next
            </span>
          </motion.button>
        </motion.div>

        {/* Progress Line and Slide Numbers */}
        <div className="flex items-center gap-6">
          {/* Current Slide Number */}
          <div className="text-custom-white-color font-medium text-2xl w-5">
            {String(activeSlide + 1).padStart(2, "0")}
          </div>

          {/* Horizontal Progress Line */}
          <div className="relative w-24 md:w-32 h-0.5 bg-custom-white-color">
            <div className="absolute left-0 top-0 h-full" />
          </div>

          {/* Total Slides Number */}
          <div className="text-custom-white-color font-medium text-2xl w-5">
            {String(slides.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmHeroSlider;
