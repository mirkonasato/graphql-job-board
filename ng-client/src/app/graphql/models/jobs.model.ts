export interface Job {
  id: string;
  title: string;
  description: string;
  company: Company;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  jobs: Array<Job>;
}
