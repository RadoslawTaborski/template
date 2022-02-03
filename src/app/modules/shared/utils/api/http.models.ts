import { Observable } from 'rxjs';

export interface HttpServiceModel {
    fetch(filters?: { [key: string]: any }): Promise<ResponseData>;
    get(id: string, deep?: number): Promise<any>;
    add(item: any): Promise<string>;
    update(item: any): Promise<string>;
    remove(id: string): Promise<string>;
}

export interface ResponseData {
    data: any[];
    total: number;
    message: string;
    error: string;
}
