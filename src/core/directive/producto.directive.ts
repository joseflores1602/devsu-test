import { Directive, Injectable, forwardRef } from "@angular/core";
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { ProductoService } from "../services/producto.service";

@Injectable({providedIn: 'root'})
export class UniqueIdProducto implements AsyncValidator {
    constructor(private productoService: ProductoService) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.productoService.getProducto(control.value).pipe(
            map((res) => { return { existingProductId: res }}),
            catchError(() => of(null))
        );
    }
}

@Directive({
    selector: '[appUniqueProductId]',
    providers: [
      {
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(() => UniqueProductIdValidatorDirective),
        multi: true,
      },
    ],
  })
export class UniqueProductIdValidatorDirective implements AsyncValidator {
    constructor(private validator: UniqueIdProducto) {}
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.validator.validate(control);
    }
}
  