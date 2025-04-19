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


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [
        FontAwesomeModule,

    ]
})
export class DashboardComponent {
  edit = faPen;
  create = faPlus;
  budget = faMoneyBill;
  project = faUsers;
  time = faClock;
  work = faBriefcase;
}
