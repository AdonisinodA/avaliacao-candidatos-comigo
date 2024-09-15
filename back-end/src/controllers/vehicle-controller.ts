import { NextFunction, Request, Response } from 'express';
import { ListVehiclesUseCase } from '../use-cases/vehicle-use-case';
import { VehicleRepository } from '../repositories/vehicle-repositorie';

export class VehicleController {

  public async listVehicles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listVehiclesUseCase = new ListVehiclesUseCase();
      const vehicles = await listVehiclesUseCase.execute();
      res.status(200).json(vehicles);
    } catch (error) {
       next(error)
    }
  }
}
