-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verifyEmail" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT NOT NULL,
    "confirmPassword" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION,
    "sportId" INTEGER NOT NULL,
    "beltLevelId" INTEGER NOT NULL,
    "profilePhoto" TEXT,
    "googleAuthToken" TEXT,
    "appleAuthToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sport" (
    "id" SERIAL NOT NULL,
    "sportName" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeltLevel" (
    "id" SERIAL NOT NULL,
    "levelName" TEXT NOT NULL,
    "colorCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BeltLevel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sport_sportName_key" ON "Sport"("sportName");

-- CreateIndex
CREATE UNIQUE INDEX "BeltLevel_levelName_key" ON "BeltLevel"("levelName");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_beltLevelId_fkey" FOREIGN KEY ("beltLevelId") REFERENCES "BeltLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
