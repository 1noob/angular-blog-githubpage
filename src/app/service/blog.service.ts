import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';

// 内存池
const cache = {};
let cachedBlogs = [];
const headers = {
  'Authorization': 'Basic dG9rZW46Z2hwX3dCaWtKYjVqclhiUkVTUlJ6S0kydjFXRkF6UVJLMTNQVnNvbw=='
};



@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly catchErrorPipe = null

  constructor(private nzService: NzNotificationService) {
    this.catchErrorPipe = catchError(e => {
      console.log(e);
      return of(e);
    });
  }

  getDefaultOwnerAndRepo() {
    let owner = '1noob';
    let repo = '1noob.github.io';
    return {owner, repo};
  }

  getBlogs$(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
    if (cache[url]) {
      return of(cache[url]);
    } else {
      return ajax.getJSON(url,headers).pipe(
        this.catchErrorPipe,
        map((data: any) => {
          cache[url] = data;
          cachedBlogs = data;
          return data;
        })
      );
    }
  }

  getBlog$(owner, repo, blogId) {
    let blog = cachedBlogs.find(blog => blog.number == blogId);
    if (blog) {
      return of(blog);
    } else {
      const url = `https://api.github.com/repos/${owner}/${repo}/issues/${blogId}`;
      return ajax.getJSON(url,headers).pipe(
        this.catchErrorPipe,
        // map(blog => this.decorateBlog(blog)),
      );
    }
  }

  getBlogComments$(blog) {
    if (blog.comments == 0) {
      return of([]);
    } else {
      return ajax.getJSON(blog.comments_url,headers).pipe(
        this.catchErrorPipe
      );
    }
  }


  renderMarkdown$(text) {
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
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Basic dG9rZW46Z2hwX3dCaWtKYjVqclhiUkVTUlJ6S0kydjFXRkF6UVJLMTNQVnNvbw=='
      }
    }).pipe(
      this.catchErrorPipe,
      map(({response}) => response)
    );
  }
}
