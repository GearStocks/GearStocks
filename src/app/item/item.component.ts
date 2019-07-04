import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  myFunc() {
    if (document.getElementById('FavoriteButton').innerHTML === 'Retirer des favoris') {
      document.getElementById('FavoriteButton').innerHTML = 'Ajouter aux favoris';
    } else {
      document.getElementById('FavoriteButton').innerHTML = 'Retirer des favoris';
    }
  }
}
