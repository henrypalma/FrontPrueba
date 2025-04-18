import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToastModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PruebaBcoGye';
}
