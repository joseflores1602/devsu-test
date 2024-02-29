import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../../core/services/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, HttpClientModule],
  providers: [ProductoService],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent {
  existeProductoId: boolean = false;
  productoForm = new FormGroup({
    id: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl<string>('', [Validators.required]),
    date_release: new FormControl<string>('', [Validators.required]),
    date_revision: new FormControl<string>({ value: '', disabled: true }, [Validators.required])
  });

  constructor(private router: Router, private productoService: ProductoService) { }

  get id() {
    return this.productoForm.get('id');
  }
  get name() {
    return this.productoForm.get('name');
  }
  get description() {
    return this.productoForm.get('description');
  }
  get logo() {
    return this.productoForm.get('logo');
  }
  get dateRelease() {
    return this.productoForm.get('date_release');
  }
  get dateRevision() {
    return this.productoForm.get('date_revision');
  }

  guardarProducto() {
    this.productoForm.markAllAsTouched()
    if(!this.productoForm.valid || this.existeProductoId) return;

    this.productoService.postProducto(this.productoForm.getRawValue()).subscribe({
      next: (res) => { alert('Datos registrado correctamente') },
      error: (e) => { alert('Ocurrió un problema al registrar el producto') },
      complete: () => { 
        this.productoForm.reset();
        this.navigateTo('/');
      }
    })
  }

  setFechaRevision() {
    if(this.dateRelease?.value) {
      const date = new Date(this.dateRelease.value);
      date.setFullYear(date.getFullYear() + 1);
      this.dateRevision?.setValue(date.toISOString().split('T')[0]);
    }
  }

  validateProduct() {
    if(!this.id?.valid) return;

    if(this.id.value) {
      this.productoService.getProductoVerfication(this.id.value).subscribe({
        next: (res) => this.existeProductoId = res,
        error: (e) =>  this.existeProductoId = false
      })
    }
  }

  navigateTo(ruta: string) {
    this.router.navigate([ruta])
  }
}
