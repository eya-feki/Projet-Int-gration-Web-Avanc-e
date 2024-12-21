import { Pipe,PipeTransform } from "@angular/core";
@Pipe({
    name:'prodFilter',
    standalone:true
})
export class ProductFilter implements PipeTransform{
transform(value: any,price:number):any{
    if (price===0)
        return value;
    return value.filter((product:any)=> product.unitPric<= price)}
}