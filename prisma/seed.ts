import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  [
    {
      name: 'Alice Johnson',
      age: 29,
      salary: 50000,
      imageUrl:
        'https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=',
      department: 'Engineering',
    },
    {
      name: 'Bob Smith',
      age: 35,
      salary: 62000,
      imageUrl:
        'https://media.istockphoto.com/id/1587604256/photo/portrait-lawyer-and-black-woman-with-tablet-smile-and-happy-in-office-workplace-african.jpg?s=612x612&w=0&k=20&c=n9yulMNKdIYIQC-Qns8agFj6GBDbiKyPRruaUTh4MKs=',
      department: 'Marketing',
    },
    {
      name: 'Charlie Brown',
      age: 42,
      salary: 72000,
      imageUrl:
        'https://media.istockphoto.com/id/1311655328/photo/im-the-best-asset-in-my-business.jpg?s=612x612&w=0&k=20&c=ebkVt_iY6rRjXvyx2CESPC8EtcWrv0nYt_y4IdKmN3M=',
      department: 'Finance',
    },
    {
      name: 'Diana Prince',
      age: 27,
      salary: 48000,
      imageUrl:
        'https://media.istockphoto.com/id/891418990/photo/confident-businessman-posing-in-the-office.jpg?s=612x612&w=0&k=20&c=a3PcRJAN9QTIfOUJj566B_I4xx2LANZFnX90_-Oe7CI=',
      department: 'Human Resources',
    },
  ].map(async (employee, idx) => {
    console.log(`seeding ${idx + 1}`);
    const { id } = await prisma.employee.create({ data: employee });
    console.log(`created employee with id : ${id}`);
  });

  console.log('done seeding ✅');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
