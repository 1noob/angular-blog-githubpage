import { TestBed } from '@angular/core/testing';
import { BlogService } from './blog.service';
describe('BlogService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BlogService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=blog.service.spec.js.map