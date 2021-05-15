import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { BlogService } from '../service/blog.service';
let LayoutComponent = class LayoutComponent {
    constructor(blogService, http) {
        this.blogService = blogService;
        this.http = http;
        this.blogs = [];
        this.owner = '1noob';
        this.repo = 'blog';
    }
    ngOnInit() {
        this.blogs = this.blogService.getBlogInfo(this.owner, this.repo);
    }
};
LayoutComponent = __decorate([
    Component({
        selector: 'app-layout',
        templateUrl: './layout.component.html',
        styleUrls: ['./layout.component.css'],
        providers: [BlogService]
    })
], LayoutComponent);
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map