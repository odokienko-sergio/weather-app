import React from "react";
import Current from "./Current";
import cloudsImage from "../assets/img/clouds.png";
import cloundlyImage from "../assets/img/cloundly.png";
import lightRainImage from "../assets/img/light-rain.png";
import rainImage from "../assets/img/rain.png";
import snowImage from "../assets/img/snow.png";
import clearImage from "../assets/img/clear.png";

const Week = (props) => {
    const weatherImageMap = {
        Clouds: cloudsImage,
        Cloundly: cloundlyImage,
        'Light Rain': lightRainImage,
        Rain: rainImage,
        'Snow': snowImage,
        'Clear': clearImage,
    };

    const formatDay = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    const isCurrentDay = (dateString) => {
        const currentDate = new Date();
        const date = new Date(dateString);
        return (
            date.getFullYear() === currentDate.getFullYear() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getDate() === currentDate.getDate()
        );
    };

    return (
        <div className="week-container">
            {props.weekData.map((day, index) => (
                <div key={index}
                     className={`day-forecast ${
                         isCurrentDay(day.day) ? 'current-day' : ''
                     }`}
                >
                    {isCurrentDay(day.day) ? (
                        <Current
                            temp={Math.round(
                                props.currentDay.main.temp - 273.15
                            ) + '°C'}
                            precipitation={props.currentDay.weather[0].main}
                        />
                    ) : (
                        <>
                            <p className={"day-of-the-week"}>{formatDay(day.day)}</p>
                            <img
                                src={weatherImageMap[day.precipitation]}
                                alt={day.precipitation}
                            />
                            <p className="day-forecast-text">{day.precipitation}</p>
                            <p className="day-forecast-degrees">
                                {Math.round(day.temp - 273.15)}°C
                            </p>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Week;
