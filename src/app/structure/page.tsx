'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CreateEmployee } from '@/components/features/CreateEmployee';
import { EditEmployee } from '@/components/features/EditEmployee';
import { PrivateRoute } from '@/components/layout/PrivateRoute';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import { UserCard } from '@/components/ui/UserCard';
import {
  fetchDeleteEmployee,
  fetchEmployeesList,
  fetchEmployeesTreeStructure,
} from '@/lib/redux/employees/employees.action';
import {
  getEmployeesTree,
  getEmployeesTreeLoadingStatus,
} from '@/lib/redux/employees/employees.selector';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { IEmployeeTreeStructure } from '@/types/IEmployee';
import styles from './page.module.scss';

type TContextMenuData = {
  action: string;
  payload?: Record<string, any>;
};

export default function Structure() {
  const dispatch = useAppDispatch();
  const employeesTreeStructure = useAppSelector(getEmployeesTree);
  const employeesTreeStructureLoadingStatus = useAppSelector(
    getEmployeesTreeLoadingStatus
  );

  const [createEmployeeFormOpened, setCreateEmployeeFormOpened] =
    useState(false);
  const [editEmployeeFormOpened, setEditEmployeeFormOpened] = useState(false);
  const [contextMenuData, setContextMenuData] = useState<TContextMenuData>({
    action: '',
    payload: {},
  });

  useEffect(() => {
    dispatch(fetchEmployeesList());
    dispatch(fetchEmployeesTreeStructure());
  }, [dispatch]);

  const handleRefreshData = () => {
    dispatch(fetchEmployeesList());
    dispatch(fetchEmployeesTreeStructure());
  };

  const handleContextMenu = async (
    action: TContextMenuData['action'],
    payload?: TContextMenuData['payload']
  ) => {
    if (action === 'deleteUser') {
      try {
        const employeeId = payload?.employeeId;

        await dispatch(fetchDeleteEmployee({ id: employeeId }));
        await dispatch(fetchEmployeesTreeStructure());
      } catch {
        toast.error('Возникла ошибка');
      }
      return;
    }

    if (action === 'assignManager') {
      setContextMenuData({
        action,
        payload,
      });
      setEditEmployeeFormOpened(true);
    }
  };

  const renderTree = (treeStructure: IEmployeeTreeStructure[]) => {
    return treeStructure.map((emp) => (
      <div className={styles.gridItem} key={emp.id}>
        <UserCard
          employeeId={emp.id}
          managerId={emp.managerId}
          firstName={emp.firstName}
          lastName={emp.lastName}
          middleName={emp.middleName}
          isManager={Boolean(emp.subordinates && emp.subordinates.length)}
          onContextMenuSelect={handleContextMenu}
        />
        {emp.subordinates && emp.subordinates.length > 0 && (
          <div className={styles.gridSubItem}>
            {renderTree(emp.subordinates)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <PrivateRoute>
      <main>
        <div className={styles.header}>
          <h1>Структура</h1>
          <div className={styles.actions}>
            <Button
              text={'Добавить пользователя'}
              onClick={() => setCreateEmployeeFormOpened(true)}
            />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.gridRow}>
              {employeesTreeStructureLoadingStatus === 'pending' && <Spinner />}
              {employeesTreeStructureLoadingStatus === 'succeeded' &&
                renderTree(employeesTreeStructure)}
            </div>
          </div>
        </div>
      </main>

      <Modal
        title={'Создать пользователя'}
        description={'Форма для создания нового пользователя'}
        visibility={createEmployeeFormOpened}
        onClose={() => setCreateEmployeeFormOpened(false)}
      >
        <CreateEmployee
          onSuccess={handleRefreshData}
          onBeforeSend={() => setCreateEmployeeFormOpened(false)}
        />
      </Modal>
      <Modal
        title={'Редактировать пользователя'}
        description={'Форма для редактирования пользователя'}
        visibility={editEmployeeFormOpened}
        onClose={() => setEditEmployeeFormOpened(false)}
      >
        {contextMenuData?.payload && (
          <EditEmployee
            managerId={contextMenuData.payload.managerId || null}
            employeeId={contextMenuData.payload.employeeId}
            onSuccess={handleRefreshData}
            onBeforeSend={() => setEditEmployeeFormOpened(false)}
          />
        )}
      </Modal>
    </PrivateRoute>
  );
}
