export * from './account.service';
import { AccountService } from './account.service';
export * from './weatherForecast.service';
import { WeatherForecastService } from './weatherForecast.service';
export const APIS = [AccountService, WeatherForecastService];
