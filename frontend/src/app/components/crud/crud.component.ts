import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/products';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  listCategory: Category[] = []
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      image: ['', Validators.required],
      stock: [null, Validators.required],
      
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if (this.id != 0) {
      this.operacion = 'Editar ';
      this.getProduct(this.id);
      this.getCategory();
    }
    this.getCategory();
    console.log(this.listCategory)
  }

  getCategory() {    
    this._categoryService.getCategories().subscribe((data: Category[]) => {
    this.listCategory = data;    
  })
}

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((product: Product) => {
      this.loading = false;
      this.form.patchValue({
        category: product.category,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        stock: product.stock,
      })
    })
  }

  addProduct() {
    const product: Product = {

      category: this.form.value.category,
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      image: this.form.value.image,
      stock: this.form.value.stock,
      idCategory: this.form.value.idCategory
    }

    this.loading = true;
    if (this.id !== 0) {
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(`Producto ${product.name} actualizado con exito!`, 'Producto actualizado');
        this.loading = false;
        this.router.navigate(['/dashboard']);
      })
    } else {
      this._productService.saveProduct(product).subscribe(() => {
        this.toastr.success(`Producto ${product.name} registrado con exito!`, 'Producto registrado');
        this.loading = false;
        this.router.navigate(['/dashboard']);
      })
    }
  }
}

