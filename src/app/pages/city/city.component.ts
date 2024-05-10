import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/api/weather.service';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent{
  stateId: number = 0;
  cityId: number = 0;
  lat: string = "";
  lng: string = "";

  constructor(private activatedRoute: ActivatedRoute, private weatherService: WeatherService) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.stateId = res.state
      this.cityId = res.city

      console.log(this.stateId, this.cityId)
    })

    this.activatedRoute.queryParams.subscribe((res: any) => {
      console.log(res)
      this.lat = res.lat;
      this.lng = res.lng
    })
  }

  ngOnInit(): void {
    this.getWeather()
  }

  getWeather() {
    const localOffset = new Date().getTimezoneOffset() * 60000;
    console.log(new Date(1715364000 * 1000 + localOffset))
    console.log(new Date(1715450400* 1000 + localOffset))
    console.log(new Date(1715536800* 1000 + localOffset))
    console.log(new Date(1715623200* 1000 + localOffset))
    this.weatherService.getWeather(this.lat, this.lng).subscribe({
      next: (weatherData) => {
        console.log(weatherData)
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = weatherData.current.dt * 1000 + localOffset;
        console.log(new Date(utc))
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
}



/*
glassmorphism

background: rgba( 62, 83, 138, 0.45 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4px );
-webkit-backdrop-filter: blur( 4px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );

*/