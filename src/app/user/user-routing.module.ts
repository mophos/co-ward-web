import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'staff',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'inventory', pathMatch: 'full' },
      {
        path: 'inventory',
        children: [
          { path: '', component: InventoryComponent },
          { path: 'add', component: InventoryAddComponent },
          { path: 'edit', component: InventoryEditComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
