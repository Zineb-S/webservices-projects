const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const CommentResolver = {
    owner: (parent) => {
      return prisma.user.findUnique({
        where: { id: parent.ownerId },
      });
    },
    post: (parent) => {
      return prisma.post.findUnique({
        where: { id: parent.postId },
      });
    },
  };
  
module.exports = CommentResolver;