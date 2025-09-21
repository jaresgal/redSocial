import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTodosComponent } from './listado-todos.component';

describe('ListadoTodosComponent', () => {
  let component: ListadoTodosComponent;
  let fixture: ComponentFixture<ListadoTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
