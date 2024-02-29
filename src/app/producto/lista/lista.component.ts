import { Component, ElementRef, OnInit } from '@angular/core';
import { Producto } from '../../../core/interfaces/producto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../core/services/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DialogComponent],
  providers: [ProductoService],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {
  productos: Producto[] = [];
  records: number[] = [5,10,20];
  recordSelected: number = 5;
  searchValue: string = '';
  openModal: boolean = false;
  productId: string = '';
  mensajeModal: string = '';
  showMenu: boolean = false;
  showSkeleton: boolean = false;

  constructor(private productoService: ProductoService, private router: Router, private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.getProductos(true);
  }

  getProductos(loading?: boolean) {
    if(loading) this.showSkeleton = true;
    this.productoService.getProductos(this.searchValue, this.recordSelected).subscribe({
      next: (res) => {
        this.productos = res;
      },
      error: () => this.showSkeleton = false,
      complete: () => this.showSkeleton = false
    })
  }

  editar(id: string) {
    this.router.navigate([`editar/${id}`]);
  }

  borrar(id:string, name: string) {
    this.showTargetMenu(id);
    this.productId = id; 
    this.mensajeModal = `¿ Estás seguro de eliminar el producto: ${name} ?`
    this.openModal = true;
  }

  onClose() {
    this.openModal = false;
  }

  onConfirm() {
    this.productoService.deleteProduct(this.productId).subscribe({
      next: (res) => {
        this.openModal = false;
        alert('Se eliminó correctamente el producto')
      },
      error: (e) => alert('Ocurrió un error al eliminar el producto'),
      complete: () => this.getProductos()
    });
  }

  showTargetMenu(id: string) {
    const element = this.elementRef.nativeElement.querySelector(`#menu-${id}`);
    if(element?.classList.contains('show')) {
      element?.classList.remove('show')
    } else {
      element?.classList.add('show')
    }
  }

  navigateTo(ruta: string) {
    this.router.navigate([ruta])
  }
}
