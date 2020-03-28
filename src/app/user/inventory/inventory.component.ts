import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: []
})
export class InventoryComponent implements OnInit {

  history: any

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClickAdd() {
    this.router.navigate(['staff/inventory/add']);
  }

}
