import { createAsyncThunk } from '@reduxjs/toolkit';

import EmployeeService from '@/services/employee.service';
import { AssignManagerDto } from '@/types/IEmployee';

export const fetchEmployeesList = createAsyncThunk(
  'employees/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await EmployeeService.getList();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteEmployee = createAsyncThunk(
  'employees/fetchDeleteEmployee',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await EmployeeService.deleteById({ id });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeesTreeStructure = createAsyncThunk(
  'employees/fetchTreeStructure',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await EmployeeService.getTreeStructure();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAssignManager = createAsyncThunk(
  'employees/fetchAssignManager',
  async (dto: AssignManagerDto, { rejectWithValue }) => {
    try {
      const { data } = await EmployeeService.assignManager(dto);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
