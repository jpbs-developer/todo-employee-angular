import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../components/employee-list/employee-list.component';

@Injectable({
  providedIn: 'root',
})
export class EmployeeStateService {
  private readonly employeesSubject$ = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject$.asObservable();
  constructor() {}

  addEmployee(...employees: Employee[]): void {
    const currentEmployees = this.employeesSubject$.getValue();
    for (let employee of employees) {
      const employeeExists = currentEmployees.find(
        (employee) => employee.id === employee.id
      );
      if (!employeeExists)
        this.employeesSubject$.next([...currentEmployees, employee]);
    }
  }
}
