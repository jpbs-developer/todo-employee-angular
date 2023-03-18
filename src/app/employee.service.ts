import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Employee } from './states/employee-state.service';
import { converStringToISO8601 } from './utils/convertDateToISO';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  findAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.api}/employees`).pipe(
      map((employees) => {
        return employees.map((employee) => {
          employee.birthDate = employee.birthDate
            .split('-')
            .reverse()
            .join('/');
          return employee;
        });
      })
    );
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/employees/${id}`);
  }

  createEmployee(employee: Employee): Observable<void> {
    employee.birthDate = converStringToISO8601(employee.birthDate);
    return this.http.post<void>(`${environment.api}/employees`, employee);
  }

  findEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${environment.api}/employees/${id}`);
  }
}
