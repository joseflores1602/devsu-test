import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../core/services/producto.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [ProductoService],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  showMessage: string = '';
  productoForm = new FormGroup({
    id: new FormControl<string>({ value: '', disabled: true}),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl<string>('', [Validators.required]),
    date_release: new FormControl<string>('', [Validators.required]),
    date_revision: new FormControl<string>({ value: '', disabled: true }, [Validators.required])
  });

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

  constructor(private route: ActivatedRoute, private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
      const idProducto = this.route.snapshot.paramMap.get('id');
      if(idProducto) {
        this.getProducto(idProducto);
      }
  }

  getProducto(id: string) {
    this.productoService.getProducto(id).subscribe({
      next: (res) => {
        if(res.length > 0) {
          const { id, name, description, logo, date_release, date_revision } = res[0];
          this.productoForm.patchValue({
            id, 
            name, 
            description, 
            logo, 
            date_release: date_release.split('T')[0],
            date_revision: date_revision.split('T')[0]
          });
        } else {
          this.showMessage = `No se encontró el producto con id ${id}`
        }
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

  ActualizarProducto() {
    this.productoForm.markAllAsTouched()
    if(!this.productoForm.valid) return;

    this.productoService.putProducto(this.productoForm.getRawValue()).subscribe({
      next: (res) => { alert('Datos actualizados correctamente') },
      error: (e) => { alert('Ocurrió un problema al actualizar el producto') },
      complete: () => { 
        this.productoForm.reset()
      }
    })
  }

  navigateTo(ruta: string) {
    this.router.navigate([ruta])
  }
}
