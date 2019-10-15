import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { LibrarianService } from '../librarian.service';
import { AuthService } from '@authentication/auth.service';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { AddUpdateBookComponent } from '../add-update-book/add-update-book.component';
import { ToastrService } from 'ngx-toastr';
import { LendBookComponent } from '../lend-book/lend-book.component';
import { PageChangedEvent } from 'ngx-bootstrap';


@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.css']
})
export class LibrarianComponent implements OnInit {

  itemsPerPage = 10;
  countPerPage = [10, 20, 50, 100];
  currentPage = 1;
  working: boolean;
  queryResult$: Observable<any>;
  user$: Observable<any>;
  modalRef: BsModalRef;
  // tslint:disable-next-line: variable-name
  private _offset = 0;
  book: any;
  subscriptions: Subscription[] = [];
  // tslint:disable-next-line: variable-name
  _list: any;

  constructor(private modalService: BsModalService,
              private librarianService: LibrarianService,
              private changeDetection: ChangeDetectorRef,
              private toastrService: ToastrService,
              private authService: AuthService) {
      this.user$ = this.authService.getUser();
      this.queryResult$ = this.librarianService.fetchBooks(this.itemsPerPage, this.offset);
    }

  ngOnInit() {}

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

  get offset() {
    return this._offset;
  }

  public lendBook(book: any) {
    if (book.status === 'BORROWED') {
      this.toastrService.info('This book has already been lent out. Wait for the borrower to return it.', 'Already Borrowed!!');
      return;
    }
    const initialState = {
      book
    };
    const config = {
      class: 'modal-lg',
      initialState
    };
    this.openModal(LendBookComponent, config);
  }

  public deleteBook() {
    this.librarianService.deleteBook(this.book.id).subscribe((val: any) => {
      console.log('delete payload', val);
      this.toastrService.success('Deleted successfully!!', 'Success');
      this.onPageChanged({page: 1, itemsPerPage: this.itemsPerPage});
    }, (err: any) => {
      this.toastrService.error('Delete failed!!', 'Failed');
      console.error('Delete error: ', err);
    });
  }

  public updateBook(book: any) {
    const initialState = {
      title: 'UPDATE',
      book
    };
    const config = {
      initialState,
      class: 'modal-md'
    };
    this.openModal(AddUpdateBookComponent, config);
  }

  public addBook() {
    const initialState = {
      title: 'ADD',
      book: null
    };
    const config = {
      initialState,
      class: 'modal-md'
    };
    this.openModal(AddUpdateBookComponent, config);
  }

  openModal(template: TemplateRef<any> | any, config?: any ) {
    this.reloadOnModalClose();

    if (template instanceof TemplateRef) {
      this.modalRef = this.modalService.show(template);
    } else {
        this.modalRef = this.modalService.show(template, config);
    }
  }

  openDeleteModal(template: TemplateRef<any>, book: any) {
    this.book = book;
    this.modalRef = this.modalService.show(template);
  }

  reloadOnModalClose() {
    // tslint:disable-next-line: variable-name
    const _combine = combineLatest(
      this.modalService.onHide,
      this.modalService.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());

    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string) => {
        this.onPageChanged({page: this.currentPage, itemsPerPage: this.itemsPerPage});
        this.unsubscribe();
      })
    );

    this.subscriptions.push(_combine);
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  get totalCount() {
    return 5;
  }

}
