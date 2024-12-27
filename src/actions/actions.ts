'use server';

import { prisma } from '@/lib/client';
import { UNKOWN_IMAGE_URL } from '@/lib/constants';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export const addEmployee = async (formData) => {
  await sleep(2000);

  try {
    await prisma.employees.create({
      data: {
        name: formData.get('name'),
        age: +formData.get('age'),
        salary: +formData.get('salary'),
        imageUrl: formData.get('imageUrl') || UNKOWN_IMAGE_URL,
        department: formData.get('department'),
      },
    });
  } catch (error) {
    return {
      message: 'something went wrong.',
    };
  }

  revalidatePath('/app', 'layout');
  return;
};

export const editEmployee = async (employeeId, formData) => {
  await sleep(2000);

  try {
    await prisma.employees.update({
      where: {
        id: employeeId,
      },
      data: {
        name: formData.get('name'),
        age: +formData.get('age'),
        salary: +formData.get('salary'),
        imageUrl: formData.get('imageUrl') || UNKOWN_IMAGE_URL,
        department: formData.get('department'),
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

export const removeEmployee = async (employeeId) => {
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
