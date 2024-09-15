-- DropForeignKey
ALTER TABLE "Ticket_vehicle" DROP CONSTRAINT "Ticket_vehicle_ticket_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket_vehicle" DROP CONSTRAINT "Ticket_vehicle_vehicle_id_fkey";

-- AddForeignKey
ALTER TABLE "Ticket_vehicle" ADD CONSTRAINT "Ticket_vehicle_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket_vehicle" ADD CONSTRAINT "Ticket_vehicle_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
