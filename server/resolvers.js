import { nanoid } from 'nanoid';
import { db } from './db.js';

function rejectIf(condition) {
  if (condition) {
    throw new Error('Unauthorized');
  }
}

export const resolvers = {
  Query: {
    company: async (_root, { id }) => {
      return await db.select().from('companies').where('id', id).first();
    },
    job: async (_root, { id }) => {
      return await db.select().from('jobs').where('id', id).first();
    },
    jobs: async () => {
      return await db.select().from('jobs');
    },
  },

  Mutation: {
    createJob: async (_root, { input }, { user }) => {
      rejectIf(!user);
      const job = {
        id: nanoid(),
        companyId: user.companyId,
        ...input,
      };
      await db.insert(job).into('jobs');
      return job;
    },
  },

  Company: {
    jobs: async (company) => {
      return await db.select().from('jobs').where('companyId', company.id);
    },
  },

  Job: {
    company: async (job, _args, { companyLoader }) => {
      return await companyLoader.load(job.companyId);
    },
  },
};
