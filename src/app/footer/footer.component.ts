import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input()
  todos: any[];

  @Output()
  clearCompleted = new EventEmitter();

  @Output()
  filterTypeChanged = new EventEmitter();

  filterType = 'All';
  constructor() { }

  ngOnInit() {
  }
  clearButtonClick() {
    this.clearCompleted.emit();
  }

  changeFilterType(filterType: string) {
    this.filterType = filterType;
    this.filterTypeChanged.emit(filterType);
  }

}
