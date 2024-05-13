import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/api/weather.service';
import { ApiResonse, Favorite, WeatherResponse } from '../../../types';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerHeartFilled } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingComponent, NgIconComponent],
  viewProviders: [
    provideIcons({
      tablerHeartFilled,
    }),
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  city: string = '';
  resultsList: ApiResonse | undefined;
  errors: boolean = false;
  loading: boolean = false;
  favoriteCities: any[] = [];
  loadingCities: boolean = false;

  constructor(private router: Router, private weatherService: WeatherService) {}

  ngOnInit(): void {
    const list: Favorite[] = JSON.parse(
      localStorage.getItem('@favorites') || '[]'
    );

    this.getWeatherCities(list);
  }

  getWeatherCities(list: Favorite[]) {
    this.loadingCities = true;
    list.forEach((city) => {
      this.getWeather(city.coords.lat, city.coords.lng, city);
    });
    this.loadingCities = false;
  }

  getWeather(lat: string, lng: string, city: any) {
    this.weatherService.getWeather(lat, lng).subscribe({
      next: (weatherData) => {
        city.feels_like = Math.round(weatherData.current.feels_like);
        this.favoriteCities.push(city);
      },
      error: (e) => {},
    });

  }

  removeFromFavorites(cityId: string) {
    this.favoriteCities = this.favoriteCities.filter(
      (city) => city.cityId.toLowerCase() !== cityId.toString().toLowerCase()
    );
    localStorage.setItem('@favorites', JSON.stringify(this.favoriteCities));
  }

  changeCity() {
    this.loading = true;
    this.weatherService.searchLocal(this.city).subscribe({
      next: (resp) => {
        this.resultsList = resp;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.errors = true;
        this.loading = false;
      },
    });
  }

  navigateToCity(city: any) {
    this.router.navigate(['/weather', city.state, city.cityId], {
      queryParams: {
        lat: city.coords.lat,
        lng: city.coords.lng,
        preview: true,
      },
    });
  }

  navigate(result: any) {
    const [city, state] = result.place_name.split(',');
    this.router.navigate(['/weather', state.replace(' ', ''), city], {
      queryParams: {
        lat: result.geometry.coordinates[1],
        lng: result.geometry.coordinates[0],
        preview: true,
      },
    });
  }
}
