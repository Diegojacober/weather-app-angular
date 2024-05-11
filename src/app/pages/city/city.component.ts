import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/api/weather.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionSunnyOutline, ionWaterOutline } from '@ng-icons/ionicons';
import {
  tablerHazeMoon,
  tablerSunMoon,
  tablerSunrise,
  tablerSunset,
} from '@ng-icons/tabler-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  viewProviders: [
    provideIcons({
      ionWaterOutline,
      ionSunnyOutline,
      tablerSunrise,
      tablerSunset,
      tablerSunMoon,
      tablerHazeMoon,
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService
  ) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.stateId = res.state;
      this.cityId = res.city;

      // console.log(this.stateId, this.cityId);
    });

    this.activatedRoute.queryParams.subscribe((res: any) => {
      console.log(res);
      this.lat = res.lat;
      this.lng = res.lng;
    });
  }

  ngOnInit(): void {
    this.getWeather();
    this.getGoogleCoordinates();
  }

  getWeather() {
    this.weatherService.getWeather(this.lat, this.lng).subscribe({
      next: (weatherData) => {
        this.currentData.time = this.getTimeFromTimestamp(weatherData.current.dt);
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
        this.currentData.day = this.getDateFromTimestamp(weatherData.current.dt);
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
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  // Função para obter a data formatada a partir de um timestamp
  private getDateFromTimestamp(timestamp: number) {
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = timestamp * 1000 + localOffset;
    const date = new Date(utc);
    return date.toLocaleDateString('pt-BR', { weekday: 'long' });
  }

  // Função para arredondar um número
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
        this.photoReference = data.result.photos[1].photo_reference;
        this.photoWidth = data.result.photos[1].width;
        this.getPhoto();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getPhoto() {
    this.urlImage = `https://local.project/photo.php?width=${this.photoWidth}&reference=${this.photoReference}`;
  }
}
