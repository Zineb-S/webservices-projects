const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const UserResolver = {
    location: async (parent) => {
        return parent.locationId ? prisma.location.findUnique({ where: { id: parent.locationId } }) : null;
      },
  };
  
module.exports = UserResolver;