import React, { useState, useEffect } from "react";
import './App.css';
import Header from "./components/Header";
import Week from "./components/Week";
import axios from "axios";

const key = "837705b1ff42a8546e87dcecda4b48e5";

const parseWeekData = (data) => {
    const filteredData = data.filter((item, index, array) => {
        return array.findIndex((entry) => isSameDay(entry.dt_txt, item.dt_txt)) === index;
    });

    return filteredData.map((item) => ({
        day: item.dt_txt,
        temp: item.main.temp,
        precipitation: item.weather[0].main,
    }));
};

const isSameDay = (dateString1, dateString2) => {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

const App = () => {
  const [weather, setWeather] = useState({});
  const [weekData, setWeekData] = useState([]);
  const [newCity, setNewCity] = useState("");

  useEffect(() => {
    const fetchWeatherData = () => {
          navigator.geolocation.getCurrentPosition((position) => {
              const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}`;
              const weekApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}`;

              axios.all([axios.get(apiUrl), axios.get(weekApiUrl)])
                  .then(axios.spread((weatherRes, weekRes) => {
                      setWeather(weatherRes.data);
                      setWeekData(parseWeekData(weekRes.data.list));
                  }))
                  .catch((error) => {
                      console.error("Error fetching data:", error);
                  });
          });
      };
    // Fetch weather data for the user's current location when the component mounts
    fetchWeatherData();
  }, []);



  const handleCityChange = (newCity) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${key}`;
    const weekApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${newCity}&appid=${key}`;

    axios.all([axios.get(apiUrl), axios.get(weekApiUrl)])
        .then(axios.spread((weatherRes, weekRes) => {
          setWeather(weatherRes.data);
          setWeekData(parseWeekData(weekRes.data.list));
        }))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  };

  return (
      <div className="base">
        <Header place={weather.name} onCityChange={handleCityChange} newCity={newCity} setNewCity={setNewCity} />
        <main>
          <Week
              weekData={weekData}
              currentDay={weather}
          />
        </main>
      </div>
  );
};

export default App;
