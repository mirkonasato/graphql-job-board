CREATE TABLE companies (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE jobs (
  id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  companyId TEXT NOT NULL REFERENCES companies (id),
  description TEXT
);

CREATE TABLE users (
  id TEXT NOT NULL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  companyId TEXT NOT NULL REFERENCES companies (id)
);

INSERT INTO companies (id, name, description) VALUES
  ('pVbRRBQtMVw6lUAkj1k43', 'Facegle', 'We are a startup on a mission to disrupt social search engines. Think Facebook meet Google.'),
  ('wvdB54Gqbdp_NZTXK9Tue', 'Goobook', 'We are a startup on a mission to disrupt search social media. Think Google meet Facebook.');

INSERT INTO jobs (id, title, companyId, description) VALUES
  ('soP9m8MdKeQX_ZXZOCSaL', 'Frontend Developer', 'pVbRRBQtMVw6lUAkj1k43', 'We are looking for a Frontend Developer familiar with React.'),
  ('yX71WsWqBRAFuMAIDj4W0', 'Full-Stack Developer', 'wvdB54Gqbdp_NZTXK9Tue', 'We are looking for a Full-Stack Developer familiar with Node.js, Express, and React.'),
  ('ujXXXjSBmd0o9NJXMZDdT', 'Senior DevOps Engineer', 'pVbRRBQtMVw6lUAkj1k43', 'We need somebody to restart the servers when they fall over.'),
  ('4diUGe8AmGDijRhHhaiNm', 'QA Tester', 'wvdB54Gqbdp_NZTXK9Tue', 'You must be good at finding bugs.'),
  ('Tmo63zELubKbjxWZ9wD2T', 'Product Owner', 'wvdB54Gqbdp_NZTXK9Tue', 'You need to give the developers something to do otherwise they get bored.');

INSERT INTO users (id, email, password, companyId) VALUES
  ('uogQAZnLcAlT6lMuNbpQg', 'alice@facegle.io', 'alice123', 'pVbRRBQtMVw6lUAkj1k43'),
  ('i0Nn6qvicHP5DTuKTyaq0', 'bob@goobook.co', 'bob123', 'wvdB54Gqbdp_NZTXK9Tue');
