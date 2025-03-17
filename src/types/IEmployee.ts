export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  managerId: number | null;
}

export interface IEmployeeTreeStructure extends IEmployee {
  subordinates: any[];
}

export interface AssignManagerDto {
  managerId: number | null;
  employeeId: number;
}
