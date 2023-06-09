import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../employee.service';
import { converStringToNumber } from 'src/app/utils/coverteStringToNumber';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    RouterModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export default class EmployeeFormComponent implements OnInit {
  employeeId = this.route.snapshot.paramMap.get('id') as string;
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildEmployeeForm();

    if (this.employeeId) {
      this.findEmployee();
    }
  }

  buildEmployeeForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      jobRole: ['', Validators.required],
      salary: ['', Validators.required],
      birthDate: ['', Validators.required],
      registry: ['', [Validators.required]],
    });
  }

  saveEmployee(): void {
    const employee = this.employeeForm.value;
    employee.registry = converStringToNumber(employee.registry);
    this.service.createEmployee(employee).subscribe({
      next: (response) => {
        this.location.back();
        Swal.fire('Funcionario criado com sucesso!', '', 'success');
      },
      error: (error) => {
        Swal.fire(`${error.error.message}`, '', 'error');
      },
    });
  }

  findEmployee() {
    this.service.findEmployee(this.employeeId).subscribe({
      next: (employee) => this.employeeForm.patchValue(employee),
      error: (error) => Swal.fire(`${error.error.message}`, '', 'error'),
    });
  }

  updateEmployee() {
    const employee = this.employeeForm.value;
    Swal.fire({
      title: `Tem certeza que deseja atualizar o funcionário?`,
      confirmButtonText: 'Atualizar',
      showDenyButton: true,
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.updateEmployee(this.employeeId, employee).subscribe({
          next: (employee) => {
            Swal.fire('Funcionario atualizado com sucesso!', '', 'success');
            this.employeeForm.patchValue(employee);
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
