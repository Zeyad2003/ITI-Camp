DO $$
DECLARE
    username TEXT := 'yahia';
    rec RECORD;
BEGIN
    -- SCHEMA PRIVILEGES
    RAISE NOTICE '🔹 SCHEMA PRIVILEGES:';
    FOR rec IN
        SELECT n.nspname AS schema_name,
               p.privilege_type
        FROM pg_namespace n,
             unnest(array['USAGE', 'CREATE']) AS p(privilege_type)
        WHERE has_schema_privilege(username, n.nspname, p.privilege_type)
    LOOP
        RAISE INFO 'Schema: %, Privilege: %', rec.schema_name, rec.privilege_type;
    END LOOP;

    -- TABLE PRIVILEGES
    RAISE NOTICE '🔹 TABLE PRIVILEGES:';
    FOR rec IN
        SELECT table_schema, table_name, privilege_type
        FROM information_schema.role_table_grants
        WHERE grantee = username
    LOOP
        RAISE INFO 'Table: %.%, Privilege: %', rec.table_schema, rec.table_name, rec.privilege_type;
    END LOOP;

    -- COLUMN PRIVILEGES (e.g. UPDATE on specific columns)
    RAISE NOTICE '🔹 COLUMN PRIVILEGES:';
    FOR rec IN
        SELECT table_schema, table_name, column_name, privilege_type
        FROM information_schema.column_privileges
        WHERE grantee = username
          AND privilege_type = 'UPDATE'
    LOOP
        RAISE INFO 'Table: %.%, Column: %, Privilege: %',
            rec.table_schema, rec.table_name, rec.column_name, rec.privilege_type;
    END LOOP;

    -- SEQUENCE PRIVILEGES
    RAISE NOTICE '🔹 SEQUENCE PRIVILEGES:';
    FOR rec IN
        SELECT n.nspname AS sequence_schema,
               c.relname AS sequence_name,
               p.priv
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace,
             unnest(array['USAGE','SELECT','UPDATE']) AS p(priv)
        WHERE c.relkind = 'S'
          AND has_sequence_privilege(username, n.nspname || '.' || c.relname, p.priv)
    LOOP
        RAISE INFO 'Sequence: %.%, Privilege: %', rec.sequence_schema, rec.sequence_name, rec.priv;
    END LOOP;

    -- DATABASE PRIVILEGES (current DB only)
    RAISE NOTICE '🔹 DATABASE PRIVILEGES (CURRENT DB):';
    FOR rec IN
        SELECT unnest(datacl) AS acl
        FROM pg_database
        WHERE datname = current_database()
          AND datacl IS NOT NULL
    LOOP
        IF rec.acl LIKE username || '=%' THEN
            RAISE INFO 'Database ACL: %', rec.acl;
        END IF;
    END LOOP;

    -- ROLE MEMBERSHIPS
    RAISE NOTICE '🔹 ROLE MEMBERSHIPS:';
    FOR rec IN
        SELECT roleid::regrole AS role
        FROM pg_auth_members
        WHERE member = username::regrole
    LOOP
        RAISE INFO 'Member of Role: %', rec.role;
    END LOOP;
END
$$;
