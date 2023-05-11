-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "posts" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorUuid" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorUuid_fkey" FOREIGN KEY ("authorUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
