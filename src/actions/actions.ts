'use server';

import { prisma } from '@/lib/client';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export const addEmployee = async (employee: Omit<TEmployee, 'id'>) => {
  await sleep(2000);

  try {
    await prisma.employees.create({
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
  employeeId: string,
  employee: Omit<TEmployee, 'id'>
) => {
  await sleep(2000);

  try {
    await prisma.employees.update({
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

export const removeEmployee = async (employeeId: string) => {
  await sleep(2000);

  try {
    await prisma.employees.delete({
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
