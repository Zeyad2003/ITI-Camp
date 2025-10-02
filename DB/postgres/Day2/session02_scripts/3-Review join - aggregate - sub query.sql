set search_path = hr;


------------ ### Aggregate Functions --------- Sum, Max, Min, Count, Avg ----------------
select sum(salary), max(salary), min(salary), count(*)
from employees;

select sum(salary), max(salary), min(salary), count(*)
from employees
where department_id = 30;

/* Donot use a column beside aggregate functions 
select sum(salary), max(salary), min(salary), count(*), last_name
from employees;
*/

-- example : show sum of salaries per each department 
-- filter : remove null depts || show only sum(salary) >= 20000
select department_id, sum(salary), count(*) -- 5
from employees -- 1
where department_id is not null  -- 2
group by department_id   -- 3
Having sum(salary) >= 20000 -- 4
order by department_id asc;    -- 6

-- avg salary
select avg(coalesce(salary, 0)), sum(salary) / count(*)
from employees;

----------------------------  Join Between Tables --------------------

/*
1- inner join
2- outer join 
3- self join
*/

---- 1. inner join 
-- [1st syntax : 2 tables ]
select employee_id, last_name, salary, departments.department_id, department_name
from employees, departments
where employees.department_id = departments.department_id; --- join condition  
 

-- [ 2nd syntax : 2 tables ] 
select employee_id, last_name, salary, departments.department_id, department_name
from employees inner join departments
on employees.department_id = departments.department_id; --- join condition

-- [1st syntax : 3 tables ]
select employee_id, last_name, salary, departments.department_id, department_name, departments.location_id, city
from employees, departments, locations
where employees.department_id = departments.department_id --- join condition
and departments.location_id = locations.location_id; -- join condition 

-- [ 2nd syntax : 3 tables ] 
select employee_id, last_name, salary, departments.department_id, department_name,
    departments.location_id, city
from employees inner join departments
on employees.department_id = departments.department_id --- join condition
inner join locations 
on departments.location_id = locations.location_id; -- join condition




--- 2- Outer Join [ left, right, full ] 
select employee_id, last_name, salary, departments.department_id, department_name
from employees Left outer join departments
on employees.department_id = departments.department_id;



---- 3. Self Join [ recursive ] { F.k and p.k in the same table }
-- example : show employees data name, salary || beside his manager data name, salary 
select emps.first_name as emp_name, emps.salary as emp_salary,
         mgrs.first_name as mgr_name, mgrs.salary as mgr_salary
from employees emps, employees mgrs
where emps.manager_id = mgrs.employee_id; -- join condition
/*
    Emps        Mgrs
    1               1
    M(FK)        1
*/

-- self join with outer join
select emps.last_name as emp_name, emps.salary as emp_salary,
        mgrs.last_name as mgr_name, mgrs.salary as mgr_salary
from employees emps left outer join employees mgrs
on emps.manager_id = mgrs.employee_id;


------------------------------ Sub Queries -----------------------------

-- Single Rows Subquery   =     >     <     >=     <=    !=   
-- example : get all employees data works in dept = ( same dept like employee no 115 )
select *
from employees
where department_id = (select department_id from employees where employee_id = 115);


-- example : get the employee data with the max salary within all employees
select *
from employees
where salary = ( select max(salary) from employees );


-- Multi Rows Subquery              In
-- example : get all departments which have employees
select *
from departments
where department_id  in (select department_id from employees );


-- example : get all departments which have NO employees,  != ALL  [ Take care sub query doesn't return null ]
select *
from departments
where department_id Not in ( select department_id from employees where department_id is not null);

