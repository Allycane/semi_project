import pool from "../DB/connection.js";

export const getReview = async() => {
    const sql = `SELECT
                    id,
                    rating,
                    percent,
                    text
                FROM review`;
    const [rows] = await pool.execute(sql, []);
    return rows;
}