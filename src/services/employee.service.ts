import $api from '@/services/api';
import {
  AssignManagerDto,
  IEmployee,
  IEmployeeTreeStructure,
} from '@/types/IEmployee';

export default class EmployeeService {
  static async getList() {
    return $api.get<IEmployee[]>('/employees');
  }

  static async deleteById({ id }: { id: string }) {
    return $api.delete<IEmployee>(`/employees/${id}`);
  }

  static async createEmployee(dto: Partial<IEmployee>) {
    return $api.post<IEmployee>(`/employees`, dto);
  }

  static async assignManager(dto: AssignManagerDto) {
    return $api.post<IEmployee>(`/employees/assign-manager`, dto);
  }

  static async getTreeStructure() {
    return $api.get<IEmployeeTreeStructure[]>(`/employees/tree-structure`);
  }
}
