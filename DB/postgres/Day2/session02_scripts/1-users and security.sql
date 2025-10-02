-- 1-
CREATE USER yahia WITH PASSWORD '123';

-- 2-
SELECT ROLNAME FROM pg_roles;

-- 3-
GRANT USAGE ON SCHEMA hr TO yahia;
REVOKE USAGE ON SCHEMA hr FROM yahia;

-- 4- --- Try to Create table in the schema hr
GRANT CREATE ON SCHEMA hr TO yahia;
REVOKE CREATE ON SCHEMA hr FROM yahia


-- 5- --- Try to select from table hr.departments
GRANT SELECT, INSERT, UPDATE, DELETE ON hr.departments TO yahia;
REVOKE SELECT, INSERT, UPDATE, DELETE ON hr.departments FROM yahia;

-- 6- --- Try to update department_name on hr.departments only
GRANT SELECT, UPDATE(department_name) ON hr.departments TO yahia; 
REVOKE UPDATE ON hr.departments FROM yahia;


-- 7 - Dropping user
DROP User yahia;

REASSIGN OWNED BY yahia TO postgres;

DROP OWNED BY yahia;

DROP User yahia;
