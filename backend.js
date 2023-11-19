const oracledb = require('oracledb');
async function runApp() {
    let connection;
    try {
        connection = await oracledb.getConnection({ user: "r2abdi", password: "Kirby4417", connectionString: "oracle.scs.ryerson.ca:1521/orcl"});
        console.log("Successfully connected to Oracle Database");


        await rs.close();
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
runApp();