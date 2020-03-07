import { Component, OnInit } from "@angular/core";
import { books } from '../books'
import { BibleService } from '../services/bible.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public bibleService: BibleService) {}
  translations
  ngOnInit() {
    // Get available translations from Mongo for translation dropdown 
    this.bibleService.getAvailableTranslations()
    .subscribe((translationResult) => {
      this.translations = translationResult
    })
  }
  books = books;
  showFiller = false;
}