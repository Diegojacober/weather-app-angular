import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/api/weather.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionSunnyOutline, ionWaterOutline } from '@ng-icons/ionicons';
import {
  tablerCloudBolt,
  tablerCloudRain,
  tablerHazeMoon,
  tablerHeart,
  tablerHeartFilled,
  tablerSnowflake,
  tablerSun,
  tablerSunMoon,
  tablerSunrise,
  tablerSunset,
  tablerWind,
} from '@ng-icons/tabler-icons';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../components/chart/chart.component';
import { Favorite, Hourly } from '../../../types';
import { LoadingComponent } from '../../components/loading/loading.component';
import { featherCloudDrizzle } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [NgIconComponent, CommonModule, ChartComponent, LoadingComponent],
  viewProviders: [
    provideIcons({
      ionWaterOutline,
      ionSunnyOutline,
      tablerSunrise,
      tablerSunset,
      tablerSunMoon,
      tablerHazeMoon,
      tablerCloudRain,
      tablerSun,
      tablerWind,
      tablerCloudBolt,
      featherCloudDrizzle,
      tablerSnowflake,
      tablerHeart,
      tablerHeartFilled,
    }),
  ],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss',
})
export class CityComponent {
  stateId: number = 0;
  cityId: number = 0;
  lat: string = '';
  lng: string = '';
  placeId: string = '';
  photoReference: string = '';
  photoWidth: number = 0;
  urlImage: string = '';
  currentData: any = {};
  hourlyData: Hourly[] = [];
  favorite: boolean = false;
  favoritesList: Favorite[] = [];

  loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService
  ) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.stateId = res.state;
      this.cityId = res.city;
    });

    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.lat = res.lat;
      this.lng = res.lng;
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.getWeather();
    this.getGoogleCoordinates();

    this.favoritesList = JSON.parse(localStorage.getItem('@favorites') || '[]');

    if (
      this.favoritesList.find((city) => city.cityId == this.cityId.toString())
    ) {
      this.favorite = true;
    }
  }

  getWeather() {
    this.weatherService.getWeather(this.lat, this.lng).subscribe({
      next: (weatherData) => {
        let now = new Date();
        this.currentData.time = `${now.getHours()}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}`;
        this.currentData.feels_like = this.roundNumber(
          weatherData.current.feels_like
        );
        this.currentData.uvi = this.roundNumber(weatherData.current.uvi);
        this.currentData.sunrise = this.getTimeFromTimestamp(
          weatherData.current.sunrise
        );
        this.currentData.sunset = this.getTimeFromTimestamp(
          weatherData.current.sunset
        );
        this.currentData.humidity = weatherData.current.humidity;
        this.currentData.day = this.getDateFromTimestamp(
          weatherData.current.dt
        );

        this.currentData.moonrise = this.getTimeFromTimestamp(
          weatherData.daily[0].moonset
        );
        this.currentData.moonset = this.getTimeFromTimestamp(
          weatherData.daily[0].moonrise
        );

        this.hourlyData = weatherData.hourly;

        this.currentData.daily = [];
        weatherData.daily.slice(1, 8).map((day, index) => {
          const localOffset = new Date().getTimezoneOffset() * 60000;
          const utc = day.dt * 1000 + localOffset;
          const date = new Date(utc);
          let icon = '';

          if (day.weather[0].main.toLowerCase() == 'rain') {
            icon = 'tablerCloudRain';
          } else if (day.weather[0].main.toLowerCase() == 'clouds') {
            icon = 'tablerWind';
          } else if (day.weather[0].main.toLowerCase() == 'thunderstorm') {
            icon = 'tablerCloudBolt';
          } else if (day.weather[0].main.toLowerCase() == 'drizzle') {
            icon = 'featherCloudDrizzle';
          } else if (day.weather[0].main.toLowerCase() == 'snow') {
            icon = 'tablerSnowflake';
          } else {
            icon = 'tablerSun';
          }

          this.currentData.daily.push({
            feels_like: Math.round(Number(day.feels_like.day)).toString(),
            day: date.toLocaleDateString('en-us', { weekday: 'short' }) || 'd',
            icon: icon,
          });
        });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  private getTimeFromTimestamp(timestamp: number) {
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = timestamp * 1000 + localOffset;
    const date = new Date(utc);
    return `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  private getDateFromTimestamp(timestamp: number) {
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = timestamp * 1000 + localOffset;
    const date = new Date(utc);
    return date.toLocaleDateString('pt-BR', { weekday: 'long' });
  }

  private roundNumber(number: number) {
    return Math.round(number);
  }

  getGoogleCoordinates() {
    this.weatherService
      .getGeocodeGoogle(this.cityId.toString(), this.stateId.toString())
      .subscribe({
        next: (data) => {
          this.placeId = data.results[0].place_id;
          this.getLocalDetails();
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  getLocalDetails() {
    this.weatherService.getPlaceDetails(this.placeId).subscribe({
      next: (data) => {
        this.photoReference = data.result.photos[0].photo_reference;
        this.photoWidth = data.result.photos[0].width;
        this.getPhoto();
      },
      error: (e) => {
        console.log(e);
      },
    });
    this.loading = false;
  }

  getPhoto() {
    this.urlImage = `https://local.project/photo.php?width=${this.photoWidth}&reference=${this.photoReference}`;
  }

  addToFavorites() {
    const newItem: Favorite = {
      cityId: this.cityId.toString(),
      state: this.stateId.toString(),
      coords: {
        lng: this.lng,
        lat: this.lat,
      },
      photo: this.urlImage
    };
    this.favoritesList.push(newItem);
    localStorage.setItem('@favorites', JSON.stringify(this.favoritesList));

    this.favorite = true;
  }

  removeFromFavorites() {
    this.favorite = false;
    this.favoritesList = this.favoritesList.filter(
      (city) =>
        city.cityId.toLowerCase() !== this.cityId.toString().toLowerCase()
    );
    localStorage.setItem('@favorites', JSON.stringify(this.favoritesList));
  }
}
