import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function ConvertToCelsius(kelvin: number) {
  const celsius = kelvin - 273.15;
  return Math.round(celsius);
}

export function FormatDate(date: Date): string {
  const formattedDate = format(date, 'EEEE | d LLL yyyy', { locale: enUS });
  return formattedDate;
}

export function FormatHour(hour: string): string {
  const hour_api = new Date(hour);
  const formattedHour = format(hour_api, 'HH:mm', { locale: enUS });
  return formattedHour;
}

export function FormatCapitalize(text: string) {
  const words = text.split(" ");
  const capitalizedWords = words.map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
}

export const getDayOfWeek = (dateString: string) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
};