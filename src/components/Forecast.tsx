import { BsCloudLightningRainFill, BsSunFill } from 'react-icons/bs';
import { FaRegSnowflake } from 'react-icons/fa';
import { IoMdRainy } from 'react-icons/io';
import { RiSunCloudyFill } from 'react-icons/ri';
import { useForecastContext } from "../context/ForecastContext";
import { ConvertToCelsius, getDayOfWeek } from "../utils/formatter";

interface WeatherIcons {
  [key: string]: JSX.Element;
}

export const Forecast = () => {
  const { weatherData } = useForecastContext();

  const currentDate = new Date();
  const next7Days = [];
  const uniqueDays = new Set();

  for (const dayData of weatherData.list) {
    const dateParts = dayData.dt_txt.split(" ");
    const date = new Date(dateParts[0]);
    const dayOfWeek = getDayOfWeek(dayData.dt_txt);

    if (date > currentDate && !uniqueDays.has(dayOfWeek) && next7Days.length < 7) {
      next7Days.push(dayData);
      uniqueDays.add(dayOfWeek);
    }
  }

  const weatherIcons: WeatherIcons = {
    Clear: <BsSunFill className="text-2xl" />,
    Clouds: <RiSunCloudyFill className="text-2xl" />,
    Rain: <IoMdRainy className="text-2xl" />,
    Thunderstorm: <BsCloudLightningRainFill className="text-2xl" />,
    Snow: <FaRegSnowflake className="text-2xl" />
  }

  return (
    <div className="flex justify-between w-full text-zinc-50 px-4">
      {next7Days.map((day) => (
        <div
          key={day.dt}
          className="flex flex-col items-center gap-4">
          <p>{getDayOfWeek(day.dt_txt)}</p>

          {weatherIcons[day.weather[0].main]}

          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-sm">Max</h3>
              <span className="text-sm">{ConvertToCelsius(day.main.temp_max)} °C</span>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-sm">Min</h3>
              <span className="text-sm">{ConvertToCelsius(day.main.temp_min)} °C</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
