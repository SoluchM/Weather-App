import React, { useState } from 'react';
import Clear from "./image/Clear.png";
import Clouds from "./image/Clouds.png";
import Drizzle from "./image/Drizzle.png";
import Mist from "./image/Mist.png";
import Rain from "./image/Rain.png";
import Polana from "./image/polana.png";
import Thunderstorm from "./image/Thunderstorm.png";
import Snow from "./image/Snow.png";

const api = {
  key: "3b5cff616604c3fac74ed40311ad2ce2",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod === "404") {
            setErrorMessage("Nie znaleziono miasta");
            setData({});
          } else {
            setData(result);
            setErrorMessage('');
          }
          setQuery('');
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień"
    ];
    let days = [
      "Niedziela",
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  let backgroundImage = Polana;

  if (typeof data.weather !== "undefined") {
    switch (data.weather[0].main) {
      case "Clear":
        backgroundImage = Clear;
        break;
      case "Clouds":
        backgroundImage = Clouds;
        break;
      case "Drizzle":
        backgroundImage = Drizzle;
        break;
      case "Mist":
        backgroundImage = Mist;
        break;
      case "Rain":
        backgroundImage = Rain;
        break;
      case "Thunderstorm":
        backgroundImage = Thunderstorm;
        break;
      case "Snow":
        backgroundImage = Snow;
        break;
      default:
        backgroundImage = Polana;
    }
  }

  const weatherTranslations = {
    Clear: "Słonecznie",
    Clouds: "Pochmurnie",
    Drizzle: "Lekki deszcz",
    Mist: "Mgliście",
    Rain: "Deszczowo",
    Thunderstorm: "Burzowo",
    Snow: "Opady śniegu"
  };

  const getTimeWithTimezone = (time, timezone) => {
    const localTime = new Date((time + timezone) * 1000).toLocaleTimeString('pl-PL', { timeZone: 'UTC', hour: 'numeric', minute: 'numeric' });
    return localTime;
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "bottom"
      }}
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Wpisz miasto"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof data.main !== "undefined" ? (
          <div className="weather-box">
            <div className="info">
              <div className="location-box">
                <div className="location">{data.name}, {data.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather">{weatherTranslations[data.weather[0].main]}</div>
              <div className='temp'>{Math.round(data.main.temp)}°C</div>
              <div className="pressure">Ciśnienie {data.main.pressure} hPa</div>
              <div className="sun">Wschód {getTimeWithTimezone(data.sys.sunrise, data.timezone)}</div>
              <div className="sun">Zachód {getTimeWithTimezone(data.sys.sunset, data.timezone)}</div>
            </div>
          </div>
        ) : (
          <div className="message">
            <div className="error-message">{errorMessage}</div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
