'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

type TEmployeesContextProviderProps = {
  children: ReactNode;
  data: TEmployee[];
};

type TEmployeesContext = {
  employees: TEmployee[];
  selectedEmployee: TEmployee | undefined;
  selectedEmployeeId: string | null;
  totalCount: number;
  handleChangeSelectedEmployeeId: (a: string) => void;
};

const EmployeesContext = createContext<TEmployeesContext | null>(null);

export default function EmployeesContextProvider({
  children,
  data,
}: TEmployeesContextProviderProps) {
  const [employees, setEmployees] = useState(data);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );

  const selectedEmployee = employees.find(
    (employee) => employee.id === selectedEmployeeId
  );
  const totalCount = employees.length;

  const handleChangeSelectedEmployeeId = (newEmployeeId: string) => {
    setSelectedEmployeeId(newEmployeeId);
  };

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        selectedEmployee,
        selectedEmployeeId,
        totalCount,
        handleChangeSelectedEmployeeId,
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
      'useEmployeesContext must be used within an EmployeesContextProvider. Ensure that your component is wrapped inside the EmployeesContextProvider in the component tree.'
    );
  }

  return context;
};
