const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MutationResolver = {
    createUser: async (_, args) => {
        // Destructure the required fields from args
        const { firstName, lastName, email } = args;
      
        // Validate the required fields
        if (!email) {
          throw new Error("Email is missing");
        }
        if (!firstName) {
          throw new Error("First name is missing");
        }
        if (!lastName) {
          throw new Error("Last name is missing");
        }
      
        // If all required fields are present, proceed to create the user
        try {
          return await prisma.user.create({
            data: args,
          });
        } catch (error) {
          // Handle or log other errors as needed
          throw new Error('Error creating user');
        }
      },
      
      updateUser: async (_, args) => {
        const { id, ...data } = args;
        return prisma.user.update({
          where: { id },
          data,
        });
      },
      deleteUser: async (_, args) => {
        const { id } = args;
        const deletedUser = await prisma.user.delete({
          where: { id },
        });
        return deletedUser.id; 
      },
    
      createPost: async (_, args) => {
        const { text, image, tags, ownerId } = args.data; // Destructure the data property
    
        if (!Array.isArray(tags)) { // Ensure tags is an array
          throw new Error("Tags must be an array.");
        }
    
        return prisma.post.create({
          data: {
            text, // Assuming text is a string
            image, // Assuming image is a string
            tags: {
              connectOrCreate: tags.map(tag => ({
                where: { name: tag },
                create: { name: tag },
              })),
            },
            ownerId, // Assuming ownerId is a string representing the ID of the owner
          },
        });
      },
      updatePost: async (_, { id, text, image, link, tags }) => {
        const data = {
          text,
          image,
          link,
        };
      
        if (tags) {
          // This disconnects all existing tags (if you want to remove all and add new ones)
          data.tags = {
            set: [],
            connectOrCreate: tags.map(tag => ({
              where: { name: tag },
              create: { name: tag },
            })),
          };
        }
      
        return prisma.post.update({
          where: { id },
          data,
        });
      },
      
      updateComment: async (_, args) => {
        const { id, ...data } = args;
        return prisma.comment.update({
          where: { id },
          data,
        });
      },
      deletePost: async (_, { id }) => {
        await prisma.post.delete({ where: { id } });
        return id;
      },
      createComment: async (_, args) => {
        return prisma.comment.create({
          data: {
            message: args.message,
            owner: {
              connect: { id: args.owner }, // Use 'connect' to link to an existing User
            },
            post: {
              connect: { id: args.post }, // Use 'connect' to link to an existing Post
            },
          },
        });
      },
      
      deleteComment: async (_, { id }) => {
        await prisma.comment.delete({ where: { id } });
        return id;
        
      },
      createLocation: async (_, args) => {
        return prisma.location.create({
          data: args,
        });
      },
      updateLocation: async (_, args) => {
        const { id, ...data } = args;
        return prisma.location.update({
          where: { id },
          data,
        });
      },
      deleteLocation: async (_, args) => {
        const { id } = args;
        return prisma.location.delete({
          where: { id },
        });
      },
};

module.exports = MutationResolver;
