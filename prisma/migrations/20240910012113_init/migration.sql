-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "contato_passivo" BOOLEAN NOT NULL,
    "tipo_contato" TEXT NOT NULL,
    "tipo_ticket" TEXT NOT NULL,
    "veiculo" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "detalhe" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_id_key" ON "ticket"("id");
