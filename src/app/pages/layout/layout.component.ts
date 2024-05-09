import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BaseModalComponent } from '../../components/base-modal/base-modal.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BaseModalComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  @Input() addIcon: boolean = false;
  
  modalActive: boolean = false;

  toggleModal() {
    this.modalActive = !this.modalActive;
  }
}
