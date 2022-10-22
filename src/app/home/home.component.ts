import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../bookmark.domain';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bookmarks: Bookmark[] = [];
  categories: any[] = [];
  selectedBookmark?: Bookmark;

  constructor(
    private bookmarkService: BookmarkService
  ) { }

  ngOnInit(): void {
    this.getBookMarks();
    this.bookmarkService.onBookMarkAdd$.subscribe(value => {
      if(value) {
        this.getBookMarks();
      }
    });

    this.bookmarkService.onBookMarkModalCancel$.subscribe(value => {
      this.showBookMarkModal(!value); // reverse the value
    });

    this.bookmarkService.onBookMarkSelected$.subscribe(value => {
      this.selectedBookmark = value;
    });
  }

  getBookMarks() {
    this.bookmarks = this.bookmarkService.getBookmarks();
    this.processBookmarks(this.bookmarks);
  }

  bookmarkModalVisible?: boolean
  showBookMarkModal(value: boolean) {
    this.bookmarkModalVisible = value;
  }

  sortedBookmarks: any = {}
  processBookmarks(bookmarks: Bookmark[]) {
    if(!bookmarks || !bookmarks.length) { return; }
    if(!this.sortedBookmarks) {
      this.sortedBookmarks = {};
    }
    bookmarks.forEach(bookmark => {
      if(bookmark.category) {
        if(!this.sortedBookmarks[bookmark.category]) {
          this.sortedBookmarks[bookmark.category] = [];
        }
        this.sortedBookmarks[bookmark.category].push(bookmark);
      }
    });
    this.categories = [...Object.keys(this.sortedBookmarks)];
  }
}
