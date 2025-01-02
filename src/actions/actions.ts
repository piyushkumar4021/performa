'use server';

import { prisma } from '@/lib/client';
import { EmployeeEssentials } from '@/lib/types';
import { sleep } from '@/lib/utils';
import { Employee } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const addEmployee = async (employee: EmployeeEssentials) => {
  await sleep(2000);

  try {
    await prisma.employee.create({
      data: employee,
    });
  } catch (error) {
    return {
      message: 'something went wrong.',
    };
  }

  revalidatePath('/app', 'layout');
  return;
};

export const editEmployee = async (
  employeeId: Employee['id'],
  employee: EmployeeEssentials
) => {
  await sleep(2000);

  try {
    await prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: employee,
    });
  } catch (error) {
    return {
      message: 'something went wrong',
    };
  }

  revalidatePath('/app', 'layout');
  return;
};

export const removeEmployee = async (employeeId: Employee['id']) => {
  await sleep(2000);

  try {
    await prisma.employee.delete({
      where: {
        id: employeeId,
      },
    });
  } catch (error) {
    return {
      message: 'something went wrong',
    };
  }

  revalidatePath('/app', 'layout');
  return;
};
