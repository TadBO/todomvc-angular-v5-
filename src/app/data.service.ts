import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/Rx'

@Injectable()
export class DataService {

  constructor(private http: Http) { }
  private requestOptions = new RequestOptions({
    headers: new Headers({
      'authorization': 'token 3bf28e8f-0d5c-4575-8988-a86aa9fc264f'
    })
  });

  getTodos() {
    return this.http.get('./me/todomvc', this.requestOptions).map(res => {
      return res.json()
    }).catch(error => {
      console.log(error);
      return Observable.of<any[]>([]);
    });
  }
  saveTodos(newItems: any[]) {
    return this.http.post('./me/todomvc',newItems, this.requestOptions).map(res => {
      return res.json();
    }).catch(error => {
      return Observable.of<any[]>([]);
    });
  }

}
