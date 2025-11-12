## LAB 1 (ORM 1)
- Select any of these datasets from Kaggle (Northwind Traders Dataset, Movie Lens Small Latest Dataset) , download it ,design proper database schema (achieves modelling , relationships , constraints)

- Build Django models for the designed schema, then load data to the database

- Run Query to retrieve all data , then print related key field for each of returned records observe N+1 query analysis (queries and queries count) from any of monitoring tools

- Enhance above query using ‘select_related’ and analyze difference.

- Apply ‘prefetch_related’ if you have many to many relationships.


## LAB 2 (ORM 2)
- Build dynamic filter query using Q() expression.

- Update any field values directly in SQL using F() expression.

- Select specific fields using only() and defer() methods.

- Retrieve data as dict using proper ORM method for this.

- Retrieve data as tuple using proper ORM method for this.

- Apply index on proper fields in your models

- Select n values from both indexed and non indexed column, monitor their performance and compare it.

- Change conn max age and observe the changes.

## LAB 3 (mONITORING & Profiling)
- Configure Django debug toolbar, Silk and cProfile into your Django project.

-Select any of your apps views contains ORM Queries / Functions / any code with room for optimization , monitor & profile it using above 3 tools.

- Analyze important profiling data (functions timing, queries count & timing, request info, render time, longest & heaviest requests)

- Bonus: Detect any bottleneck/low performance query, enhance it and re analyze the monitoring and report it.
