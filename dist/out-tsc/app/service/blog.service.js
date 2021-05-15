import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { ajax } from "rxjs/ajax";
import { HttpHeaders } from "@angular/common/http";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
let BlogService = class BlogService {
    constructor(http) {
        this.http = http;
    }
    getDefaultOwnerAndRepo() {
        let owner = environment.github.owner;
        let repo = environment.github.repo;
        return [owner, repo];
    }
    getBlogInfo(owner, repo) {
        console.log("This is my warning message");
        const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
        return this.http.get(url);
    }
    getBlogDetail(owner, repo, blogId) {
        const url = `https://api.github.com/repos/${owner}/${repo}/issues/${blogId}`;
        return this.http.get(url);
    }
    renderMarkdown(text) {
        return ajax({
            url: "https://api.github.com/markdown",
            method: 'POST',
            responseType: 'text',
            body: {
                text,
                mode: 'gfm'
            },
            headers: {
                'Accept': 'text/html',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    }
};
BlogService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], BlogService);
export { BlogService };
//# sourceMappingURL=blog.service.js.map