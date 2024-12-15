import { useEffect, useState, useRef } from 'react';
import Slider from '../components/Slider/Slider';

import TimelinePage from '../pages/TimelinePage';
import CircleWithPoints from '../components/CircleWithPoints/CircleWithPoints';
import TitleLineSvg from '../assets/title-line.svg';
import eventsList from '../consts/eventsList';

import './styles/styles.scss';
import './styles/resets.scss';

interface AppProps {}

const App: React.FC<AppProps> = () => {
    const [clickActiveIndex, setClickActiveIndex] = useState(0);
    const [rotateIndex, setRotateIndex] = useState(0);

    const [currentYear, setCurrentYear] = useState(1992);
    const [secondYear, setSecondYear] = useState(2022);

    const animationSpeed = 60;

    const intervalRef = useRef<number | null>(null);

    const targetYears1 = [1992, 1999, 1987, 1992, 1999, 1987];
    const targetYears2 = [1997, 2004, 1991, 1997, 2004, 1991];

    const [isHoveredLeft, setIsHoveredLeft] = useState(false);
    const [isHoveredRight, setIsHoveredRight] = useState(false);

    const hoveredSelectorStyleLeft = {
        backgroundColor: isHoveredLeft ? 'white' : 'inherit',
        transition: '0.5s',
    };

    const hoveredSelectorStyleRight = {
        backgroundColor: isHoveredRight ? 'white' : 'inherit',
        transition: '0.5s',
    };

    useEffect(() => {
        setClickActiveIndex(1);
    }, []);

    useEffect(() => {
        setRotateIndex(300 - 60 * clickActiveIndex);
        if (clickActiveIndex === 0) {
            setRotateIndex(300);
        }
    }, [clickActiveIndex]);

    const animateToYear = (targetYear1: number, targetYear2: number) => {
        const animateYear = () => {
            const increment1 = Math.sign(targetYear1 - currentYear);
            const increment2 = Math.sign(targetYear2 - secondYear);

            const newYear1 = currentYear + increment1;
            const newYear2 = secondYear + increment2;

            setCurrentYear(newYear1);
            setSecondYear(newYear2);

            if (newYear1 === targetYear1 && newYear2 === targetYear2) {
                clearInterval(intervalRef.current!);
                intervalRef.current = null;
            }
        };

        if (intervalRef.current !== null) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(animateYear, animationSpeed);
    };

    useEffect(() => {
        const index = Math.min(clickActiveIndex, targetYears1.length - 1);
        animateToYear(targetYears1[index], targetYears2[index]);
    }, [clickActiveIndex, animateToYear, targetYears1, targetYears2]);

    return (
        <section className="app-container">
            <div className="left-line">
                <TitleLineSvg />
            </div>
            <div className="date-block">
                <div className="main-date">{currentYear}</div>
                <div className="main-date">{secondYear}</div>
            </div>
            <div className="right-line"></div>
            <h1 className="title">Исторические даты</h1>
            <TimelinePage />
            <CircleWithPoints
                clickActiveIndex={clickActiveIndex}
                setClickActiveIndex={setClickActiveIndex}
                rotateIndex={rotateIndex}
                setRotateIndex={setRotateIndex}
            />
            <div className="switch">
                <div className="switch-date">0{clickActiveIndex + 1}/06</div>
                <div className="selectors">
                    <button
                        className="selector"
                        style={
                            clickActiveIndex + 1 === 1
                                ? { opacity: 0.5 }
                                : { ...hoveredSelectorStyleLeft }
                        }
                        onMouseEnter={() => setIsHoveredLeft(true)}
                        onMouseLeave={() => setIsHoveredLeft(false)}
                        onClick={() =>
                            setClickActiveIndex((prev) => Math.max(0, prev - 1))
                        }
                    ></button>
                    <button
                        className="selector"
                        onMouseEnter={() => setIsHoveredRight(true)}
                        onMouseLeave={() => setIsHoveredRight(false)}
                        style={
                            clickActiveIndex + 1 === 6
                                ? { opacity: 0.5 }
                                : { ...hoveredSelectorStyleRight }
                        }
                        onClick={() =>
                            setClickActiveIndex((prev) => Math.min(5, prev + 1))
                        }
                    ></button>
                </div>
            </div>

            <Slider slides={eventsList} clickActiveIndex={clickActiveIndex} />
        </section>
    );
};

export default App;
