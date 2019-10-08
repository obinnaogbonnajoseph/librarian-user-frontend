import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LibrarianService } from '../librarian.service';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Component({
  selector: 'app-add-update-book',
  templateUrl: './add-update-book.component.html',
  styleUrls: ['./add-update-book.component.css']
})
export class AddUpdateBookComponent implements OnInit {

  title: string;
  form: FormGroup;
  book: any;
  working: boolean;

  constructor(
    private fb: FormBuilder,
    private librarianService: LibrarianService,
    private toastrService: ToastrService,
    public modalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      libNumber: ['', Validators.required]
    });

    if (this.isUpdateAction()) {
      this.prefillForm();
    }
  }

  prefillForm() {
    this.form.patchValue({
      name: this.book.name || '',
      author: this.book.author || '',
      libNumber: this.book.libNumber || ''
    });
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    if (this.working) {
      return;
    }
    this.working = true;
    const data = this.form.value;
    this.addStatusAndDateCreated(data);
    if (this.isCreateAction()) {
      this.addBook(data);
    }
    if (this.isUpdateAction()) {
      this.updateBook(data);
    }
  }

  isCreateAction(): boolean {
    return isNullOrUndefined(this.book);
  }

  isUpdateAction(): boolean {
    return !isNullOrUndefined(this.book);
  }

  addStatusAndDateCreated(data: any) {
    if (this.isCreateAction()) {
      data.status = 'NOT_BORROWED';
      data.dateCreated = moment().toDate().toString();
    } else if (this.isUpdateAction()) {
      data.status = this.book.status;
      data.dateCreated = this.book.dateCreated;
    }
  }

  addBook(data: any) {
    this.librarianService.addBook(data).subscribe((payload: any) => {
      this.toastrService.success(`${payload.name} has been added successfully`, 'Success!');
      this.modalRef.hide();
      this.working = false;
    }, (err: any) => {
      this.working = false;
      this.toastrService.error('Book not added!!', 'Error');
      this.modalRef.hide();
      console.error('failure to add book...', err);
    });
  }

  updateBook(data: any) {
    this.librarianService.updateBook(this.book.id, data).subscribe((payload: any) => {
      this.toastrService.success(`${payload.name} has been updated successfully`, 'Success!');
      this.modalRef.hide();
      this.working = false;
    }, (err: any) => {
      this.working = false;
      this.toastrService.error(`${this.book.name} not updated!!`, 'Error');
      this.modalRef.hide();
      console.error('failure to update book...', err);
    });
  }

}
