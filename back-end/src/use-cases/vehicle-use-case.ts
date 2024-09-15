import { PrismaClient, Vehicle } from '@prisma/client';
import { VehicleRepository } from '../repositories/vehicle-repositorie';

export class ListVehiclesUseCase {

  async execute(): Promise<Vehicle[]> {
    const prisma = new PrismaClient();
      const vehicles = await VehicleRepository.listVehicles(prisma);
      return vehicles;
  }
}
