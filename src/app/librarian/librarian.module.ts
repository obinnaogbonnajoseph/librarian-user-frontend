import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import { UtilsModule } from '@utils/utils.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {BsDropdownModule, PopoverModule, ProgressbarModule, TooltipModule} from 'ngx-bootstrap';
import { LibrarianComponent } from './librarian/librarian.component';
import { ActiveUserGuard } from '@authentication/active-user.guard';
import { AddUpdateBookComponent } from './add-update-book/add-update-book.component';
import { LendBookComponent } from './lend-book/lend-book.component';
import { ToastrModule } from 'ngx-toastr';



const routes: Routes = [
  {
    path: '', component: LibrarianComponent,
    canActivate: [ActiveUserGuard],
    data: { permission: ['MODIFY_BOOKS']}
  }
]

@NgModule({
  declarations: [LibrarianComponent, AddUpdateBookComponent, LendBookComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    UtilsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot()
  ],
  entryComponents: [
    AddUpdateBookComponent,
    LendBookComponent
  ]
})
export class LibrarianModule { }
