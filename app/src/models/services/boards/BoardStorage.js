'use strict'

const db = require("../../../config/db");

class BoardStroage {
    static create(codeNum, board) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO boards (student_id, code_no, title, content) VALUES (?, ?, ?, ?);`;
            db.query(query, [board.student_id, codeNum, board.title, board.content], (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    }

    static findAllByCodeNum(codeName) {
        return new Promise((resolve, reject) => {
            const query = `SELECT bo.no, bo.student_id, bo.code_no, bc.name, bo.title, bo.content, bo.hit,
            date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') in_date, date_format(bo.update_date, '%Y-%m-%d %H:%i:%s') update_date
            FROM boards bo 
            join board_codes bc
            on bo.code_no = bc.no
            where bc.name = "${codeName}"
            order by no;`;

            db.query(query, (err, boards) => {
                if (err) reject(err);
                else {
                const data = [];
                for (let board of boards) {
                    const response = {
                        num: board.no,
                        studentId: board.student_id,
                        codeNum : board.code_no,
                        name : board.name,
                        title : board.title,
                        content : board.content,
                        hit : board.hit,
                        inDate : board.in_date,
                        updateDate : board.update_date
                    }
                    data.push(response);
                }
                resolve(data);
                };
            });
        });
    }

    static findByCodeNumAndNo(codeName, num) {
        return new Promise((resolve, reject) => {
            const query = `SELECT bo.no, bo.student_id, bo.code_no, bc.name, bo.title, bo.content, bo.hit,
            date_format(bo.in_date, '%Y-%m-%d %H:%i:%s') in_date, date_format(bo.update_date, '%Y-%m-%d %H:%i:%s') update_date
            FROM boards bo 
            join board_codes bc
            on bo.code_no = bc.no
            where bc.name = "${codeName}" and bo.no = "${num}"
            order by no;`;

            db.query(query, (err, boards) => {
                if (err) reject(err);
                else {
                    const [ board ] = boards;
                    const response = {
                        num: board.no,
                        studentId: board.student_id,
                        codeNum : board.code_no,
                        name : board.name,
                        title : board.title,
                        content : board.content,
                        hit : board.hit,
                        inDate : board.in_date,
                        updateDate : board.update_date
                    }
                resolve(response);
                };
            });
        });
    }

    static update(board, num) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE boards SET title = ?, content = ?, update_date = current_timestamp()
            where no = ?;`;
            db.query(query, [board.title, board.content, num], (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    }

    static delete(num) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM boards where no = ${num}`;
            db.query(query, [num], (err) => {
                if (err) reject(err);
                else resolve(true);
            });
        });
    }
}

module.exports = BoardStroage;