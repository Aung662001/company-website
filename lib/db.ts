import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined;
// };

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
let prisma = new PrismaClient();
export default prisma ;

export interface OrderData {
  hospital_name: string;
  contact_person_name: string;
  phone: string;
  email: string;
  hospital_address: string;
  order_type_id: number;
  order_type_name: string;
  total_charge: number;
}
export async function createOrder(data: OrderData) {
  try {
    await prisma.$connect();
    const order = await prisma.order.create({
      data: {
        hospital_name: data.hospital_name,
        contact_person_name: data.contact_person_name,
        phone: data.phone,
        email: data.email,
        hospital_address: data.hospital_address,
        order_type_id: data.order_type_id,
        order_type_name: data.order_type_name,
        total_charge: data.total_charge,
      },
    });
    return order;
  } catch (error:any) {
    console.log(error.stack)
    throw error;
  } finally {
  }
}
