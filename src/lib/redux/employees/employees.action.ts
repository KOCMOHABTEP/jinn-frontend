import { createAsyncThunk } from '@reduxjs/toolkit';

import EmployeeService from '@/services/employee.service';

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
