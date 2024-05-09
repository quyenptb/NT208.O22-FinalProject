import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = ({city}) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = `${process.env.REACT_APP_OPEN_WEATHER_KEY}`;
        //const city = 'Ho Chi Minh City';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Đã xảy ra lỗi trong quá trình lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {(weatherData != null) && (
        <>
          <>{weatherData.name}, {weatherData.main.temp}°C, 
          <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather icon" />
          </>
        </>
      )}
    </>
  );
};

export default WeatherComponent;
