import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAssignManager,
  fetchDeleteEmployee,
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
      .addCase(fetchEmployeesList.fulfilled, (state, action) => {
        state.employeesList = action.payload;
        state.error = null;

        const byId: Record<string, any> = {};

        action.payload.forEach((emp) => {
          byId[emp.id] = emp;
        });

        state.employeesMap = byId;
      })
      .addCase(fetchEmployeesList.rejected, (state, action) => {
        state.employeesList = [];
        state.error = action.payload;
      });
    // fetchDeleteEmployee
    builder
      .addCase(fetchDeleteEmployee.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchDeleteEmployee.fulfilled, (state) => {
        state.loading = 'succeeded';
      })
      .addCase(fetchDeleteEmployee.rejected, (state) => {
        state.loading = 'failed';
      });
    // fetchEmployeesTreeStructure
    builder
      .addCase(fetchEmployeesTreeStructure.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEmployeesTreeStructure.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.employeesTree = action.payload;
      })
      .addCase(fetchEmployeesTreeStructure.rejected, (state, action) => {
        state.loading = 'failed';
        state.employeesTree = [];
        state.error = action.payload;
      });
    // fetchAssignManager
    builder
      .addCase(fetchAssignManager.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAssignManager.fulfilled, (state) => {
        state.loading = 'succeeded';
      })
      .addCase(fetchAssignManager.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});

export default employeesSlice.reducer;
