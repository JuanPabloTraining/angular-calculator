import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsComponent } from './buttons.component';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button/button.component';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the value of the button when a button is clicked', () => {
    // Arrange
    spyOn(component.pressedButton, 'emit');

    // Act
    const buttonElements = fixture.debugElement.queryAll(
      By.directive(ButtonComponent)
    );
    const firstButton = buttonElements[0];
    const buttonInstance = firstButton.componentInstance as ButtonComponent;

    buttonInstance.customTitle = '0'; // Ensure the title is set correctly
    fixture.detectChanges();

    firstButton.triggerEventHandler('buttonValue', '0');

    // Assert
    expect(component.pressedButton.emit).toHaveBeenCalledWith('0');
  });
});
