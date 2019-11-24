import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private comicsSource = new BehaviorSubject([]);
  comics = this.comicsSource.asObservable()

  constructor(private http: HttpClient) {
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((data: Array<any>)=>{
        data.forEach((item)=>{
          item.hobbies = [{id: 1, value: 'Tennis'}, {id: 2, value: 'Dancing'}]
        })
        this.comicsSource.next(data);
      })
  }


  getComicsList() {
    return this.comics
  }

  deleteHobbyFromUser(userId, hobbyId){
    let currentValue = this.comicsSource.value;
    currentValue.forEach((item)=>{
      if(item.id == userId){
        item.hobbies = item.hobbies.filter(item => item.id !== hobbyId)
      }
    })
    this.comicsSource.next(currentValue);
  }

  addHobbyToUser(userId, hobbyName){
    let currentValue = this.comicsSource.value;
    currentValue.forEach((item)=>{
      if(item.id == userId){
        item.hobbies.push({id: item.hobbies.length+1, value: hobbyName})
      }
    })
    this.comicsSource.next(currentValue);
  }

  addCharacter(data) {
    const currentValue = this.comicsSource.value;
    const updatedValue = [...currentValue, data];
    this.comicsSource.next(updatedValue);
  }
}
