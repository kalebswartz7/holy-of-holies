import { Component, OnInit } from "@angular/core";
import { BibleService } from '../services/bible.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public bibleService: BibleService) {}
  translations
  books
  showBooks = false

  ngOnInit() {
    // Get available translations from Mongo for translation dropdown 
    this.bibleService.getAvailableTranslations()
    .subscribe((translationResult) => {
      this.translations = translationResult
    })
  }

  getBooks() {
    this.showBooks = true
    this.bibleService.getAvailableBooks()
    .subscribe((bookResult) => {
      this.books = bookResult
    })
  }
  showFiller = false;
}