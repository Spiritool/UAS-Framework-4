const connection = require('../config/database.js');

class Model_Users {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users ORDER BY id_users DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', Data , (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }); 
        }); 
    }
    
    static async Login(email) {
        return new Promise((resolve, reject) => {
            let isi = connection.query(`select * from users where email = ? `, [email], function(err, result){
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                    console.log(email, result);
                }
            })
        })
    }
            
    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id_users = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET ? WHERE id_users = ?', [Data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id_users = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Users;
