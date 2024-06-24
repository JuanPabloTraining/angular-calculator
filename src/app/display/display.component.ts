import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [],
  templateUrl: './display.component.html',
  styleUrl: './display.component.sass',
})
export class DisplayComponent {
  @Input() displayCharacters: string = '0';
}
