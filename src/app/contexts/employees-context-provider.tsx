'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

type TEmployeesContextProviderProps = {
  children: ReactNode;
  data: TEmployee[];
};
type TEmployeesContext = {
  employees: TEmployee[];
  selectedEmployeeId: string | null;
};

const EmployeesContext = createContext<TEmployeesContext | null>(null);

export default function EmployeesContextProvider({
  children,
  data,
}: TEmployeesContextProviderProps) {
  const [employees, setEmployees] = useState(data);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    '1'
  );

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        selectedEmployeeId,
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
