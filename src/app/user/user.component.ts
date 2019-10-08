import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@authentication/auth.service';
import { LibrarianService } from '../librarian/librarian.service';
import { PageChangedEvent } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  itemsPerPage = 1;
  countPerPage = [1, 2, 5, 10];
  currentPage = 1;
  working: boolean;
  queryResult$: Observable<any>;
  user$: Observable<any>;
  // tslint:disable-next-line: variable-name
  private _offset = 0;
  form: FormGroup;


  constructor(private toastrService: ToastrService,
              private fb: FormBuilder,
              private authService: AuthService,
              private librarianService: LibrarianService) {
                this.user$ = this.authService.getUser();
                this.queryResult$ = this.librarianService.fetchBooks(this.itemsPerPage, this.offset);
               }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      author: ['']
    });
  }

  onPageChanged(event: PageChangedEvent) {
    this.working = true;
    const offset = ( event.page - 1) * event.itemsPerPage;
    this._offset = offset;

    // get the query results...
    this.queryResult$ = this.librarianService.fetchBooks(event.itemsPerPage, offset);
    this.working = false;
  }

  onItemsPerPageChange() {
    this.onPageChanged({
      page: 1,
      itemsPerPage: this.itemsPerPage
    });
  }

  updateStatus(book: any) {
    if (book.status === 'BORROWED') {
      const data = Object.assign({}, book);
      data.status = 'NOT_BORROWED';
      this.librarianService.updateBook(book.id, data).subscribe((payload) => {
        this.toastrService.success(`${(payload.name).toUpperCase()} successfully returned`, 'Success!!');
        this.onPageChanged({
          page: this.currentPage,
          itemsPerPage: this.itemsPerPage
        });
      }, (err) => {
        console.error('book not successfully returned', err);
        this.toastrService.error(`${(book.name).toUpperCase()} not returned! An error occured`, 'Failure!');
      });
    } else {
      const data = Object.assign({}, book);
      data.status = 'BORROWED';
      this.librarianService.updateBook(book.id, data).subscribe((payload) => {
        this.toastrService.success(`${(payload.name).toUpperCase()} successfully borrowed`, 'Success!!');
        this.onPageChanged({
          page: this.currentPage,
          itemsPerPage: this.itemsPerPage
        });
      }, (err) => {
        console.error('book not successfully borrowed', err);
        this.toastrService.error(`${(book.name).toUpperCase()} was not borrowed! An error occured`, 'Failure!');
      });
    }
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

}
