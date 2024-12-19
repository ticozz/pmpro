-- CreateTable
CREATE TABLE "TenantNote" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TenantNote_tenantId_idx" ON "TenantNote"("tenantId");

-- CreateIndex
CREATE INDEX "TenantNote_createdById_idx" ON "TenantNote"("createdById");

-- AddForeignKey
ALTER TABLE "TenantNote" ADD CONSTRAINT "TenantNote_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantNote" ADD CONSTRAINT "TenantNote_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
