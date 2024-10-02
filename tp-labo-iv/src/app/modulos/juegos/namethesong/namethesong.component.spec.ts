import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamethesongComponent } from './namethesong.component';

describe('NamethesongComponent', () => {
  let component: NamethesongComponent;
  let fixture: ComponentFixture<NamethesongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NamethesongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamethesongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
