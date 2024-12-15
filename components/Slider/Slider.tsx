import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import './style.scss';
import { useCallback, useEffect, useState } from 'react';
import SwiperButtonPrevSvg from '../../assets/swiper-button-prev.svg';
import SwiperButtonNextSvg from '../../assets/swiper-button-next.svg';

SwiperCore.use([Pagination, Navigation]);

interface Props {
    clickActiveIndex: number;
    slides: Array<{
        id: number;
        clickActiveIndex: number;
        yearRange: number[];
        events: Array<{ year: number; event: string }>;
    }>;
}

const Slider = ({ slides, clickActiveIndex }: Props) => {
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideCount, setSlideCount] = useState(0);

    const [visiblePrevButton, setVisiblePrevButton] = useState<boolean>(true);
    const [visibleNextButton, setVisibleNextButton] = useState<boolean>(true);

    const handlePrevious = useCallback(() => {
        swiperRef?.slidePrev();
    }, [swiperRef]);

    const handleNext = useCallback(() => {
        swiperRef?.slideNext();
    }, [swiperRef]);

    const handleSlideChange = () => {
        if (swiperRef) {
            const currentIndex = swiperRef.activeIndex;
            if (swiperRef.isBeginning) {
                setVisiblePrevButton(false);
                setVisibleNextButton(true);
            }
            if (swiperRef.isEnd) {
                setVisibleNextButton(false);
                setVisiblePrevButton(true);
            }
            setCurrentIndex(currentIndex);
        }
    };

    const handleSwiper = (swiper: SwiperClass) => {
        setSwiperRef(swiper);
        setSlideCount(swiper.slides.length);
    };

    useEffect(() => {
        setVisiblePrevButton(false);
    }, []);

    useEffect(() => {
        if (currentIndex > 0) {
            setVisiblePrevButton(true);
        }

        if (currentIndex + 1 === slideCount) {
            setVisibleNextButton(false);
        } else {
            setVisibleNextButton(true);
        }
    }, [currentIndex, slideCount]);

    return (
        <>
            <Swiper
                navigation
                autoplay={false}
                pagination={{ clickable: true }}
                touchStartPreventDefault={false}
                touchMoveStopPropagation={false}
                style={{ width: '60%', height: '100%' }}
                grabCursor={true}
                spaceBetween={30}
                resistance={false}
                loop={false}
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
            >
                {slides &&
                    slides.map((slide, index) => (
                        <div key={slide.id}>
                            {slide.clickActiveIndex === clickActiveIndex
                                ? slide.events.map(({ year, event }, index) => (
                                      <SwiperSlide key={index}>
                                          <div className="slide-year">
                                              {year}
                                          </div>
                                          <div className="slide-desc">
                                              {event}
                                          </div>
                                      </SwiperSlide>
                                  ))
                                : null}
                        </div>
                    ))}
            </Swiper>
            {visiblePrevButton && (
                <div>
                    <button
                        className="swiper-button-prev-unique"
                        onClick={handlePrevious}
                    >
                        <SwiperButtonPrevSvg />
                    </button>
                </div>
            )}
            {visibleNextButton && (
                <div>
                    <button
                        className="swiper-button-next-unique"
                        onClick={handleNext}
                    >
                        <SwiperButtonNextSvg />
                    </button>
                </div>
            )}
        </>
    );
};

export default Slider;
