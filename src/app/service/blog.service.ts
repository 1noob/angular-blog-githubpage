import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClient, HttpClientModule } from '@angular/common/http';


// 内存池
const cache = {};
const headers = {
  'Authorization': "Basic dG9rZW46Z2hwX2dHalQ5aFRQUFlEVGxETkJYdkQ1aExuaDROOEJpajFYQWdtUQ==",
  // 'Access-Control-Allow-Origin': '*',
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
    return this.http.get(url).pipe(
      this.catchErrorPipe,
      map((data: any) => {
        if(data['status'] != 200)
          return false;
        return data['error']['text'];
      })
    );
  }
}
