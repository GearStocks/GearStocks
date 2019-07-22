import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /*openCarPage() {
    this.router.navigateByUrl('/gallery');
    //console.log("MDR");
  }*/

}
