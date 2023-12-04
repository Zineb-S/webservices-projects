const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const QueryResolver = {
    users: async (_, { page = 1, limit = 10, name, sortBy = 'registerDate', sortOrder = 'asc' }) => {
        const skip = (page - 1) * limit;
        let whereClause = {};
      
        if (name) {
          whereClause = {
            OR: [
              { firstName: { contains: name } },
              { lastName: { contains: name } }
            ],
          };
        }
      
        try {
          return await prisma.user.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
              [sortBy]: sortOrder,
            },
            include: {
              posts: true, // Fetch nested posts data
            },
          });
        } catch (error) {
          // Log or handle the error as needed
          throw new Error('Error fetching users');
        }
      },
      
      
      user: async (_, args) => {
        const { id } = args;
        return prisma.user.findUnique({
          where: { id },
        });
      },
      posts: async (_, { page = 1, limit = 10, userId, tagName, sortBy = 'publishDate', sortOrder = 'asc' }) => {
        const skip = (page - 1) * limit;
        let whereClause = {};
      
        if (userId) {
          whereClause.ownerId = userId;
        }
      
        if (tagName) {
          whereClause.tags = {
            some: {
              name: tagName,
            },
          };
        }
      
        try {
          return await prisma.post.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
              [sortBy]: sortOrder,
            },
            include: {
              comments: true, // Fetch nested comments data
              owner: true, // Fetch the owner of the post
              tags: true, // Fetch associated tags
            },
          });
        } catch (error) {
          // Log or handle the error as needed
          throw new Error('Error fetching posts');
        }
      },
      
      post: async (_, args) => {
        const { id } = args;
        return prisma.post.findUnique({
          where: { id },
        });
      },
      postsByUser: async (_, { userId, page = 1, limit = 10 }) => {
        const skip = (page - 1) * limit;
        return prisma.post.findMany({
          where: { ownerId: userId },
          skip,
          take: limit,
          orderBy: { publishDate: 'asc' },
        });
      },
    
      // Get posts by a specific tag
      postsByTag: async (_, { tagName, page = 1, limit = 10 }) => {
        const skip = (page - 1) * limit;
        return prisma.post.findMany({
          where: {
            tags: {
              some: { name: tagName },
            },
          },
          skip,
          take: limit,
          orderBy: { publishDate: 'asc' },
        });
      },
    
      // Get a single post by ID
      postById: async (_, { id }) => {
        return prisma.post.findUnique({
          where: { id },
          include: {
            owner: true,
            comments: true,
            tags: true,
          },
        });
      },
      tags: async () => {
        return prisma.tag.findMany();
      },
      location: async (_, args) => {
        const { id } = args;
        return prisma.location.findUnique({
          where: { id },
        });
      },
      locations: async () => {
        return prisma.location.findMany();
      },
      comments: async (_, { page = 1, limit = 10 }) => {
        const skip = (page - 1) * limit;
        return prisma.comment.findMany({
          skip,
          take: limit,
          orderBy: { publishDate: 'asc' },
        });
      },
    
      // Get comments by a specific post
      commentsByPost: async (_, { postId, page = 1, limit = 10 }) => {
        const skip = (page - 1) * limit;
        return prisma.comment.findMany({
          where: { postId },
          skip,
          take: limit,
          orderBy: { publishDate: 'asc' },
        });
      },
    
      // Get comments by a specific user
      commentsByUser: async (_, { userId, page = 1, limit = 10 }) => {
        const skip = (page - 1) * limit;
        return prisma.comment.findMany({
          where: { ownerId: userId },
          skip,
          take: limit,
          orderBy: { publishDate: 'asc' },
        });
      },
};

module.exports = QueryResolver;
