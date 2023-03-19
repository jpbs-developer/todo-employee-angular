import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get()
  findAll() {
    const employees = this.employeeService.findAll();
    return employees;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    const employee = this.employeeService.findOne(id);
    return employee;
  }

  @Post()
  createEmployee(@Body() body: CreateEmployeeDTO) {
    return this.employeeService.create(body);
  }

  @Put(':id')
  updateEmployee(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateEmployeeDTO) {
    return this.employeeService.update(id, body);
  }

  @Delete(':id')
  deleteEmployee(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.delete(id);
  }
}
