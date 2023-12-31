const mysql = require('mysql');
const dotenv = require('dotenv');
const e = require('express');
let instance = null;
dotenv.config();
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT

})
connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    // console.log('db ' + connection.state)
})
class Dbservice {
    static getDbServiceInstance() {
        return instance ? instance : new Dbservice();
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";
                connection.query(query, (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(results)

                })
            })
            console.log(response)
            return response;
        }
        catch (err) {
            console.log(err)
        }
    }
    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name,date_added) VALUES(?,?);";
                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(result.insertId)

                })
            })
            console.log(insertId)
            return {
                id: insertId,
                name: name,
                dateAdded: dateAdded
            }

        } catch (error) {
            console.log(error)
        }
    }
    async deleteRowById(id) {
        try {
            id = parseInt(id, 10)
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id=?";
                connection.query(query, [id], (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows)

                })

            })
            return response === 1 ? true : false
        } catch (error) {
            console.log(error)
            return false
        }

    }
    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10)
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";
                connection.query(query, [name, id], (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows)

                })
                return 1;

            })

            console.log(response);
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async searchByName(name) {
        try {
            console.log(name)
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ?;";
                connection.query(query, [name], (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(results)

                })
            })
            console.log(response)
            return response;
        }
        catch (err) {
            console.log(err)
        }
    }
}
module.exports = Dbservice
