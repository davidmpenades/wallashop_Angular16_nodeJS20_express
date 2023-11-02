import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private apiService: ApiService) {}

  getComments(slug: string): Observable<any> {
    return this.apiService.get('/' + slug + '/comments');
  }
  addComment(slug: string, comment: {}): Observable<any> {
    return this.apiService.post('/' + slug + '/comment', comment);
  }
  deleteComment(slug: string, id: string): Observable<any> {
    return this.apiService.deleteComment('/' + slug + '/comments/' + id);
  }
}
