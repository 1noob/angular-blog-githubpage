import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { formatDate } from "@angular/common";
import { HttpClient, HttpClientModule } from '@angular/common/http';

// 内存池
const cache = {};
const headers = {
  // 'Authorization': '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'
};



@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly catchErrorPipe = null;

  constructor(private nzService: NzNotificationService, private http: HttpClient) {
    this.catchErrorPipe = catchError(e => {
      console.log(e);
      return of(e);
    });
  }

  getDefaultOwnerAndRepo() {
    let owner = '1noob';
    let repo = 'note';
    return {owner, repo};
  }

  getBlogs$(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents`;
    if (cache[url]) {
      return of(cache[url]);
    } else {
      return ajax.getJSON(url,headers).pipe(
        this.catchErrorPipe,
        map((data: any) => {
          cache[url] = data;
          return data;
        })
      );
    }
  }

  getBlog$(owner, repo, blogName) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${blogName}`;
    // const url = `http://localhost:4300/assets/test.html`;
    return this.http.get(url).pipe(
      this.catchErrorPipe,
      map((data: any) => {
        return data['error']['text'];
      })
    );
  }


  // processBlog(blog) {
  //   if (!blog.markdownRendered) {
  //     this.renderMarkdown$(blog.body)
  //       .subscribe(data => {
  //         blog.body = data;
  //         blog.markdownRendered = true;
  //       });
  //   }
  // }
  //
  //
  // renderMarkdown$(text) {
  //   return ajax({
  //     url: "https://api.github.com/markdown",
  //     method: 'POST',
  //     responseType: 'text',
  //     body: {
  //       text,
  //       mode: 'gfm'
  //     },
  //     headers: {
  //       'Accept': 'text/html',
  //       'Content-Type': 'application/json;charset=UTF-8',
  //       'Authorization': 'Basic dG9rZW46Z2hwX3dCaWtKYjVqclhiUkVTUlJ6S0kydjFXRkF6UVJLMTNQVnNvbw=='
  //     }
  //   }).pipe(
  //     this.catchErrorPipe,
  //     map(({response}) => response)
  //   );
  // }
}
