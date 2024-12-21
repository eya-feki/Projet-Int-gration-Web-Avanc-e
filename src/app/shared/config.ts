import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class Config {
  readonly bdUrl: string = 'http://localhost:2000/'; 
}