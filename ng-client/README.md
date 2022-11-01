# NgClient

This is a simple application for learning how to integrate apollo client into an angular project.
For the official documentation please check: 
  - https://www.the-guild.dev/graphql/apollo-angular/docs
  - https://www.apollographql.com/docs/react/

# Dependencies

-  apollo client (enables graph ql)
-  apollo angular (facilitates graph ql with Angular cmd )

# Content
- GraphQLModule - graph ql configuration ex: url, memory cache, options (error handling).
- all-queries: 
  - queries can be defined in sandbox and wrapped with gql template literal ( parses query strings into gql syntax tree) 
  - fragments: reusable queries ( the syntax spread operator enables eslint-plugin-graphql analysis)
- home: use query, polling option, login method (that is not gql)
- job detail: example of querying with params
- create job: example of how to pass in the context
- login: example of how to call a normal method that does not use graph ql
