import { Component } from "@angular/core";
import { translations } from '../translations'
import { books } from '../books'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  translations = translations;
  books = books;
  showFiller = false;
}