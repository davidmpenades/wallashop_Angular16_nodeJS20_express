import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Category, CategoryService, Product, ProductService } from 'src/app/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  product: Product = {} as Product
  productForm: FormGroup;
  categories: Category[] = [];

  @Input() editProduct: Product = {} as Product
  @Input() editEnable: Boolean = false

  @Input() dataObservable!: Observable<any>;
  dataFromParent: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private categoryService: CategoryService

  ) {
    this.productForm = this.fb.group({
      title: [''],
      description: [''],
      price: [0],
      imgs: '',
      category: ['']
    });
  }

  ngOnInit() {
    this.getCategories()
    this.dataObservable.subscribe((data: any) => {
      this.dataFromParent = data;
      this.product = Object.assign({}, data);
      this.productForm.patchValue(this.product);
    });


    if (this.editProduct) {
      this.product = Object.assign({}, this.editProduct);
      this.productForm.patchValue(this.product);
    }
  }

  controllerSubmit() {
    if (this.editEnable) {
      this.editForm()
    } else {
      this.submitForm()
    }
  }

  submitForm() {

    this.updateProduct(this.productForm.value);

    this.productService.set(this.product).subscribe({
      next: (product) => {
        this.productForm.reset()
        this.toastr.success("Se ha creado el producto")
        this.router.navigate(['/detail', product.slug])
      },
      error: (err) => {
        this.toastr.success("Fallo al crear el producto")
      }
    });
  }

  editForm() {

    this.updateProduct(this.productForm.value);

    this.productService.updateProd(this.product).subscribe({
      next: (product) => {
        console.log(product);
        this.toastr.success("Se ha actualizado correctamente")
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      },
      error: (err) => {
        console.log(err);

        this.toastr.error("Fallo al actualizar el producto")
      }
    });
  }

  updateProduct(values: any) {
    Object.assign(this.product, values);
    this.product.imgs = []
    if (typeof values.imgs == "string") {
      values.imgs.split(',').forEach((i: any) => {
        this.product.imgs.push(i)
      })
    } else {
      this.product.imgs = values.imgs
    }
  }

  getCategories() {
    this.categoryService.get({}).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
