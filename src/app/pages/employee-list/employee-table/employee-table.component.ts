import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from 'src/app/states/employee-state.service';
import { RouterModule } from '@angular/router';
export interface TableColumns {
  column: string;
  key: string;
}
@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatButtonModule, RouterModule],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent implements OnChanges {
  @Output() onDeleteEmployee = new EventEmitter<Employee>();
  @ViewChild(MatSort) sort!: MatSort;
  @Input() data: Employee[] | null = [];
  @Input() filter: string = '';
  @Input() tableColumns: TableColumns[] = [];
  columns: string[] = [];
  dataSource = new MatTableDataSource<Employee>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.columns = [
      ...this.tableColumns.map((column) => column.key),
      'actions',
    ];
    this.dataSource = new MatTableDataSource(this.data as Employee[]);
    if (changes['filter']) {
      this.applyFilter(this.filter);
    }
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(employee: Employee): void {
    this.onDeleteEmployee.emit(employee);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
