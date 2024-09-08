import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuienSoyComponentComponent } from './quien-soy-component.component';

describe('QuienSoyComponentComponent', () => {
  let component: QuienSoyComponentComponent;
  let fixture: ComponentFixture<QuienSoyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuienSoyComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuienSoyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
