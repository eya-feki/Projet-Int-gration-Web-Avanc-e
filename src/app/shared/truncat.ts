import { Pipe,PipeTransform } from "@angular/core";
@Pipe({
    name:'truncat',
    standalone:true
})
export class Truncat implements PipeTransform{
transform(value: string,lower?:string):string{
    let result=value.substring(0,3);
    if (lower==="lowercase")
        result=result.toLowerCase();
    return result;}
}