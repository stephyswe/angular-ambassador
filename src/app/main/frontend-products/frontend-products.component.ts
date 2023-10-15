import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Product } from '../../interfaces/product';
import { LinkService } from '../../services/link.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-frontend-products',
  templateUrl: './frontend-products.component.html',
  styleUrls: ['./frontend-products.component.css']
})
export class FrontendProductsComponent implements OnInit {
  products: Product[] = []
  page = 1
  showButton = true
  selected: number[] = [];
  link = '';
  error = false;
  s = '';
  sort = '';

  constructor(
    private productService: ProductService,
    private linkService: LinkService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams["page"] > this.page) {
      this.page = 0;
      this.loadMore();
    }

    this.productService.frontend().subscribe(
      products => this.products = products
    );

    this.route.queryParams.subscribe(
      queryParams => {
        this.page =  Number(queryParams["page"]) || 1;
        this.s = queryParams["s"] || '';
        this.sort = queryParams["sort"] || '';
      }
    )
  }

  loadMore(): void {
     this.page++;
    this.router.navigate([], {
      queryParams: {
        page: this.page,
      },
      queryParamsHandling: 'merge'
    });
  }

  search(s: KeyboardEvent): void {
    if (s.target) {
      const search =  (s.target as HTMLInputElement).value
      this.router.navigate([], {
        queryParams: {
          s: search,
          page: 1
        },
        queryParamsHandling: 'merge'
      });
    }
  }

  sortChanged(event: Event): void {
    if (event.target) {
      const sort = (event.target as HTMLSelectElement).value;
      this.router.navigate([], {
        queryParams: {
          sort,
          page: 1
        },
        queryParamsHandling: 'merge'
      });
    }
  }

  select(id: number): void {
    if (!this.isSelected(id)) {
      this.selected = [...this.selected, id];
      return;
    }

    this.selected = this.selected.filter(s => s !== id);
  }

  isSelected(id: number): boolean {
    return this.selected.some(s => s === id);
  }

  generate(): void {
    this.linkService.generate({
      products: this.selected
    }).subscribe(
      link => {
        this.link = `${environment.checkout_url}/${link.code}`;
      },
      () => this.error = true
    );
  }
}