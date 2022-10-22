import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bookmark } from './bookmark.domain';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  // bookmarks: Bookmark[] = [];
  storageKey: string = "bookmark";
  bookmarkAddSubject = new Subject<boolean>();
  onBookMarkAdd$ = this.bookmarkAddSubject.asObservable();

  bookmarkModalCancelSubject = new Subject<boolean>();
  onBookMarkModalCancel$ = this.bookmarkModalCancelSubject.asObservable();

  bookmarkSelectedSubject = new Subject<Bookmark>();
  onBookMarkSelected$ = this.bookmarkSelectedSubject.asObservable();

  constructor() { }

  addBookMark(bookmark: Bookmark) {
    if(!bookmark) { return;}
    const bookmarks = this.getBookmarks() || [];
    bookmarks.push(bookmark);
    localStorage.setItem(this.storageKey, JSON.stringify(bookmarks));
    this.notifyBookmarkAdded(true);
  }

  getBookmarks(): Bookmark[] {
    const bookmarksAsString = localStorage.getItem(this.storageKey);
    let bookmarks: Bookmark[] = [];
    if(bookmarksAsString) {
      bookmarks = JSON.parse(bookmarksAsString);
    }
    return bookmarks;
  }

  notifyBookmarkAdded(value: boolean) {
    this.bookmarkAddSubject.next(value);
  }

  notifyBookmarkModalCanceled(value: boolean) {
    this.bookmarkModalCancelSubject.next(value);
  }

  notifyBookmarkSelected(bookmark: Bookmark) {
    this.bookmarkSelectedSubject.next(bookmark);
  }
}
