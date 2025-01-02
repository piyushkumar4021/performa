import { Employee } from '@prisma/client';

export type EmployeeEssentials = Omit<
  Employee,
  'id' | 'updatedAt' | 'createdAt'
>;
