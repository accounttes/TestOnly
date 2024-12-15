import { useState } from 'react';
import './style.scss';

interface Props {
    clickActiveIndex: number;
    setClickActiveIndex: (index: number) => void;

    rotateIndex: number;
    setRotateIndex: (index: number) => void;
}

interface Point {
    x: number;
    y: number;
}

function CircleWithPoints({
    clickActiveIndex,
    setClickActiveIndex,
    rotateIndex,
    setRotateIndex,
}: Props) {
    const radius = 265;
    const centerX = 265;
    const centerY = 265;

    const [hoverActiveIndex, setHoverActiveIndex] = useState<number | null>(
        null
    );

    const pointNames = ['Литература', 'Наука', 'Кино'];

    const points: Point[] = Array.from({ length: 6 }, (_, index) => {
        const angle = (index / 6) * (2 * Math.PI);
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
        };
    });

    return (
        <>
            <div
                className="circle"
                style={{
                    transform: `translate(-35%, -50%) rotate(${rotateIndex}deg)`,
                    transition: '1s',
                }}
            >
                {points.map((point, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: point.x,
                            top: point.y,
                            width:
                                clickActiveIndex === index ||
                                hoverActiveIndex === index
                                    ? '56px'
                                    : '7px',
                            height:
                                clickActiveIndex === index ||
                                hoverActiveIndex === index
                                    ? '56px'
                                    : '7px',
                            borderRadius: '50%',
                            backgroundColor:
                                clickActiveIndex === index
                                    ? '#f4f5f9'
                                    : hoverActiveIndex === index
                                      ? '#f4f5f9'
                                      : '#42567A',
                            border: '1px solid #42567A',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition:
                                'width 0.3s, height 0.3s, background-color 0.3s',
                            transform: `translate(-50%, -50%) rotate(-${rotateIndex}deg)`,
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            setClickActiveIndex(index);
                            setRotateIndex(300 - 60 * index);
                            localStorage.setItem(
                                'activeIndex',
                                JSON.stringify(index)
                            );
                        }}
                        onMouseEnter={() => {
                            setHoverActiveIndex(index);
                        }}
                        onMouseLeave={() => {
                            setHoverActiveIndex(null);
                        }}
                    >
                        {}
                        {clickActiveIndex === index ||
                        hoverActiveIndex === index ? (
                            <>
                                <div>{index + 1}</div>
                                <h2 className="point-name">
                                    {pointNames[index]}
                                </h2>
                            </>
                        ) : null}
                    </div>
                ))}
            </div>
        </>
    );
}

export default CircleWithPoints;
