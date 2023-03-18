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
import { EmployeeService } from 'src/app/employee.service';

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

  constructor(
    public state: EmployeeStateService,
    private service: EmployeeService
  ) {}

  ngOnInit(): void {
    this.findAllEmployees()
  }

  findAllEmployees() {
    this.service.findAllEmployees().subscribe({
      next: (employees) => {       
        console.log(employees);
        
        this.state.addEmployee(employees);
      },
    });
  }
}
