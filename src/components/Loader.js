import React, { useState, useEffect } from 'react';
import "./../styles/Home.css";
import Profile from '../images/White.png';

const getPath = (letter) => {
    const paths = {
        'a': 'M20 30 Q10 30 10 45 Q10 60 20 60 Q30 60 30 45 M30 45 Q30 30 20 30',
        'b': 'M10 45 L10 15 Q20 15 20 25 Q20 35 10 35',
        'c': 'M30 15 Q10 15 10 30 Q10 45 30 45',
        'd': 'M30 60 L30 15 Q20 15 20 30 Q20 45 30 45', 
        'e': 'M30 30 L10 30 M30 15 Q10 15 10 30 Q10 45 30 45',
        'f': 'M20 15 L20 45 M10 15 L30 15',
        'g': 'M30 25 Q20 15 10 25 Q10 35 20 45 Q30 35 20 25',
        'h': 'M10 45 L10 15 M10 30 Q20 15 30 30 L30 45',
        'i': 'M20 15 L20 45 M15 10 L25 10',
        'j': 'M20 15 L20 45 Q15 45 10 40',
        'k': 'M10 45 L10 15 M10 30 L30 15 M10 30 L30 45',
        'l': 'M10 15 L10 45',
        'm': 'M10 45 L10 15 L20 35 L30 15 L30 45',
        'n': 'M10 45 L10 15 L30 45 L30 15',
        'o': 'M20 15 Q10 15 10 30 Q10 45 20 45 Q30 45 30 30 Q30 15 20 15',
        'p': 'M10 45 L10 15 Q20 15 20 25 Q20 35 10 35',
        'q': 'M30 45 L30 15 Q20 15 20 25 Q20 35 30 35',
        'r': 'M10 45 L10 15 L30 15',
        's': 'M30 15 Q10 15 10 30 Q10 45 30 45 Q30 30 10 30',
        't': 'M20 15 L20 45 M10 15 L30 15',
        'u': 'M10 15 L10 30 Q10 45 20 45 Q30 45 30 30 L30 15',
        'v': 'M10 15 L20 45 L30 15',
        'w': 'M10 15 L15 45 L20 25 L25 45 L30 15',
        'x': 'M10 15 L30 45 M30 15 L10 45',
        'y': 'M10 15 L20 30 L30 15 L20 45',
        'z': 'M10 15 L30 15 L10 45 L30 45',
        'A': 'M20 10 L10 45 L30 45 L20 10',
        'B': 'M10 45 L10 15 Q20 15 20 25 Q20 35 10 35 Q20 35 20 45 Q20 55 10 55',
        'C': 'M30 10 Q10 10 10 30 Q10 50 30 50',
        'D': 'M10 45 L10 15 Q20 15 30 30 Q20 45 10 45',
        'E': 'M30 10 L10 10 L10 50 L30 50 M10 30 L30 30',
        'F': 'M10 10 L10 50 M10 30 L30 30',
        'G': 'M30 10 Q10 10 10 30 Q10 50 30 50 M20 30 L30 30',
        'H': 'M10 10 L10 50 M30 10 L30 50 M10 30 L30 30',
        'I': 'M10 10 L30 10 M20 10 L20 50 M10 50 L30 50',
        'J': 'M30 10 L30 50 Q30 60 20 60 Q10 60 10 50',
        'K': 'M10 10 L10 50 M30 10 L10 30 L30 50',
        'L': 'M10 10 L10 50 L30 50',
        'M': 'M10 50 L10 10 L20 30 L30 10 L30 50',
        'N': 'M10 50 L10 10 L30 50 L30 10',
        'O': 'M20 10 Q10 10 10 30 Q10 50 20 50 Q30 50 30 30 Q30 10 20 10',
        'P': 'M10 45 L10 15 L25 15 Q35 15 35 25 Q35 35 25 35 L10 35',
        'Q': 'M20 10 Q10 10 10 30 Q10 50 20 50 Q30 50 30 30 Q30 10 20 10 M25 35 L35 45',
        'R': 'M10 45 L10 15 L25 15 Q35 15 35 25 Q35 35 25 35 L10 35 M20 35 L30 45',
        'S': 'M30 10 Q10 10 10 30 Q10 50 30 50 Q30 30 10 30',
        'T': 'M10 10 L30 10 M20 10 L20 50',
        'U': 'M10 10 L10 30 Q10 50 20 50 Q30 50 30 30 L30 10',
        'V': 'M10 10 L20 50 L30 10',
        'W': 'M10 10 L15 50 L20 30 L25 50 L30 10',
        'X': 'M10 10 L30 50 M30 10 L10 50',
        'Y': 'M10 10 L20 30 L30 10 L20 50',
        'Z': 'M10 10 L30 10 L10 50 L30 50',
        ' ': '', // Space
        '.': 'M20 45 Q19 45 19 46 Q19 47 20 47 Q21 47 21 46 Q21 45 20 45', // Dot
        ',': 'M20 45 Q19 45 19 46 Q19 47 20 47 Q21 47 21 46 Q21 46 20 47 Q19 48 18 49' // Comma
    };

    return paths[letter] || "M20 15 L20 45";
};

const Loader = ({ bgcolor }) => {
    const letters = "Loading...".split('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
            setTimeout(() => {
                setIsLoading(true);
            }, 100); // Small delay to restart the animation
        }, 5000); // Duration of the animation

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loader" style={{ background: bgcolor }}>
            <img src={Profile} alt="Profile" style={{ width: "142px", height: "50px" }} />
            <div className="flex">
                {isLoading && letters.map((letter, index) => (
                    <svg
                        key={index}
                        className="loader-text"
                        viewBox="0 0 40 60"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d={getPath(letter)}
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <animate
                                attributeName="stroke-dasharray"
                                from="0 100"
                                to="100 0"
                                dur="1.8s"
                                begin={`${index * 0.1}s`}
                                fill="freeze"
                            />
                        </path>
                    </svg>
                ))}
            </div>
        </div>
    );
};

export default Loader;
