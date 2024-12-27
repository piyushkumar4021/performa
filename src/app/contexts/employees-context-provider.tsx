'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

type TEmployeesContextProviderProps = {
  children: ReactNode;
  employees: TEmployee[];
};

type TEmployeesContext = {
  employees: TEmployee[];
  selectedEmployee: TEmployee | undefined;
  selectedEmployeeId: string | null;
  totalCount: number;
  handleChangeSelectedEmployeeId: (newEmployeeId: string) => void;
};

const EmployeesContext = createContext<TEmployeesContext | null>(null);

export default function EmployeesContextProvider({
  children,
  employees,
}: TEmployeesContextProviderProps) {
  // state
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );

  // derived
  const selectedEmployee = employees.find(
    (employee) => employee.id === selectedEmployeeId
  );
  const totalCount = employees.length;

  // handlers
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
      'useEmployeesContext must be used within an EmployeesContextProvider.'
    );
  }

  return context;
};
