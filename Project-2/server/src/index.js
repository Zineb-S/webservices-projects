const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const CommentResolver = require('./resolvers/Comment');
const UserResolver = require('./resolvers/User');
const TagResolver = require('./resolvers/Tag');
const PostResolver = require('./resolvers/Post');
const LocationResolver = require('./resolvers/Location');
const QueryResolver = require('./resolvers/Query');
const MutationResolver = require('./resolvers/Mutation');
const prisma = new PrismaClient();

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8'
  ); 

const resolvers = {
  Comment: CommentResolver,
  User: UserResolver,
  Tag: TagResolver,
  Post: PostResolver,
  Location: LocationResolver,
  Query: QueryResolver,
  Mutation: MutationResolver,
 
  

  
    
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

server
  .listen()
  .then(({ url }) => console.log(`Server is running on ${url}`));