import { Component, OnInit } from '@angular/core';
import { BlogService } from "../service/blog.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-layout',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [BlogService]
})
export class ListComponent implements OnInit {

  blogs:any = null;

  constructor(private blogService: BlogService){
  }

  ngOnInit(): void {
    const {owner, repo} = this.blogService.getDefaultOwnerAndRepo();
    this.blogService.getBlogs$(owner, repo)
      .subscribe(blogs => {
        this.blogs = blogs;
      });
  }

}
