import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { ApiService } from "../api/api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.sass']
})
export class ComicListComponent implements OnInit {

  comics;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.comics.subscribe(result => {
      console.log(result)
      this.comics = result
    });
  }

  gotoDetails(id, title) {
    title = title.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate(['/comics/detail/', id, title]);
  }

  // getComicsList() {
  //   this.comics = (this.apiService.getComicsList());
  // }



}
