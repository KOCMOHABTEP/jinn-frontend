import { RootState } from '@/lib/redux/store';

export const getEmployeesTree = (state: RootState) =>
  state.employees.employeesTree;
export const getEmployeesList = (state: RootState) =>
  state.employees.employeesList;
export const getEmployeesMap = (state: RootState) =>
  state.employees.employeesMap;
export const getEmployeesTreeLoadingStatus = (state: RootState) =>
  state.employees.loading;
