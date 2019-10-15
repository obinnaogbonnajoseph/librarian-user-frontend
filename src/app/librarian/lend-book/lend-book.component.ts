import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { LibrarianService } from '../librarian.service';
import { BookUserService } from 'src/app/services/book-user.service';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-lend-book',
  templateUrl: './lend-book.component.html',
  styleUrls: ['./lend-book.component.css']
})
export class LendBookComponent implements OnInit {

  itemsPerPage = 10;
  countPerPage = [10, 20, 50, 100];
  currentPage = 1;
  working: boolean;
  form: FormGroup;
  page: number;
  queryResult$: Observable<any>;
  // tslint:disable-next-line: variable-name
  private _offset = 0;
  selectedUser: any;
  book: any;

  constructor(private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastrService: ToastrService,
              private librarianService: LibrarianService,
              private bookUserService: BookUserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [''],
      userId: ['']
    });
  }

  get offset() {
    return this._offset;
  }

  get totalCount() {
    return 5;
  }

  submit() {
    if (!this.form.valid) {
      return;
    }

    if (this.working) {
      return;
    }

    this.onPageChanged({
      page: 1,
      itemsPerPage: this.itemsPerPage
    });
  }

  onPageChanged(event) {
    this.working = true;
    this.page = event.page;
    const offset = (event.page - 1) * event.itemsPerPage;
    this._offset = offset;
    const filterParam = Object.assign({}, this.form.value);

    this.queryResult$ = this.bookUserService.searchUsers(filterParam, this.itemsPerPage, this.offset)
      .pipe(filter(val => this.isLibraryUser(val)));
    // making the working boolean wait a second before being false;
    setTimeout(() => {
      this.working = false;
    }, 1200);
  }

  onSelectUser(user: any) {
    this.selectedUser = user;
  }

  lendBook() {
    if (this.book) {
      this.working = true;
      const data = Object.assign({}, this.book);
      data.status = 'BORROWED';
      this.librarianService.updateBook(this.book.id, data).subscribe((payload) => {
        this.working = false;
        this.modalRef.hide();
        this.toastrService.success(`${(payload.name.toUpperCase())}
          has been lent out to ${(this.selectedUser.firstName.toUpperCase())} ${(this.selectedUser.lastName.toUpperCase())}`, 'Success');
      }, (err: any) => {
        console.error('Could not update book status while lending', err);
        this.toastrService.error('Could not lend book, some error occured', 'Lending Failed!!');
        this.working = false;
        this.modalRef.hide();
      });
    }
  }

  onItemsPerPageChange() {
    this.onPageChanged({
      page: 1,
      itemsPerPage: this.itemsPerPage
    });
  }

  isLibraryUser(user: any) {
    const userRoles: string[] = user.roles;
    const libraryUserRoles = ['BORROW_BOOKS'];
    return userRoles.some((it: string) => libraryUserRoles.indexOf(it) > 0);
  }

}
