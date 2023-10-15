import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { LinkService } from '../../services/link.service';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-backend-products',
  templateUrl: './backend-products.component.html',
  styleUrls: ['./backend-products.component.css']
})
export class BackendProductsComponent implements OnInit {
  products: Product[] = []
  page = 1
  showButton = true
  selected: number[] = [];
  link = '';
  error = false;

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

    this.route.queryParams.subscribe(
      queryParams => {
        this.page =  Number(queryParams["page"]) || 1;
        const s = queryParams["s"] || '';
        const sort = queryParams["sort"] || '';


        this.productService.backend({
          page: this.page,
          s,
          sort
        }).subscribe(
          result => {
            this.products = this.page === 1 ? result.data : [...this.products, ...result.data];
            this.showButton = Number(result.meta.last_page) !== this.page
          }
        )
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

  sort(event: Event): void {
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
