const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PostResolver = {
    owner: async (parent) => {
        return prisma.user.findUnique({ where: { id: parent.ownerId } });
      },
  };
  
  module.exports = PostResolver;