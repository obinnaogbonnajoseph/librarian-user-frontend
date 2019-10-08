import { TestBed } from '@angular/core/testing';

import { BookUserService } from './book-user.service';

describe('BookUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookUserService = TestBed.get(BookUserService);
    expect(service).toBeTruthy();
  });
});
