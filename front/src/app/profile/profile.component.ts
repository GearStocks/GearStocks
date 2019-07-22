/* Angular Modules */
import {Component, ElementRef, OnInit} from '@angular/core';

/* Services */
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  list = [
    {
      name:  'Informations personnelles',
      target: '#general',
      active: true
    },
    {
      name:  'E-mail',
      target: '#email',
      active: false
    },
    {
      name: 'Mot de passe',
      target: '#password',
      active: false
    }
  ];

  constructor(private myElement: ElementRef) { }

  ngOnInit() { }

  activeClass(element): void {
    this.list.map((el) => {
      el.active = false;
      return el;
    });
    const el = this.myElement.nativeElement.querySelector(element.target);
    el.scrollIntoView({behavior: 'smooth'});
    element.active = !element.active;
  }
}
