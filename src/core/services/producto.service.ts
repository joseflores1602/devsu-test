import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable, map, take } from "rxjs";
import { Producto } from "../interfaces/producto";

const API_URL = environment.API_URL + "bp/products";

@Injectable()
export class ProductoService {
    constructor(private http: HttpClient) {}

    
    getProductos(search: string, records: number): Observable<Producto[]> {
        return this.http.get<Producto[]>(API_URL).pipe(
            map(productos => { return productos.filter(prod => prod.name.includes(search) || prod.description.includes(search)).slice(0, records) })
            );
        }
        
    getProducto(id: string) : Observable<Producto[]> {
        return this.http.get<Producto[]>(API_URL).pipe(
            map(productos => { return productos.filter(prod => prod.id === id) })
        );
    }

    getProductoVerfication(id: string): Observable<boolean> {
        const url = `${API_URL}/verification?id=${id}`;
        return this.http.get<boolean>(url);
    }

    postProducto(producto: Object): Observable<Producto[]> {
        const url = API_URL;
        return this.http.post<Producto[]>(url, producto);
    }

    putProducto(producto: Object): Observable<Producto> {
        return this.http.put<Producto>(API_URL, producto);
    }

    deleteProduct(id: string): Observable<any> {
        const url = `${API_URL}?id=${id}`;
        return this.http.delete(url, { responseType: 'arraybuffer'});
    }
}