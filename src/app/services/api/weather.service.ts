import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiResonse, WeatherResponse } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiUrl: string = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
  mapboxAPIKey: string = "pk.eyJ1IjoiZGllZ29qYWNvYmVyIiwiYSI6ImNscmo5bTQyYTAxNHUycWxiNm9sZnF3N20ifQ.8NPV3KHcRMnFS0q0GfJBfQ"
  googleAPIKey: string = "AIzaSyAd5feE5cQDXQ6cIT159mEMx2xlFB3kmGk"

  constructor(private httpClient: HttpClient) { }

  searchLocal(city: string) {
    return this.httpClient.get<ApiResonse>(this.apiUrl + city + ".json?access_token=" +this.mapboxAPIKey + "&types=place")
  }

  getWeather(lat: string, lng: string) {
    return this.httpClient.get<WeatherResponse>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&units=metric&appid=c4db5671ae40600b0c9d51bc8cf9977a`).pipe(
      tap((value) => {
      })
    )
  }

  getGeocodeGoogle(city: string, state: string) {
    return this.httpClient.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state}&amp&key=${this.googleAPIKey}`).pipe(
      tap((value) => {
      })
    )
  }

  getPlaceDetails(placeId: string) {
    return this.httpClient.get<any>(`https://local.project/?place_id=${placeId}`, { }).pipe(
      tap((value) => {
      })
    )
  }

}
