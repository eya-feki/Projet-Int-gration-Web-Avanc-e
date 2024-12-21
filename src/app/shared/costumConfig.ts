import { Injectable } from "@angular/core";
import { Config } from "./config";

@Injectable()
export class CustomConfig extends Config{
    override bdUrl = 'http://localhost:2000/'; 
}
