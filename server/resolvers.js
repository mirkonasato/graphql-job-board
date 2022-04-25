import { Company, Job } from './db.js';

export const resolvers = {
  Query: {
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
