import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments:Comment[]=[];

  constructor() {}
  
initialComments(prod:Product){
  this.comments=prod.comments;
}
getAllComments():Comment[]{
  return this.comments;
}
addComments(comment:Comment){
  this.comments.push(comment);
}
}