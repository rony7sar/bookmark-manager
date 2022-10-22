import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../bookmark.domain';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input("bookmarks") bookmarks?: Bookmark[]

  constructor(
    private bookmarkService: BookmarkService
  ) { }

  ngOnInit(): void {
  }
  
  onBookmarkSelected(bookmark: Bookmark) {
    this.bookmarkService.notifyBookmarkSelected(bookmark);
  }
}
