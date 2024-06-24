import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the current title of the button when clicked', () => {
    const testTitle = 'Test Button';
    component.customTitle = testTitle;
    fixture.detectChanges();

    spyOn(component.buttonValue, 'emit');

    const buttonElement = fixture.debugElement.query(By.css('.button'));
    buttonElement.triggerEventHandler('click', null);

    expect(component.buttonValue.emit).toHaveBeenCalledWith(testTitle);
  });
});
