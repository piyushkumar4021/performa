'use client';
import { addEmployee, editEmployee, removeEmployee } from '@/actions/actions';
import { EmployeeEssentials } from '@/lib/types';
import { Employee } from '@prisma/client';
import {
  createContext,
  ReactNode,
  startTransition,
  useContext,
  useOptimistic,
  useState,
} from 'react';
import { toast } from 'sonner';

type TEmployeesContextProviderProps = {
  children: ReactNode;
  data: Employee[];
};

type TEmployeesContext = {
  employees: Employee[];
  selectedEmployee: Employee | undefined;
  selectedEmployeeId: Employee['id'] | null;
  totalCount: number;
  handleChangeSelectedEmployeeId: (newEmployeeId: Employee['id']) => void;
  handleAddEmployee: (employee: EmployeeEssentials) => void;
  handleEditEmployee: (
    employeeId: Employee['id'],
    employee: EmployeeEssentials
  ) => void;
  handleRemoveEmployee: (employeeId: Employee['id']) => void;
};

const EmployeesContext = createContext<TEmployeesContext | null>(null);

export default function EmployeesContextProvider({
  children,
  data,
}: TEmployeesContextProviderProps) {
  // state-
  const [optimisticEmployees, setOptimisticEmployees] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case 'add': {
          return [
            ...state,
            {
              ...payload.data,
              id: Date.now().toString(),
              createdAt: new Date(),
              modifiedAt: new Date(),
            },
          ];
        }
        case 'edit': {
          return state.map((employee) => {
            if (employee.id === payload.id)
              return { ...employee, ...payload.data };
            return employee;
          });
        }
        case 'remove': {
          return state.filter((employee) => employee.id !== payload.id);
        }
      }
    }
  );
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<
    Employee['id'] | null
  >(null);

  // derived
  const selectedEmployee = optimisticEmployees.find(
    (employee) => employee.id === selectedEmployeeId
  );
  const totalCount = optimisticEmployees.length;

  // handlers
  const handleChangeSelectedEmployeeId = (newEmployeeId: Employee['id']) => {
    setSelectedEmployeeId(newEmployeeId);
  };
  const handleAddEmployee = async (employee: EmployeeEssentials) => {
    setOptimisticEmployees({ action: 'add', payload: { data: employee } });

    const error = await addEmployee(employee);
    if (error) toast.error(error.message);
  };
  const handleEditEmployee = async (
    employeeId: Employee['id'],
    employee: EmployeeEssentials
  ) => {
    setOptimisticEmployees({
      action: 'edit',
      payload: {
        id: employeeId,
        data: employee,
      },
    });

    const error = await editEmployee(employeeId, employee);
    if (error) toast.error(error.message);
  };
  const handleRemoveEmployee = async (employeeId: Employee['id']) => {
    startTransition(() =>
      setOptimisticEmployees({ action: 'remove', payload: { id: employeeId } })
    );

    const error = await removeEmployee(employeeId);
    if (error) toast.error(error.message);
  };

  return (
    <EmployeesContext.Provider
      value={{
        employees: optimisticEmployees,
        selectedEmployee,
        selectedEmployeeId,
        totalCount,
        handleChangeSelectedEmployeeId,
        handleAddEmployee,
        handleEditEmployee,
        handleRemoveEmployee,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
}

export const useEmployeesContext = () => {
  const context = useContext(EmployeesContext);

  if (!context) {
    throw new Error(
      'useEmployeesContext must be used within an EmployeesContextProvider.'
    );
  }

  return context;
};
