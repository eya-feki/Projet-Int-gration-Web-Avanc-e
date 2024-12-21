import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
@Input ({required:true,alias:"rech"}) item!:string;
@Output()searchChange= new EventEmitter<string>();
@Output ()searchButtonClicked= new EventEmitter() ;

updateSearch(value: string): void {
  console.log('Search updated:', value);
  this.searchChange.emit(value);
}
isClicked(){
  console.log("searched")
  this.searchButtonClicked.emit();
}

}