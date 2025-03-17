'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { Input } from '@/components/ui/Input';
import { fetchAssignManager } from '@/lib/redux/employees/employees.action';
import {
  getEmployeesList,
  getEmployeesMap,
} from '@/lib/redux/employees/employees.selector';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import styles from './EditEmployee.module.scss';

type CreateEmployeeProps = {
  managerId: number | null;
  employeeId: number;
  onSuccess: () => void;
  onBeforeSend: () => void;
};

type EditEmployeeFormValues = {
  employeeId: number;
  managerId: number | null;
};

export const EditEmployee = ({
  managerId,
  employeeId,
  onSuccess,
  onBeforeSend,
}: CreateEmployeeProps) => {
  const dispatch = useAppDispatch();
  const employeesList = useAppSelector(getEmployeesList);
  const employeesMap = useAppSelector(getEmployeesMap);
  const currentEmployee = employeesMap[employeeId.toString()];

  const managersDropdownOptions = useMemo(() => {
    const managers = employeesList.reduce<{ label: string; value: number }[]>(
      (acc, emp) => {
        if (emp.id !== employeeId) {
          acc.push({
            label: `${emp.lastName} ${emp.firstName} ${emp.middleName}`,
            value: emp.id,
          });
        }
        return acc;
      },
      []
    );

    return [
      {
        label: 'Нет руководителя',
        value: null,
      },
      ...managers,
    ];
  }, [employeeId, employeesList]);

  const createEmployeeFormValidationSchema = Yup.object().shape({
    employeeId: Yup.number().required(),
    managerId: Yup.number()
      .required()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null)),
  });

  const editEmployeeForm = useForm<EditEmployeeFormValues>({
    mode: 'onChange',
    defaultValues: {
      employeeId,
      managerId,
    },
    resolver: yupResolver(createEmployeeFormValidationSchema),
  });

  const handleEdit: SubmitHandler<EditEmployeeFormValues> = async (data) => {
    const { employeeId, managerId } = data;

    try {
      onBeforeSend();
      await dispatch(
        fetchAssignManager({
          employeeId,
          managerId,
        })
      );
      onSuccess();
    } catch (e) {
      console.log(e);
      toast.error('Произошла ошибка');
    }
  };

  if (!currentEmployee) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.containerRow}>
          <div className={styles.content}>
            <div className={styles.contentBody}>
              <div className={styles.contentRow}>
                <Input
                  label="Сотрудник"
                  value={`${currentEmployee.lastName} ${currentEmployee.firstName} ${currentEmployee.middleName}`}
                  disabled={true}
                />
              </div>
              <div className={styles.contentRow}>
                <Dropdown
                  label="Выберите руководителя"
                  {...editEmployeeForm.register('managerId')}
                  options={managersDropdownOptions}
                  value={editEmployeeForm.getValues('managerId')?.toString()}
                  defaultValue={managerId}
                  onSelect={({ option }) =>
                    editEmployeeForm.setValue('managerId', option.value)
                  }
                />
              </div>
              <div className={styles.contentRow}>
                <Button
                  text="Изменить"
                  onClick={editEmployeeForm.handleSubmit(handleEdit)}
                  disabled={!editEmployeeForm.formState.isValid}
                  buttonClassName={styles.contentButton}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
