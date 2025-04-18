// ts file
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faMoneyBill,
  faUsers,
  faClock,
  faBriefcase,
  faHome,
  faChartBar,
  faComment,
  faBookmark,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  template: `
    <div class="card">
      <div class="card-header">
        {{title}}
      </div>
      <div class="card-body">
        <div class="card-value">
          {{value}}
        </div>
        <div class="card-change">
          {{change}} Since Last Month
        </div>
      </div>
      <div class="card-icon">
        <fa-icon [icon]="icon"></fa-icon>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() change: string = '';
  @Input() iconName: string = '';

  // Map the icon names to FontAwesome icons
  iconMappings: { [key: string]: IconDefinition } = {
    budget: faMoneyBill,
    project: faUsers,
    clock: faClock,
    briefcase: faBriefcase,
  };

  get icon(): IconDefinition {
    return this.iconMappings[this.iconName] || faMoneyBill; // Default to a specific icon if the name is not recognized
  }
}
