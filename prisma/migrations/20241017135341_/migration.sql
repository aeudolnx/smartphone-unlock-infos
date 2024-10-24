-- CreateTable
CREATE TABLE "Smartphone" (
    "imagemDoSmartphone" BLOB NOT NULL,
    "model" TEXT NOT NULL,
    "nomeDoCelular" TEXT NOT NULL PRIMARY KEY,
    "processador" TEXT NOT NULL,
    "binarios" TEXT NOT NULL,
    "androids" TEXT NOT NULL,
    "downloadMode" TEXT NOT NULL,
    "factoryReset" TEXT NOT NULL,
    "unlockMethod" TEXT NOT NULL,
    "allowBinary" TEXT NOT NULL,
    "notAllowBinary" TEXT NOT NULL,
    "flashRom" TEXT NOT NULL,
    "program" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Smartphone_nomeDoCelular_key" ON "Smartphone"("nomeDoCelular");
