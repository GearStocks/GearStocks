/* Angular Modules */
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    onActivate(event) {
        document.querySelector('mat-sidenav-content').scrollTop = 0;
    }
}
