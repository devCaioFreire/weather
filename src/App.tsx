import { CloudSun, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
// import RAIN from './assets/rain.mp4'
import { WeatherChart } from './components/Chart'
import { Container } from './components/Container'
import { Forecast } from './components/Forecast'
import { useForecastContext } from './context/ForecastContext'
import { ChangeBackground } from './hooks/useChangeBackground'
import { ConvertToCelsius, FormatCapitalize, FormatDate } from './utils/formatter'

function App() {
  const [city, setCity] = useState('')
  const [videoUrl, setVideoUrl] = useState('');

  const { HandleSearch, weatherData } = useForecastContext();

  useEffect(() => {
    if (weatherData) {
      const weatherMain = weatherData?.list[0].weather[0].description;
      console.log(weatherMain);

      const conditions = [
        'clear sky',
        'few clouds',
        'scattered clouds',
        'broken clouds',
        'overcast clouds',
        'light rain',
        'moderate rain',
        'heavy rain',
        'light snow',
        'moderate snow',
        'heavy snow',
        'thunderstorm',
        'mist',
      ];

      const videoMapping: { [key: string]: string } = {};

      conditions.forEach(condition => {
        videoMapping[condition] = condition;
      });
      console.log(videoMapping);

      const selectedVideo = videoMapping[weatherMain] || 'clear sky';
      console.log(selectedVideo);

      const videoUrl = ChangeBackground()[selectedVideo];

      setVideoUrl(videoUrl);
      console.log(videoUrl);
    }
  }, [weatherData]);

  return (
    <>
      {weatherData && (
        <div className="flex w-full h-full">
          <video src={videoUrl}
            className='absolute -z-50 w-full h-full object-cover'
            autoPlay loop muted
          />

          <div className='flex flex-col py-20 px-48 items-start'>

            <div className='flex items-center gap-1'>
              <MapPin className='w-12 text-zinc-50 opacity-80' />
              <span className='text-zinc-50 text-lg font-medium w-full'>
                {weatherData?.city.name}
              </span>
            </div>

            <div className='flex flex-col gap-4'>
              <h2 className="text-zinc-50 text-5xl pt-4">
                {weatherData?.list[0].weather[0].main}
              </h2>
              <span className='text-xl text-zinc-50'>{FormatCapitalize(weatherData?.list[0].weather[0].description)}</span>
            </div>

            <div className="flex flex-col gap-1 pt-28">
              <span className="text-zinc-50 text-4xl">{ConvertToCelsius(weatherData.list[0].main.temp)} °C</span>
              <span className="text-zinc-50 text-base">{FormatDate(new Date)}</span>
            </div>

          </div>

          {/* Components */}
          <div className='absolute bottom-[5%] left-[3%] right-[5%] flex items-end gap-10 w-[95%]'>

            {/* Center */}
            <div className='flex flex-col w-full gap-8'>
              <Container className='flex items-center py-8 px-4 w-full h-[23vh] rounded-2xl overflow-auto'>
                <Forecast />
              </Container>
              <Container className='flex py-8 px-4 w-full h-[23vh] rounded-2xl overflow-auto'>
                <WeatherChart />
                {/* GRÁFICO COM A TEMPERATURA NO DIA ATUAL */}
              </Container>
            </div>

            {/* Right */}
            <div className='w-[20%]'>
              <Container className='flex flex-col justify-between py-8 px-4 w-[100%] h-[50vh] rounded-3xl overflow-auto overflow-x-hidden'>

                <input
                  type="search" name="search" id="search" autoComplete='false' placeholder='Search city'
                  onClick={() => HandleSearch} value={city} onChange={(e) => setCity(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      HandleSearch(city);
                    }
                  }}
                  className='bg-transparent border border-neutral-300 rounded-xl p-3 text-neutral-300 mix-blend-difference shadow-lg'
                />

                <div className='flex flex-col gap-4 text-zinc-100'>

                  <h2 className='font-medium'>AIR CONDITIONS</h2>

                  <div className='flex items-center gap-2'>
                    <CloudSun className='text-zinc-50 opacity-60' />
                    <div>
                      <h2 className='text-sm'>Feels Like</h2>
                      <span>{ConvertToCelsius(weatherData.list[0].main.feels_like)} °C</span>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <CloudSun className='text-zinc-50 opacity-60' />
                    <div>
                      <h2 className='text-sm'>Temperature Max</h2>
                      <span>{ConvertToCelsius(weatherData.list[0].main.temp_max)} °C</span>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <CloudSun className='text-zinc-50 opacity-60' />
                    <div>
                      <h2 className='text-sm'>Temperature Min</h2>
                      <span>{ConvertToCelsius(weatherData.list[0].main.temp_min)} °C</span>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <CloudSun className='text-zinc-50 opacity-60' />
                    <div>
                      <h2 className='text-sm'>Humidity</h2>
                      <span>{weatherData.list[0].main.humidity} %</span>
                    </div>
                  </div>

                </div>

              </Container>
            </div>
          </div>

        </div>
      )}
    </>
  )
}

export default App
