import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floating-action-button',
  imports: [],
  templateUrl: './floating-action-button.component.html',
  styleUrl: './floating-action-button.component.css'
})
export class FloatingActionButtonComponent {
  @Input() href!: string;
}
