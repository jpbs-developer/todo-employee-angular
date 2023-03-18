import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {
  EmployeeTableComponent,
  TableColumns,
} from './employee-table/employee-table.component';
import { Observable } from 'rxjs';

export type Employee = {
  name: string;
  jobRole: string;
  salary: number;
  birthDate: string;
  registry: number;
};

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, EmployeeTableComponent],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export default class EmployeeListComponent {
  tableColumns: TableColumns[] = [
    { column: 'Nome', key: 'name' },
    { column: 'Profissão', key: 'jobRole' },
    { column: 'Sálario', key: 'salary' },
    { column: 'Nascimento', key: 'birthDate' },
    { column: 'Registro', key: 'registry' },
  ];

}
