-- 1. Display the last name concatenated with the job id, separated by a comma and space and name the column [Employee and Title] as alias
SELECT CONCAT(last_name, ', ', job_id) AS "Employee and Title"
FROM employees;

-- 2. Display the last name and salary for all employees whose salary is not in the range of $1500 and $7000.
SELECT last_name, salary
FROM employees
WHERE
    salary < 1500
    OR salary > 7000;

-- 3. Display the last name, salary and commission for all employees who earn commissions, Sort data in descending order of salary and commissions
SELECT last_name, salary, commission_pct
FROM employees
WHERE commission_pct IS NOT NULL
ORDER BY salary DESC, commission_pct DESC;

-- 4. Display the last name, job id and salary for all employees whose job id is SA_REP or PU_MAN and their salary is not equal to $9500, $9000 or $8000
SELECT last_name, job_id, salary
FROM employees
WHERE (job_id = 'SA_REP' OR job_id = 'PU_MAN')
AND salary NOT IN (9500, 9000, 8000);

-- 5. Display all information about employees whose last name begin with letter 'S’ or letter ‘s’
SELECT *
FROM employees
WHERE last_name ILIKE 'S%';

-- 6. Display all employees whose first name contains letter before last ‘e’ or ‘E’
SELECT *
FROM employees
WHERE first_name ILIKE '%e_';

