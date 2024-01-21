import { createContext, useContext, useEffect, useState } from "react";
import { Axios } from "../services/Axios";

interface ICityInfo {
  id: number;
  name: string;
  coord: { lat: number; lon: number };
  country: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

interface IWeatherDataItem {
  dt: number;
  clouds: { all: number };
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    humidity: number;
  };
  pop: number;
  sys: {
    pod: string;
  };
  visibility: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

interface IWeatherData {
  cod: string;
  message: number;
  cnt: number;
  city: ICityInfo;
  list: IWeatherDataItem[];
}

interface IForecastContext {
  HandleSearch(city: string): void;
  weatherData: IWeatherData;
  isLocalWeather: boolean;
  GetCityFromCoordinates: (lat: number, lon: number) => void;
}

const ForecastContext = createContext<IForecastContext | undefined>(undefined);

export const ForecastContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLocalWeather, setIsLocalWeather] = useState(true);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  async function HandleSearch(city: string) {
    try {
      const fetch = await Axios.get(`?q=${city}&appid=21fff074562272200782d7c6a3c4a8cc`)
      setWeatherData(fetch.data)
      setIsLocalWeather(false)
      console.log(fetch)
    } catch (error) {
      console.error(error)
    }
  }

  async function GetCityFromCoordinates(lat?: number, lon?: number) {
    try {
      const apiKey = "21fff074562272200782d7c6a3c4a8cc";

      if (lat !== null && lon !== null) {
        const apiUrl = `?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await Axios.get(apiUrl);
        console.log(response.data)
        setWeatherData(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLat(latitude);
          setLon(longitude);

          if (lat !== null && lon !== null) {
            GetCityFromCoordinates(lat, lon);
          }
        },
        function (error) {
          console.error("Erro ao obter a localização: " + error.message);
        }
      );
    } else {
      console.error("O navegador não suporta Geolocation.");
    }

  }, [lat, lon]);

  return (
    <ForecastContext.Provider value={{ HandleSearch, weatherData, isLocalWeather, GetCityFromCoordinates }}>
      {children}
    </ForecastContext.Provider>
  )
}

export const useForecastContext = () => {
  const context = useContext(ForecastContext);
  if (!context) {
    throw new Error("useForecastContext deve ser usado dentro de um ForecastProvider");
  }
  return context;
}