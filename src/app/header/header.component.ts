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
  chapters
  showBooks = false
  showChapters = false
  text
  bookSelected
  chapterSelected

  ngOnInit() {
    // Get available translations from Mongo for translation dropdown 
    this.bibleService.getAvailableTranslations()
    .subscribe((translationResult) => {
      this.translations = translationResult
    })
  }

  getBooks() {
    this.bibleService.getAvailableBooks()
    .subscribe((bookResult) => {
      this.books = bookResult
    })
    this.showBooks = true
    if (this.chapterSelected) {
      this.getText(this.chapterSelected)
    }
  }

  getChapters(bookSelected) {
    this.bookSelected = bookSelected
    for (let i in this.books) {
      if (this.books[i].name == bookSelected) {
        console.log(this.books[i])
        this.chapters = this.books[i].chapters
        this.showChapters = true
      }
    }
    if (this.chapterSelected) {
      this.getText(this.chapterSelected)
    }
  }

  getText(chapterSelected) {
    this.chapterSelected = chapterSelected
    for (let i in this.chapters) {
      if (this.chapters[i].number == chapterSelected) {
        console.log(this.chapters[i].text)
        this.text = this.chapters[i].text
      }
    }
  }
  showFiller = false;
}