import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ButtonComponent } from './buttons/button/button.component';
import { DisplayComponent } from './display/display.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, DisplayComponent, ButtonComponent],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = new AppComponent();
    fixture.detectChanges();

    component.operator = '';
    component.firstOperand = '';
    component.secondOperand = '';
    component.displayableOperation = '0';
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display 0 initially', () => {
    const displayElement = fixture.debugElement.query(
      By.css('app-display')
    ).nativeElement;
    expect(displayElement.textContent.trim()).toBe('0');
  });

  it('should add number inputs', () => {
    component.operate('1');
    component.operate('2');
    component.operate('3');

    expect(component.displayableOperation).toBe('123');
    expect(component.firstOperand).toBe('123');
    expect(component.operator).toBe('');
  });

  it('should add operator inputs', () => {
    component.operate('1');
    component.operate('2');
    component.operate('3');
    component.operate('*');

    expect(component.displayableOperation).toBe('123*');
    expect(component.firstOperand).toBe('123');
    expect(component.operator).toBe('*');
  });

  it('should add number inputs to secondOperand when operator was given', () => {
    component.operate('1');
    component.operate('2');
    component.operate('3');
    component.operate('*');
    component.operate('4');
    component.operate('5');
    component.operate('6');

    expect(component.displayableOperation).toBe('123*456');
    expect(component.firstOperand).toBe('123');
    expect(component.secondOperand).toBe('456');
    expect(component.operator).toBe('*');
  });

  it('should perform an operation when data was given and = button was pressed', () => {
    component.operate('1');
    component.operate('2');
    component.operate('3');
    component.operate('*');
    component.operate('4');
    component.operate('5');
    component.operate('6');
    component.operate('=');

    expect(component.displayableOperation).toBe('56088');
    expect(component.firstOperand).toBe('56088');
    expect(component.secondOperand).toBe('');
    expect(component.operator).toBe('');
  }); // asd2

  it('should perform an operation when data was given and another operation button was pressed', () => {
    component.operate('1');
    component.operate('2');
    component.operate('3');
    component.operate('*');
    component.operate('4');
    component.operate('5');
    component.operate('6');
    component.operate('*');

    expect(component.displayableOperation).toBe('56088*');
    expect(component.firstOperand).toBe('56088');
    expect(component.secondOperand).toBe('');
    expect(component.operator).toBe('*');
  });

  it('should perform a multiplication operation when data was given and = button button was pressed', () => {
    component.operate('1');
    component.operate('2');
    component.operate('3');
    component.operate('*');
    component.operate('4');
    component.operate('5');
    component.operate('6');
    component.operate('=');

    expect(component.displayableOperation).toBe('56088');
    expect(component.firstOperand).toBe('56088');
    expect(component.secondOperand).toBe('');
    expect(component.operator).toBe('');
  });

  it('should perform a division operation when data was given and = button button was pressed', () => {
    component.operate('4');
    component.operate('9');
    component.operate('/');
    component.operate('4');
    component.operate('=');

    expect(component.displayableOperation).toBe('12.25');
    expect(component.firstOperand).toBe('12.25');
    expect(component.secondOperand).toBe('');
    expect(component.operator).toBe('');
  });

  it('should perform an addition operation when data was given and = button button was pressed', () => {
    component.operate('1');
    component.operate('2');
    component.operate('3');
    component.operate('+');
    component.operate('4');
    component.operate('5');
    component.operate('6');
    component.operate('=');

    expect(component.displayableOperation).toBe('579');
    expect(component.firstOperand).toBe('579');
    expect(component.secondOperand).toBe('');
    expect(component.operator).toBe('');
  });

  it('should perform a subtraction operation when data was given and = button button was pressed', () => {
    component.operate('1');
    component.operate('2');
    component.operate('3');
    component.operate('-');
    component.operate('4');
    component.operate('5');
    component.operate('6');
    component.operate('=');

    expect(component.displayableOperation).toBe('-333');
    expect(component.firstOperand).toBe('-333');
    expect(component.secondOperand).toBe('');
    expect(component.operator).toBe('');
  });

  it('should clean the display when C button button was pressed', () => {
    component.operate('1');
    component.operate('2');
    component.operate('3');
    component.operate('-');
    component.operate('4');
    component.operate('5');
    component.operate('6');
    component.operate('C');

    expect(component.displayableOperation).toBe('');
    expect(component.firstOperand).toBe('');
    expect(component.secondOperand).toBe('');
    expect(component.operator).toBe('');
  });

  it('should replace the current operator when another is inserted next to it', () => {
    component.operate('1');
    component.operate('2');
    component.operate('3');
    component.operate('-');
    component.operate('-');

    expect(component.displayableOperation).toBe('123-');
    expect(component.firstOperand).toBe('123');
    expect(component.secondOperand).toBe('');
    expect(component.operator).toBe('-');
  });

  it('should replace the initial 0 of display when a number is inserted', () => {
    console.log(component.displayableOperation);
    component.operate('1');
    console.log(component.displayableOperation);

    expect(component.displayableOperation).toBe('1');
    expect(component.firstOperand).toBe('1');
    expect(component.secondOperand).toBe('');
    expect(component.operator).toBe('');
  });

  it('should call operate method with correct value when newButtonPressed is called', () => {
    // Arrange
    spyOn(component, 'operate');

    // Act
    const testValue = '5';
    component.newButtonPressed(testValue);

    // Assert
    expect(component.operate).toHaveBeenCalledWith(testValue);
  });

  /*fit('should handle operations', () => {
    const buttonElements = fixture.debugElement.queryAll(By.css('app-button'));

    const button1 = buttonElements.find(
      (el) => el.nativeElement.textContent.trim() === '1'
    );
    const buttonPlus = buttonElements.find(
      (el) => el.nativeElement.textContent.trim() === '+'
    );
    const button2 = buttonElements.find(
      (el) => el.nativeElement.textContent.trim() === '2'
    );
    const buttonEquals = buttonElements.find(
      (el) => el.nativeElement.textContent.trim() === '='
    );

    if (button1 && buttonPlus && button2 && buttonEquals) {
      button1.nativeElement.click();
      buttonPlus.nativeElement.click();
      button2.nativeElement.click();
      buttonEquals.nativeElement.click();
    } else {
      console.error('Button elements not found');
    }

    fixture.detectChanges();

    const displayElement = fixture.debugElement.query(
      By.css('app-display')
    ).nativeElement;
    if (!displayElement) {
      console.error('Display not found.');
    }

    console.log(displayElement);

    expect(displayElement.textContent.trim()).toBe('3');
  });

  it('should clear the display', () => {
    const buttonElements = fixture.debugElement.queryAll(By.css('button'));
    const buttonClear = buttonElements.find(
      (el) => el.nativeElement.textContent.trim() === 'C'
    );

    if (buttonClear) {
      buttonClear.nativeElement.click();
    } else {
      console.error('Clear button not found');
    }

    fixture.detectChanges();

    const displayElement = fixture.debugElement.query(
      By.css('app-display')
    ).nativeElement;
    expect(displayElement.textContent.trim()).toBe('0');
  });

  it('should handle decimal inputs', () => {
    const buttonElements = fixture.debugElement.queryAll(By.css('button'));
    const button1 = buttonElements.find(
      (el) => el.nativeElement.textContent.trim() === '1'
    );
    const buttonDot = buttonElements.find(
      (el) => el.nativeElement.textContent.trim() === '.'
    );
    const button5 = buttonElements.find(
      (el) => el.nativeElement.textContent.trim() === '5'
    );
    const buttonPlus = buttonElements.find(
      (el) => el.nativeElement.textContent.trim() === '+'
    );
    const button2 = buttonElements.find(
      (el) => el.nativeElement.textContent.trim() === '2'
    );
    const buttonEquals = buttonElements.find(
      (el) => el.nativeElement.textContent.trim() === '='
    );

    if (
      button1 &&
      buttonDot &&
      button5 &&
      buttonPlus &&
      button2 &&
      buttonEquals
    ) {
      button1.nativeElement.click();
      buttonDot.nativeElement.click();
      button5.nativeElement.click();
      buttonPlus.nativeElement.click();
      button2.nativeElement.click();
      buttonEquals.nativeElement.click();
    } else {
      console.error('Button elements not found');
    }

    fixture.detectChanges();

    const displayElement = fixture.debugElement.query(
      By.css('app-display')
    ).nativeElement;
    expect(displayElement.textContent.trim()).toBe('3.5');
  });*/
});
