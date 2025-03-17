import { createSlice } from '@reduxjs/toolkit';

import {
  fetchEmployeesList,
  fetchEmployeesTreeStructure,
} from '@/lib/redux/employees/employees.action';
import { ApiFetchError, ApiFetchLoadingStatus } from '@/lib/redux/types';
import { IEmployee, IEmployeeTreeStructure } from '@/types/IEmployee';

export interface EmployeesState {
  employeesList: IEmployee[];
  employeesTree: IEmployeeTreeStructure[];
  employeesMap: {
    [key: string]: IEmployee;
  };
  loading: ApiFetchLoadingStatus;
  error: ApiFetchError;
}

const initialState: EmployeesState = {
  employeesList: [],
  employeesTree: [],
  employeesMap: {},
  loading: 'idle',
  error: null,
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchEmployeesList
    builder
      .addCase(fetchEmployeesList.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEmployeesList.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.employeesList = action.payload;
        state.error = null;

        const byId: Record<string, any> = {};

        action.payload.forEach((emp) => {
          byId[emp.id] = emp;
        });

        state.employeesMap = byId;
      })
      .addCase(fetchEmployeesList.rejected, (state, action) => {
        state.loading = 'failed';
        state.employeesList = [];
        state.error = action.payload;
      });
    // fetchEmployeesTreeStructure
    builder.addCase(fetchEmployeesTreeStructure.fulfilled, (state, action) => {
      state.employeesTree = action.payload;
    });
  },
});

export default employeesSlice.reducer;
