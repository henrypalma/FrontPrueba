import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import {
  faHome,
  faChartBar,
  faComment,
  faBookmark,
  faUser,
  faIcons,
  faAddressBook
} from '@fortawesome/free-solid-svg-icons';



@Component({
    selector: 'app-sidebar',
    imports: [
        FontAwesomeModule,
        RouterLink

    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  home = faHome;
  chart = faChartBar;
  message = faComment;
  bookmark = faBookmark;
  user = faUser;
  cliente = faAddressBook;


}
