const mysql = require('mysql2/promise');

async function fetchDataFromDatabase() {
  // Create a MySQL connection
  const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'findmate',
        port: 3306
    }
)

  try {
    // Execute a sample SQL query
    const [rows] = await connection.execute('SELECT * FROM your_table');

    // Convert the query results to JSON
    const jsonData = JSON.stringify(rows);

    // Log or use the JSON data as needed
    console.log(jsonData);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
  } finally {
    // Close the database connection
    await connection.end();
  }
}

// Call the function to fetch and convert data
module.exports = fetchDataFromDatabase;