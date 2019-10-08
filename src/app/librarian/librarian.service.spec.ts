import { TestBed } from '@angular/core/testing';

import { LibrarianService } from './librarian.service';

describe('LibrarianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibrarianService = TestBed.get(LibrarianService);
    expect(service).toBeTruthy();
  });
});
