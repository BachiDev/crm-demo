
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-card.component.html',
  styleUrls: ['./nav-card.component.scss']
})
export class NavCardComponent {
  @Input() link!: string;
  @Input() icon!: string;
  @Input() title!: string;
}
