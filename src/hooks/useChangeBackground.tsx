import BROKEN_CLOUDS from '../assets/brokenClouds.mp4';
import CLEAR from '../assets/clear.mp4';
import FEW_CLOUDS from '../assets/fewClouds.mp4';
import HEAVY_RAIN from '../assets/heavyRain.mp4';
import HEAVY_SNOW from '../assets/heavySnow.mp4';
import LIGHT_RAIN from '../assets/lightRain.mp4';
import LIGHT_SNOW from '../assets/lightSnow.mp4';
import MIST from '../assets/mist.mp4';
import MODERATE_RAIN from '../assets/moderateRain.mp4';
import MODERATE_SNOW from '../assets/moderateSnow.mp4';
import OVERCAST_CLOUDS from '../assets/overcastClouds.mp4';
import SCATTERED_CLOUDS from '../assets/scatteredClouds.mp4';
import THUNDERSTORM from '../assets/thunderstorm.mp4';

interface WeatherIcons {
  [key: string]: string;
}

export const ChangeBackground = () => {
  const weather: WeatherIcons = {
    'clear sky': CLEAR,
    'few clouds': FEW_CLOUDS,
    'scattered clouds': SCATTERED_CLOUDS,
    'broken clouds': BROKEN_CLOUDS, 
    'overcast clouds': OVERCAST_CLOUDS, 
    'light rain': LIGHT_RAIN, 
    'moderate rain': MODERATE_RAIN, 
    'heavy rain': HEAVY_RAIN, 
    'light snow': LIGHT_SNOW, 
    'moderate snow': MODERATE_SNOW, 
    'heavy snow': HEAVY_SNOW, 
    'thunderstorm': THUNDERSTORM,
    'mist': MIST,
  }
  return weather
}

