import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useForecastContext } from '../context/ForecastContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

export function WeatherChart() {
  const { weatherData } = useForecastContext();
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [{
      data: [] as number[],
      backgroundColor: 'transparent',
      borderColor: 'white',
      pointBorderColor: 'transparent',
      fill: false,
      tension: 0.5,
    }],
  });

  useEffect(() => {
    if (!weatherData) return;

    const temperatures = weatherData.list.map(entry => entry.main.temp);
    const labels = weatherData.list.map(entry => entry.dt_txt);

    setChartData({
      labels,
      datasets: [{
        data: temperatures,
        backgroundColor: 'transparent',
        borderColor: 'white',
        pointBorderColor: 'transparent',
        fill: false,
        tension: 0.5,
      }],
    });
  }, [weatherData]);

  const options = {
    responsive: true,
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
        borderWidth: 0,
      },
    },
      plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className='relative w-full'>
      <Line options={options} data={chartData} className='w-full max-h-[15vh] border-none' />
    </div>
  );
}
