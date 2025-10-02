-- 1. Write a Query that get the date of the Third day in the next month Print it in format like 14-december-2020, Saturday
SELECT 
  to_char(
    date_trunc('month', now()) + interval '1 month' + interval '2 days',
    'DD-FMMonth-YYYY, Day'
  ) AS "Third Day of Next Month";

-- 2. Write a Query that get the last day date of the current month from today Print it in format like 14-december-2020, Saturday
SELECT 
  to_char(
    date_trunc('month', now()) + interval '1 month' - interval '1 day',
    'DD-FMMonth-YYYY, Day'
  ) AS "Last Day of Current Month";

-- 3. Display the employee's name, hire date and salary review date, The salary review date is the day after six months and Five days of service. Label the column Review. Format the dates to appear in the format similar to "Sunday, the 7th of September, 1981 ".
SELECT 
  first_name || ' ' || last_name AS employee_name,
  hire_date,
  to_char(
    hire_date + interval '6 months' + interval '5 days',
    'Day, "the" DDth "of" FMMonth, YYYY'
  ) AS "Review"
FROM employees;

-- 4. Write a query that will display the difference between the highest and lowest salaries in each department.
SELECT 
  department_id,
  max(salary) - min(salary) AS salary_difference
FROM employees
GROUP BY department_id;

-- 5. write a query that will display the city, department name, number of employees and the average salary for all employee in that department, round the average salary to two decimal places.
SELECT 
  l.city,
  d.department_name,
  count(e.employee_id) AS number_of_employees,
  round(avg(e.salary), 2) AS average_salary
FROM departments d
JOIN locations l ON d.location_id = l.location_id
JOIN employees e ON d.department_id = e.department_id
GROUP BY l.city, d.department_name;

-- 6. Display the employee number, name and salary for all employees who earn more than the average salary in his department 
SELECT 
  e.employee_id,
  e.first_name || ' ' || e.last_name AS employee_name,
  e.salary,
  e.department_id
FROM employees e
WHERE e.salary > (
  SELECT avg(salary)
  FROM employees
  WHERE department_id = e.department_id
)
ORDER BY e.department_id, e.salary DESC;

-- 7. Show Employees data Whose Salary is Higher Than Their Manager's and show Manager name, salary ( use sub query not join )
SELECT 
  e.employee_id,
  e.first_name || ' ' || e.last_name AS employee_name,
  e.salary AS employee_salary,
  (SELECT first_name || ' ' || last_name FROM employees WHERE employee_id = e.manager_id) AS manager_name,
  (SELECT salary FROM employees WHERE employee_id = e.manager_id) AS manager_salary
FROM employees e
WHERE e.manager_id IS NOT NULL
  AND e.salary > (SELECT salary FROM employees WHERE employee_id = e.manager_id)
ORDER BY e.salary DESC;

-- 8. Show Employees data Who Earn the Lowest Salary in Their Department ( use subquery not join )
SELECT 
  employee_id,
  first_name || ' ' || last_name AS employee_name,
  salary,
  department_id
FROM employees e
WHERE salary = (
  SELECT min(salary)
  FROM employees
  WHERE department_id = e.department_id
)
AND department_id IS NOT NULL
ORDER BY department_id;

-- 9. Find employees who have been hired earlier than anyone else in the same job (use subquery not join )
SELECT 
  employee_id,
  first_name || ' ' || last_name AS employee_name,
  hire_date,
  job_id
FROM employees e
WHERE hire_date = (
  SELECT min(hire_date)
  FROM employees
  WHERE job_id = e.job_id
)
ORDER BY job_id, hire_date;
