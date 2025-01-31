import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface OrderData {
  hospital_name: string;
  contact_person_name: string;
  phone: string;
  email: string;
  hospital_address: string;
  order_type_id:number;
  order_type_name:string;
  total_charge: number;
}
export async function createOrder(data: OrderData) {
  try {
    prisma.$connect();
    const order = await prisma.order.create({
      data: {
        hospital_name:' data.hospital_name',
        contact_person_name: 'data.contact_person_name',
        phone: 'data.phone',
        email: 'data.email',
        hospital_address: 'data.hospital_address',
        order_type_id: 1,
        order_type_name: 'data.order_type.name',
        total_charge: 2,
      },
    });
    return order;
  } catch (error) {
    throw error;
  }finally{
    prisma.$disconnect();
  }
}
