import React from "react";
import { motion } from "framer-motion";
import img2 from "../../assets/img2.jpg";
import rainImg from "../../assets/img3.jpg";
import "animate.css";

export default function ForecastCards({ forecastDays }) {
  return (
    <div className="space-y-4 m-auto">
      {forecastDays?.map((day, index) => {
        const bgImage = day.day.condition.text.toLowerCase().includes("rain")
          ? rainImg
          : img2;
        const textColorClass =
          bgImage === rainImg ? "text-white" : "text-black";
        return (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.3 }}
            className={`${textColorClass} p-2 rounded h-[80px] bg-cover bg-center bg-no-repeat shadow-lg transition-all flex justify-between hover:scale-105`}
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="flex items-center gap-2">
              <img
                src={day.day.condition.icon}
                alt="icon"
                className="mx-auto w-[50px]"
              />
              <p>{day.day.avgtemp_c}°C</p>
            </div>
            <div>
              <p className=" font-semibold">{day.date}</p>
              <p className=" font-medium">{day.day.condition.text}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
