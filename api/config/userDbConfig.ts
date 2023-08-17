import { Pool, PoolClient } from 'pg';

function userBDConnect(): Pool {
    //creating a client/instance
    const pool = new Pool({
        connectionString: 'postgresql://myuser:mypassword@localhost:5432',
    });
    //check if users table exists
    pool.query(
        `
SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = $1
  )
`,
        ['users'],
        (err, results) => {
            if (err) throw err;
            console.log(results);
            console.log(results.rows[0].exists + 'hererrere');
            if (!results.rows[0].exists) {
                pool.query(
                    `
        CREATE TABLE users (
            id SERIAL,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
         password VARCHAR(100) NOT NULL
        )`,
                    (err, data) => {
                        console.log(err, data);
                        // pool.end();
                    }
                );
            }
        }
    );

    return pool;
}
export default userBDConnect;
