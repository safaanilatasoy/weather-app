import{ useContext, useState, useEffect } from "react";
import CityContext from "../context/CityContext";
import WeatherContext from "../context/WeatherContext";

function Container() {
  const cities = useContext(CityContext);
  const { weatherConditions, setCity, city } = useContext(WeatherContext);

  const [dateTimes, setDateTimes] = useState([]);
  const [day, setDay] = useState();

  const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

  useEffect(() => {
    weatherConditions.forEach((item) =>
      setDateTimes((current) => [...current, item.datetime])
    );
    const day = new Date(dateTimes[0]);
    setDay(day.getDay());
  }, [weatherConditions]);

  function handleCity(e) {
    setCity(e.target.value);
  }

  return (
    <div className="generalContainer">
      <div>
        <select
          name="city-names"
          id="city-names"
          onChange={handleCity}
          value={city}
        >
          {cities.map((city, i) => (
            <option key={i} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div className="card">
        {weatherConditions.map((weather, i) => (
          <div className="innerContainer" key={i}>
            <div className="textBox">{days[(day + i) % 7]}</div>

            <div className="textBox">
              <img width={`35px`} src={`src/assets/cloudy.png`} />
              <span>{Math.round(weather.tempmax)}° </span>
              <span>{Math.round(weather.tempmin)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Container;
