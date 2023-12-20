import { createContext, useEffect, useState } from "react";
import axios from "axios";
const WeatherContext = createContext();

// eslint-disable-next-line react/prop-types
export const WeatherProvider = ({ children }) => {
  const [weatherConditions, setWeatherConditions] = useState([]);
  const [city, setCity] = useState("Trabzon");

  const values = { weatherConditions, setCity, city };
  const apiKey = "Z77EGKRWEG9G7K8Y46BULAHTH";

  useEffect(() => {
    async function fetching2() {
      await axios(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&include=days&key=${apiKey}&contentType=json`
      )
        .then((res) => res.data)
        .then((res) => res.days)
        .then((res) => {
          setWeatherConditions(res);
        });
    }

    fetching2();
  }, [city]);

  return (
    <WeatherContext.Provider value={values}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
