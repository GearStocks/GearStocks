import { TestBed } from '@angular/core/testing';

import { ItemResolverService } from './item-resolver.service';

xdescribe('ItemResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemResolverService = TestBed.get(ItemResolverService);
    expect(service).toBeTruthy();
  });
});
