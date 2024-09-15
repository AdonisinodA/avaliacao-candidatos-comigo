import { PrismaClient, Vehicle } from '@prisma/client';

export class VehicleRepository {


  // Método para listar todos os veículos
  static async listVehicles(prisma: PrismaClient): Promise<Vehicle[]> {
      const vehicles = await prisma.vehicle.findMany();
      return vehicles;
  }
}
