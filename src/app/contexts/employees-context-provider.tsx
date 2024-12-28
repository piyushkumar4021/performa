'use client';
import { addEmployee, editEmployee, removeEmployee } from '@/actions/actions';
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
  data: TEmployee[];
};

type TEmployeesContext = {
  employees: TEmployee[];
  selectedEmployee: TEmployee | undefined;
  selectedEmployeeId: string | null;
  totalCount: number;
  handleChangeSelectedEmployeeId: (newEmployeeId: string) => void;
  handleAddEmployee: (employee: Omit<TEmployee, 'id'>) => void;
  handleEditEmployee: (
    employeeId: string,
    employee: Omit<TEmployee, 'id'>
  ) => void;
  handleRemoveEmployee: (employeeId: string) => void;
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
          return [...state, { id: Date.now().toString(), ...payload.data }];
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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );

  // derived
  const selectedEmployee = optimisticEmployees.find(
    (employee) => employee.id === selectedEmployeeId
  );
  const totalCount = optimisticEmployees.length;

  // handlers
  const handleChangeSelectedEmployeeId = (newEmployeeId: string) => {
    setSelectedEmployeeId(newEmployeeId);
  };
  const handleAddEmployee = async (employee: Omit<TEmployee, 'id'>) => {
    setOptimisticEmployees({ action: 'add', payload: { data: employee } });

    const error = await addEmployee(employee);
    if (error) toast.error(error.message);
  };
  const handleEditEmployee = async (
    employeeId: string,
    employee: Omit<TEmployee, 'id'>
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
  const handleRemoveEmployee = async (employeeId: string) => {
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
