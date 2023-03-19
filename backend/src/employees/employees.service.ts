import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { Employee } from './entities/employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);
    if (!employee) throw new NotFoundException('Employee not found');
    return this.employeeRepository.findOne(id);
  }

  async create(employee: CreateEmployeeDTO) {
    this.employeeRepository.create(employee);
    await this.employeeRepository.save(employee);
    return { message: 'Funcinário criado com sucesso' };
  }

  async update(id: string, employee: UpdateEmployeeDTO) {
    const currentEmployee = await this.employeeRepository.preload({
      id,
      ...employee,
    });

    if (!currentEmployee) throw new NotFoundException(`Employee  not found`);
    return this.employeeRepository.save(currentEmployee);
  }

  async delete(id: string) {
    const employee = await this.employeeRepository.findOne(id);
    if (!employee) throw new NotFoundException('Employee not found');
    await this.employeeRepository.remove(employee);
    return { message: 'Funcinário deletado com sucesso' };
  }
}
