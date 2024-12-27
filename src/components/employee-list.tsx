'use client';
import { useEmployeesContext } from '@/app/contexts/employees-context-provider';
import Card from './card';
import { useSearchContext } from '@/app/contexts/search-context-provider';
import EmployeeItem from './employee-item';

export default function EmployeeList() {
  const { employees } = useEmployeesContext();
  const { query } = useSearchContext();

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(query)
  );

  return (
    <Card>
      <ul className='h-full overflow-y-auto'>
        {filteredEmployees.map((employee) => (
          <li key={employee.id}>
            <EmployeeItem employee={employee} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
