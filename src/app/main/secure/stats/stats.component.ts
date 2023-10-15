import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { StatsService } from '../../../services/stats.service';

interface Stat {
  code: string;
  users: number;
  revenue: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit {
  links: Stat[] = []; // Define the type as Stat[]

  constructor(private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.statsService.stats().subscribe(
      stats => {
        this.links = stats;
      }
    );
  }

  checkoutLink(code: string): string {
    return `${environment.checkout_url}/${code}`;
  }
}