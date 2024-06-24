import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { ButtonsComponent } from './buttons/buttons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  imports: [RouterOutlet, DisplayComponent, ButtonsComponent],
})
export class AppComponent {
  title = 'calculator';
  operators = ['+', '-', '*', '/'];
  functions = ['=', 'C'];
  firstOperand: string = '';
  secondOperand: string = '';
  operator: string = '';
  displayableOperation: string = '0';

  newButtonPressed($event: string) {
    //console.log($event);
    this.operate($event);
  }

  operate(insertedValue: string) {
    if (this.operators.includes(insertedValue)) {
      this.executeOperation(insertedValue);
    } else if (insertedValue === '=') {
      this.solve();
    } else if (insertedValue === 'C') {
      this.clear();
    } else {
      if (!this.operator) {
        this.firstOperand += insertedValue;
      } else {
        this.secondOperand += insertedValue;
      }

      if (this.displayableOperation === '0') {
        this.displayableOperation = insertedValue;
      } else {
        this.displayableOperation += insertedValue;
      }
    }
  }

  performOperation() {
    let result: Number = 0;
    switch (this.operator) {
      case '+':
        result = Number(this.firstOperand) + Number(this.secondOperand);
        break;
      case '-':
        result = Number(this.firstOperand) - Number(this.secondOperand);
        break;
      case '*':
        result = Number(this.firstOperand) * Number(this.secondOperand);
        break;
      case '/':
        result = Number(this.firstOperand) / Number(this.secondOperand);
        break;
    }
    return result;
  }

  solve() {
    const result = this.performOperation();
    this.clear();
    this.firstOperand = result.toString();
    this.displayableOperation = this.firstOperand;
  }

  executeOperation(insertedValue: string) {
    if (this.operator) {
      if (this.secondOperand === '') {
        this.operator = insertedValue;
        this.displayableOperation =
          this.displayableOperation.slice(0, -1) + this.operator;
      } else {
        this.firstOperand = this.performOperation().toString();
        this.secondOperand = '';
        this.operator = insertedValue;
        this.displayableOperation = this.firstOperand + this.operator;
      }
    } else {
      this.operator = insertedValue;
      this.displayableOperation += this.operator;
    }
  }

  clear() {
    this.operator = '';
    this.firstOperand = '';
    this.secondOperand = '';
    this.displayableOperation = '';
  }
}
