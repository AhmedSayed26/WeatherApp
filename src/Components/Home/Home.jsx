import React, { useState, useEffect } from "react";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import rainImg from "../../assets/img3.jpg";
import { useFormik } from "formik";
import axios from "axios";
import ForecastCards from "../ForcastCard/ForecastCards";

export default function Home() {
  const [BackGround, setBackGround] = useState(img1);
  const [showResultDiv, setShowResultDiv] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    weatherimg();
  }, [weatherData]);
  function weatherimg() {
    if (!weatherData) return;
    if (weatherData.current.temp_c <= 20) {
      setBackGround(rainImg);
    } else {
      setBackGround(img2);
    }
  }
  async function getWeatherApi(cityName) {
    try {
      const options = {
        url: `https://api.weatherapi.com/v1/forecast.json?key=9bd493d555c44208bf652107252304&q=${cityName}&days=${3}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setWeatherData(data);
      setShowResultDiv(true);
      handleChangeBackground();
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("error");
    }
  }

  const formik = useFormik({
    initialValues: {
      city: "",
    },
    onSubmit: (values) => {
      getWeatherApi(values.city);
    },
  });

  function handleChangeBackground() {
    setBackGround(img2);
  }

  const BodyImg = {
    backgroundImage: `url(${BackGround})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    minWidth: "100vw",
    transition: "all 1s",
  };

  return (
    <div
      style={BodyImg}
      className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center gap-4 px-2"
    >
      <div
        className={`w-full max-w-[410px] my-4 md:my-0 bg-white/20 backdrop-blur-md p-2 text-center space-y-5.5 rounded-2xl transition-all duration-1000 ${
          showResultDiv
            ? "-translate-x-[0] md:-translate-x-[10%] "
            : "translate-x-0 opacity-100"
        }`}
      >
        <h1 className="text-xl font-semibold text-black/90">Weather</h1>
        <h2 className="text-xl text-white font-semibold">
          Find the weather of any city
        </h2>
        <p className="text-xl text-white font-semibold">
          Enter the name of the city to get the weather
        </p>
        <form onSubmit={formik.handleSubmit}>
          <input
            className="text-black text-2xl border-b-2 border-blue-400 focus:outline-none w-[250px] text-center "
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn mt-4 bg-blue-500 text-white px-4 py-2 rounded "
            >
              Get Weather
            </button>
          </div>
        </form>
      </div>

      {showResultDiv && weatherData && (
        <>
          <div className="my-4 md:my-0 space-y-7 bg-white/20 backdrop-blur-md rounded-xl p-6 text-center text-white transition-all duration-700 animate-fade-in w-[375px]  md:w-[410px] animate__animated animate__backInRight animate__slow">
            <h2 className="text-3xl font-bold text-black">
              {weatherData.location.name}
            </h2>
            <img
              src={weatherData.current.condition.icon}
              alt="weather icon"
              className="mx-auto w-[80px]"
            />
            <div className="space-y-1">
              <p className="text-2xl">{weatherData.current.temp_c}°C -</p>
              <p>{weatherData.current.condition.text}</p>
            </div>
          </div>
          <div className="p-6 text-center  space-y-6 transition-all duration-700 animate-fade-in w-[420px] md:w-[450px]">
            <ForecastCards
              key={weatherData.location.name}
              forecastDays={weatherData?.forecast?.forecastday}
            />
          </div>
        </>
      )}
    </div>
  );
}
