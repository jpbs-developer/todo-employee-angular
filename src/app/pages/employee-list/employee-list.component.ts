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
import Swal from 'sweetalert2';

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
    this.findAllEmployees();
  }

  findAllEmployees(): void {
    this.service.findAllEmployees().subscribe({
      next: (employees) => this.state.addEmployee(employees),
    });
  }

  removeEmployee(employee: Employee): void {
    Swal.fire({
      title: `Tem certeza que deseja excluir o funcionário ${employee.name}?`,
      confirmButtonText: 'Excluir',
      showDenyButton: true,
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteEmployee(employee.id).subscribe({
          next: (response) => {
            Swal.fire('Funcionario deletado com sucesso!', '', 'success');
            this.state.removeEmployee(employee);
          },
          error: (error) => {
            Swal.fire(`${error.error.message}`, '', 'error');
          },
        });
      } else if (result.isDenied) {
        Swal.fire('Operação cancelada', '', 'info');
      }
    });
  }
}
