'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { Input } from '@/components/ui/Input';
import { getEmployeesList } from '@/lib/redux/employees/employees.selector';
import { useAppSelector } from '@/lib/redux/store';
import EmployeeService from '@/services/employee.service';
import styles from './CreateEmployee.module.scss';

type CreateEmployeeProps = {
  onSuccess: () => void;
};

type CreateEmployeeFormValues = {
  firstName: string;
  lastName: string;
  middleName?: string;
  managerId?: number | null;
};

export const CreateEmployee = ({ onSuccess }: CreateEmployeeProps) => {
  const employeesList = useAppSelector(getEmployeesList);

  const managersDropdownOptions = useMemo(() => {
    const managers = employeesList.map((emp) => ({
      label: `${emp.lastName} ${emp.firstName} ${emp.middleName}`,
      value: emp.id,
    }));

    return [
      {
        label: 'Нет руководителя',
        value: null,
      },
      ...managers,
    ];
  }, [employeesList]);

  const createEmployeeFormValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Укажите имя сотрудника'),
    lastName: Yup.string().required('Укажите фамилию сотрудника'),
    middleName: Yup.string(),
    managerId: Yup.number()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null)),
  });

  const createEmployeeForm = useForm<CreateEmployeeFormValues>({
    mode: 'onChange',
    resolver: yupResolver(createEmployeeFormValidationSchema),
  });

  const handleCreate: SubmitHandler<CreateEmployeeFormValues> = async (
    data
  ) => {
    const { firstName, lastName, middleName, managerId } = data;

    try {
      await EmployeeService.createEmployee({
        firstName,
        lastName,
        middleName,
        managerId,
      });
      onSuccess();
    } catch (e) {
      console.log(e);
      toast.error('Произошла ошибка');
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.containerRow}>
          <div className={styles.content}>
            <div className={styles.contentBody}>
              <div className={styles.contentRow}>
                <Input
                  label="Фамилия"
                  required={true}
                  {...createEmployeeForm.register('lastName', {
                    required: 'Поле должно быть заполнено',
                  })}
                  error={createEmployeeForm.formState.errors.lastName?.message}
                />
              </div>
              <div className={styles.contentRow}>
                <Input
                  label="Имя"
                  required={true}
                  {...createEmployeeForm.register('firstName', {
                    required: 'Поле должно быть заполнено',
                  })}
                  error={createEmployeeForm.formState.errors.firstName?.message}
                />
              </div>
              <div className={styles.contentRow}>
                <Input
                  label="Отчество"
                  {...createEmployeeForm.register('middleName')}
                  error={
                    createEmployeeForm.formState.errors.middleName?.message
                  }
                />
              </div>
              <div className={styles.contentRow}>
                <Dropdown
                  label="Выберите руководителя"
                  {...createEmployeeForm.register('managerId')}
                  options={managersDropdownOptions}
                  value={createEmployeeForm.getValues('managerId')?.toString()}
                  onSelect={({ option }) =>
                    createEmployeeForm.setValue('managerId', option.value)
                  }
                />
              </div>
              <div className={styles.contentRow}>
                <Button
                  text="Создать"
                  onClick={createEmployeeForm.handleSubmit(handleCreate)}
                  disabled={!createEmployeeForm.formState.isValid}
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
