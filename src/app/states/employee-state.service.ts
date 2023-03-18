import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type Employee = {
  id: number;
  name: string;
  jobRole: string;
  salary: number;
  birthDate: string;
  registry: number;
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeStateService {
  private readonly employeesSubject$ = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject$.asObservable();
  constructor() {}

  addEmployee(employees: Employee[]): void {
    this.employeesSubject$.next([])
    for (let employee of employees) {
      const currentEmployees = this.employeesSubject$.getValue();
      const employeeExists = currentEmployees.find((employeeFilter) => employeeFilter.id === employee.id );
      !employeeExists && this.employeesSubject$.next([...currentEmployees, employee]);
    }
    console.log(this.employeesSubject$.getValue());
  }
}
