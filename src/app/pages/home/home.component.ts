import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/api/weather.service';
import { ApiResonse } from '../../../types';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  city: string = '';
  resultsList: ApiResonse | undefined;
  errors: boolean = false;
  loading: boolean = false;

  constructor(private router: Router, private weatherService: WeatherService) {
    
  }

  changeCity() {
    this.loading = true;
    this.weatherService.searchLocal(this.city).subscribe({
      next: (resp) => {
        this.resultsList = resp
        this.loading = false;
      },
      error: (err) => {
        console.log(err)
        this.errors = true
        this.loading = false;
      }
    })
  }

  navigate(result: any) {
    const [city, state] = result.place_name.split(",");
    this.router.navigate(["/weather", state.replace(" ", ""), city], {
      queryParams: {
        lat: result.geometry.coordinates[1],
        lng: result.geometry.coordinates[0],
        preview: true
      }
    })
  }
}
