import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-todos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './listado-todos.component.html',
  styleUrls: ['./listado-todos.component.scss'],
})
export class ListadoTodosComponent implements OnInit {
  @Input() userId!: number;

  todos: Todo[] = [];
  filteredTodos$: Observable<Todo[]> = new Observable<Todo[]>();

  searchForm: FormGroup;
  addForm: FormGroup;

  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({ search: [''] });
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
    });
  }

  ngOnInit(): void {
    if (!this.userId) return;

    this.loadTodos();

    // Buscador reactivo
    this.filteredTodos$ = this.searchForm.get('search')!.valueChanges.pipe(
      startWith(''),
      map((text) => this.filterTodos(text))
    );
  }

  loadTodos() {
    this.todoService.getTodosByUser(this.userId).subscribe((todos) => {
      this.todos = todos;
      this.filteredTodos$ = this.searchForm.get('search')!.valueChanges.pipe(
        startWith(''),
        map((text) => this.filterTodos(text))
      );
    });
  }

  filterTodos(text: string): Todo[] {
    text = text.toLowerCase();
    return this.todos.filter((t) => t.title.toLowerCase().includes(text));
  }

  addTodo() {
    if (this.addForm.invalid) return;

    const newTodo: Todo = {
      userId: this.userId,
      id: Math.max(...this.todos.map((t) => t.id), 0) + 1, // generar id local
      title: this.addForm.value.title,
      completed: false,
    };
    this.todos.unshift(newTodo);
    this.addForm.reset();
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter((t) => t.id !== todo.id);
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  get searchControl() {
    return this.searchForm.get('search')!;
  }
}
