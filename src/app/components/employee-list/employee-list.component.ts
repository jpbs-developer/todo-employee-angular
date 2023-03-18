import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {
  EmployeeTableComponent,
  TableColumns,
} from './employee-table/employee-table.component';
import {
  Employee,
  EmployeeStateService,
} from 'src/app/states/employee-state.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, EmployeeTableComponent],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export default class EmployeeListComponent implements OnInit {
  tableColumns: TableColumns[] = [
    { column: 'Nome', key: 'name' },
    { column: 'Profissão', key: 'jobRole' },
    { column: 'Sálario', key: 'salary' },
    { column: 'Nascimento', key: 'birthDate' },
    { column: 'Registro', key: 'registry' },
  ];

  constructor(public state: EmployeeStateService) {}

  ngOnInit(): void {
    this.state.addEmployee([
      {
        id: 1,
        name: 'Paulo',
        jobRole: 'Programador',
        birthDate: '2021/03/21',
        registry: 4342,
        salary: 40400,
      },
      
      {
        id: 2,
        name: 'Paulo',
        jobRole: 'Programador',
        birthDate: '2021/03/21',
        registry: 4342,
        salary: 40400,
      },
    ]);
  }
}
