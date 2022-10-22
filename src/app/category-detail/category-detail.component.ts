import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../bookmark.domain';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  @Input() selectedBookmark?: Bookmark

  constructor() { }

  ngOnInit(): void {
  }
}
