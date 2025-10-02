set search_path = hr;

-- ## Correlated Sub Query 
-- Example : Find Employees data along with their average salary of their department
--       Then Filter Employees to show only employees take salary > avg sal of their dept
select employee_id, last_name, salary, department_id, 
		(select avg(salary) from employees where department_id = outer_emps.department_id) 
from employees outer_emps
where salary > 
	(select avg(salary) from employees where department_id = outer_emps.department_id);

-- Example : Show Departments data along with count employees in this department 
--          filter departments to show only which have More than or Equal 5 Employees
select department_id, department_name, manager_id, location_id,
		(select count(*) from employees where department_id = departments.department_id) 
from departments
where (select count(*) from employees where department_id = departments.department_id) >= 5;

---------------------------------------------------
-- Limit, Offset
----------------------------------------------------

SELECT * FROM employees
order by employee_id asc
LIMIT 5;


SELECT * FROM employees
order by employee_id asc
LIMIT 5
OFFSET 2;	-- shift 2 = skip 2

-- Find the first 3 employees with the highest salary
select *
from employees
order by coalesce(salary, 0) desc
limit 3;

-- Find the 3rd highest employee with salaryselect *
from employees
order by coalesce(salary, 0) desc
offset 2
limit 1;

---------------------- sql functions ----------------------------------
-- 1- single row functions    upper   |   	2-   aggregate functions [multi rows functions ]  sum
--+++++ 1- single row functions  ++++++++
-- 1- Character Functions   :   upper lower, substr, length, position, trim, replace
-- 2- Number Functions    ;   round, trunc, mod
-- 3- Date Functions      :   now(), age(), 
-- 4- Conversion Functions : to_char(), to_date()		14-5-2022		7500		7,500.00 
-- 5- General Functions 	: Coalesce()
--++++++++++++++++++++++++++++
 -- 1- Character Functions   

select employee_id, last_name, upper(last_name), lower(last_name),
        length(last_name), substr(last_name, 2, 3),  substr(last_name, 2),
		position('n' in last_name)
from employees;


-- example : extract username and domain name from emails
update employees
set email = 'yahia.momtaz@msn.com'
where employee_id = 105;

update employees
set email = 'ola.aly@gmail.com'
where employee_id = 106;

select * from employees order by employee_id asc;


select employee_id, email,
        substr(email, 1, position('@' in email) - 1) as user_name,
        substr(email, position('@' in email) + 1) as domain_name
from employees
where employee_id in (105, 106);


-- How to use ( replace function )
update employees
set last_name = 'yahia_momtaz'
where employee_id = 105;

select * from employees order by employee_id asc;

select employee_id, last_name, replace(last_name, '_', ' ')
from employees
where employee_id = 105;


update employees
set last_name = replace(last_name, '_',' ')
where employee_id = 105;


-- How to use ( trim function )
update employees
set last_name = '  yahia momtaz   '
where employee_id = 105;

select * from employees order by employee_id asc;

select *
from employees
where trim(last_name) = 'yahia momtaz';


update employees
set last_name = trim(last_name)
where employee_id = 105;

select *
from employees
where last_name = 'yahia momtaz';

select first_name, trim('N' From first_name)
from employees;


--######### ------------------------------- 2 Number functions :
---- ## [  round, trunc, Mod ]

-- round, trunc functions
/*round [ 2 ]
15342.7873453454 => 15342.79
15342.7823453454 => 15342.78
round [ 0 ]
15342.7823453454 => 15343
--------------------
trunc [ 2 ] 
15342.7873453454 => 15342.78
15342.7823453454 => 15342.78
trunc [ 0 ] 
15342.7823453454 => 15342
*/

ALTER TABLE employees
ALTER COLUMN salary TYPE NUMERIC(9, 3);

update employees
set salary = 15342.787
where employee_id = 105;

update employees
set salary = 15342.782
where employee_id = 106;

select * from employees where employee_id in (105, 106);

select employee_id, last_name, salary,
        round(salary, 2), round(salary, 0), round(salary),
        trunc(salary, 2), trunc(salary, 0), trunc(salary)        
from employees
where employee_id in (105, 106);

--- Mod Function, Modulos,  Remainder 
select 6 / 2, Mod(6, 2);

select 7.0 / 2, Mod(7, 2), Mod(419, 3), mod(6234237, 10);

-- example : 140 seconds -   how many mintues - how many remaining seconds ?
select 140 / 60 as minutes, mod(140, 60) as remaning_seconds;

-- example : 15 Months - how many years ? how many remaining months  ?
select trunc(15 /12) as years, mod(15, 12) as remaining_months;

------------------------------------ 
--- Date Functions | Conversion functions 
-------------------
-- 1. sysdate function ( Date functions )
select now();

SHOW timezone;

SET timezone = 'Africa/Cairo';


--- Control formatting dates _ Convert date to character using 
-- 1. to_char( ) function : converstion function
-- date
select  to_char(now(), 'dd-mm-yyyy'),
	    to_char(now(), 'd dd ddd Mon Month w ww yy yyyy'),
        to_char(now(), 'dd ddth "of" Month, yyyy'),
        to_char(now(), 'Dy Day');

-- timing
select to_char(now(), 'HH24:mi:ss'), to_char(now(), 'HH12:mi:ss am');

-- apply on table employees
select employee_id, last_name, hire_date,
        to_char(hire_date, 'dd-FMMonth-yyyy') as hire_date_formatted
from employees;

--- example : get employee data hired on '21/09/1989'   = char in date style                  
-- 2. to_date : conversion function | convert from char to date 
select *
from employees
where hire_date = to_date('21/09/1989', 'dd/mm/yyyy'); -- '1989-09-21'

-- example. Mahmoud  birthday   25-05-2002   |  Saturday  					
select to_char( to_date('25-05-2002', 'dd-mm-yyyy') , 'Day')



-- example : find all employees hired on  1989
select *
from employees
where to_char(hire_date, 'mm-yyyy') = '09-1989'; 


------------------------------------------------------------------------
-- Date Functions 
-- 1. now() Function
-- 2. 3. Age(), Extract()  date functions

SELECT employee_id, 
       last_name, 
       hire_date, 
	   age(Now(), hire_date),
	   Extract('Year' From now()),
       Extract('Year' From AGE(NOW(), hire_date)) AS years_between, 
       Extract('Month' From AGE(NOW(), hire_date)) AS remaining_months,
	   Extract('Day' From AGE(NOW(), hire_date)) AS remaining_days
FROM employees;


-- 4.  date arithemtic INTERVAL keyword :	 5. DATE_TRUNC() date function
SELECT NOW() + INTERVAL '5 days' AS inc_5days, 
       NOW() + INTERVAL '6 months' AS inc_6months,
	   NOW() + INTERVAL '2 years' AS inc_2years,
	   Now() + INTERVAL '1 month - 1 day' AS inc_1month_decr_1day,
	   DATE_TRUNC('month', NOW()) AS first_day_of_current_month,
	   DATE_TRUNC('month', NOW()) + INTERVAL '1 month' AS first_day_of_next_month;

----------------------------------------

________________________
-- Windows functions 
-- rank() vs dense_rank() vs row_number vs partition_by

SELECT last_name, salary, RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees
where salary is not null;

SELECT last_name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees
where salary is not null;

SELECT last_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank
FROM employees
where salary is not null;



SELECT last_name, department_id, salary,
       dense_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank
FROM employees
where salary is not null;




-- Format Numbers
SELECT employee_id, last_name, salary, 
      trim( TO_CHAR(salary + 500, '999,999,999.99') )  || ' EGP' AS formatted_salary
FROM employees;

