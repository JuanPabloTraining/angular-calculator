import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.sass',
})
export class ButtonComponent {
  @Input() customTitle!: string;
  @Output() buttonValue = new EventEmitter<string>();

  addToDisplay() {
    this.buttonValue.emit(this.customTitle);
  }
}
