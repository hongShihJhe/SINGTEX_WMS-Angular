import { TestBed } from '@angular/core/testing';

import { ContainerTypeValidator } from './container-type-validator';

describe('ContainerTypeValidator', () => {
  let service: ContainerTypeValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerTypeValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
