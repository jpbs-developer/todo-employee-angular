import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/employee-list/employee-list.component'),
  },
  {
    path: 'add-employee',
    loadComponent: () =>
      import('./pages/employee-form/employee-form.component'),
  },
  {
    path: 'edit-employee/:id',
    loadComponent: () =>
      import('./pages/employee-form/employee-form.component'),
  },
];
