import { TemplateRef } from "@angular/core";

export interface TableColType{
    title:string;
    data:string;
    type: 'img' | 'text' | 'bool' | 'active-inactive' | 'toggle' | 'toggle2' | 'array' | 'custom' | 'renderF' | 'view';
    method?:(data:any) => void;
    renderF?:(data: any, type: any, row: any) => string;
    ref?: TemplateRef<any>;
    context?: Object;
    width?:string;
};