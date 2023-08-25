import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../interfaces/products';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
  loading: boolean = false;
  id: number;
  idCategory: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  
  constructor(
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private aRouter: ActivatedRoute) {
      this.id = Number(aRouter.snapshot.paramMap.get('id'));
      this.idCategory = 0;
      this.name= '';
      this.description = '';
      this.price = 0;
      this.image = '';
      this.stock = 0;
      console.log(this.id);
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.getAll('id')
     
      if (!isNaN(this.id)) {
        this.getProduct(this.id);
      } else {
        this.handleError('El id no es válido');
      }
    });
  }

  getProduct(id: number) {
    this.loading = true;
    
    
    this._productService.getProduct(id).subscribe(
      (product: Product) => {
        this.name = product.name;
        this.idCategory = product.idCategory;
        this.description = product.description;
        this.price = product.price;
        this.image = product.image;
        this.stock = product.stock;
        this.loading = false;
        this.router.navigate([`detail/${product.id}`]);
      },
      (error) => {
        this.handleError('Ocurrió un error al obtener el producto');
      }
    );
  }
  
  handleError(errorMessage: string) {
    this.toastr.error(errorMessage, 'Error');
    this.router.navigate(['detail/{{product.id}}']);
  }
}
