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
  handleChangeSelectedEmployeeId: (newEmployeeId: string) => void;
  handleAddEmployee: (employee: Omit<TEmployee, 'id'>) => void;
  handleEditEmployee: (editedEmployee: TEmployee) => void;
  handleRemoveEmployee: (employeeId: string) => void;
};

const EmployeesContext = createContext<TEmployeesContext | null>(null);

export default function EmployeesContextProvider({
  children,
  data,
}: TEmployeesContextProviderProps) {
  // state
  const [employees, setEmployees] = useState(data);
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
  const handleAddEmployee = (employee: Omit<TEmployee, 'id'>) => {
    const newEmployee = { id: Date.now().toString(), ...employee };
    setEmployees([...employees, newEmployee]);
  };
  const handleEditEmployee = (editedEmployee: TEmployee) => {
    const nextEmployees = employees.map((employee) =>
      employee.id === editedEmployee.id ? editedEmployee : employee
    );
    setEmployees(nextEmployees);
  };
  const handleRemoveEmployee = (employeeId: string) => {
    setEmployees(employees.filter((employee) => employee.id !== employeeId));
    setSelectedEmployeeId(null);
  };

  return (
    <EmployeesContext.Provider
      value={{
        employees,
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
      'useEmployeesContext must be used within an EmployeesContextProvider. Ensure that your component is wrapped inside the EmployeesContextProvider in the component tree.'
    );
  }

  return context;
};
