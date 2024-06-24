import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buttons',
  standalone: true,
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.sass',
  imports: [CommonModule, ButtonComponent],
})
export class ButtonsComponent {
  @Output() pressedButton = new EventEmitter<string>();
  currentButton!: string;

  buttons: string[] = [
    '0',
    '.',
    '+',
    '=',
    '1',
    '2',
    '3',
    '-',
    '4',
    '5',
    '6',
    '*',
    '7',
    '8',
    '9',
    '/',
    'C',
  ];

  newButtonPressed($event: string) {
    this.pressedButton.emit($event);
  }
}
