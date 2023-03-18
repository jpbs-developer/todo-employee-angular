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
import { RouterModule } from '@angular/router';
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
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.buildEmployeeForm();
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
}
