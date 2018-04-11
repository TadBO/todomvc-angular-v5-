import { Component, OnInit } from '@angular/core';
import { DataService } from "./data.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  inputHint = 'What needs to be done?';
  todos: any[] = [];
  todo = '';
  filterType = 'All';
  toggleAll = false;
  constructor( private dataSer: DataService) {

  }


  ngOnInit() {
    this.dataSer.getTodos().subscribe(data => {
      console.log(data);
      this.todos = data;
    });
  }

  addTodo () {
    if( !this.todo) {
      return false;
    }
    let newItems = [...this.todos];
    newItems.push({
      todo: this.todo,
      done: false
    });
    this.todo = '';
    this.dataSer.saveTodos(newItems).subscribe(data => {
      this.todos = data;
    });
  }
  clearCompleted() {
    let newItems = this.todos.filter(items => { return !items.done});
    this.dataSer.saveTodos(newItems).subscribe(data => {
      this.todos = data;
    });
  }
  filterTypeChanged(filterType: string) {
    this.filterType = filterType;
  }
  toggleAllChanged(value: boolean) {
    let newItems = [...this.todos];
    this.todos = newItems;
    newItems.forEach(item => {
      item.done = value;
    });
    this.dataSer.saveTodos(newItems).subscribe(data => {
      this.todos = data;
    });
  }
  updateToggleAllState() {
    this.toggleAll = this.todos.filter(item => {
      return !item.done;
    }).length === 0;
    this.dataSer.saveTodos(this.todos).subscribe(data => {
      this.todos = data;
    });
  }
  destoryItem(item) {
    let newItems = [...this.todos];
    newItems.splice(this.todos.indexOf(item), 1);
    this.dataSer.saveTodos(newItems).subscribe(data => {
      this.todos = data;
    });
  }
}
