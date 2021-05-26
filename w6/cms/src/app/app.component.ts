import { Component } from '@angular/core';
import { ContactService } from './contacts/contact.service';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContactService],
})
export class AppComponent {
  title = 'cms';
  loadedMenu = 'contact';

  // switchView(menuSelected: string) {
  //   this.loadedMenu = menuSelected;
  // }
}
