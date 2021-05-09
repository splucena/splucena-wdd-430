import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';
  loadedMenu = 'contact';

  switchView(menuSelected: string) {
    this.loadedMenu = menuSelected;
  }
}
