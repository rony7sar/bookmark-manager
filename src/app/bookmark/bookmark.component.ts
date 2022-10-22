import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/api';
import { Bookmark } from '../bookmark.domain';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit, OnChanges {
  @Input("bookmarkModalVisible") bookmarkModalVisible?: boolean;
  @Input("categories") categories!: string[]
  bookmarkForm!: FormGroup;
  @ViewChild('bookmarkModal') bookmarkModal: any;

  categorySelectItems: SelectItem[] = [{label: "Select Category", value: null}]
  customCategoryVisible: boolean = false;  

  constructor(
    private fb: FormBuilder,
    private bookmarkService: BookmarkService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['bookmarkModalVisible'] && changes["bookmarkModalVisible"].currentValue) {
      this.open(this.bookmarkModal);
    }
    if(changes['categories'] && changes["categories"].currentValue) {
      this.prepareCategorySelectItems(this.categories);
    }
  }

  ngOnInit(): void {
    this.prepareBookmarkForm();
    this.prepareCategorySelectItems(this.categories);
  }

  prepareCategorySelectItems(categories: string[]) {
    this.categorySelectItems = [{label: "Select Category", value: null}];

    if(!categories || !categories.length) { return; }
    
    categories.forEach(cat => {
      this.categorySelectItems.push({ label: cat, value: cat});
    })
  }

  prepareBookmarkForm(formData?: Bookmark) {
    formData = formData || new Bookmark();

    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.bookmarkForm = this.fb.group({
      title: [formData.title, [Validators.required, Validators.max(30)]],
      url: [formData.url, [Validators.required, Validators.pattern(urlRegex)]],
      category: [formData.title, Validators.required]
    })
  }

  onBookmarkAdd() {
    if(this.bookmarkForm.invalid) {
      this.bookmarkForm.markAllAsTouched();
      this.bookmarkForm.markAsDirty();
      return;
    }
    const bookmark: Bookmark = this.bookmarkForm?.value;
    this.bookmarkService.addBookMark(bookmark);
    this.bookmarkModalVisible = false;
    this.customCategoryVisible = false;
    this.prepareBookmarkForm();
  }

  onCancel() {
    this.bookmarkModalVisible = false;
    this.customCategoryVisible = false;
    this.bookmarkService.notifyBookmarkModalCanceled(true);
  }

  open(bookmarkModal: any) {
    if(!bookmarkModal) { return; }
    this.modalService.open(bookmarkModal);
  }

  showCustomCategory() {
    this.customCategoryVisible = true;
  }
}