import { Component } from '@angular/core';
import {
  faPen,
  faPlus,
  faMoneyBill,
  faUsers,
  faClock,
  faBriefcase,
  faIcons
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.css'],
  imports: [
    FontAwesomeModule,
    CardComponent
],
})
export class DashboardComponent {
  edit = faPen;
  create = faPlus;
  budget = faMoneyBill;
  project = faUsers;
  time = faClock;
  work = faBriefcase;
}
