/**
 * cartItem 추가
 */
export const getCartItemAdd = async(cartItem) => {
    const { pid, size, qty, userId } = cartItem;
    const sql = `
        insert into cart(size, qty, pid, id, cdate)
            values(?, ?, ?, ?, now())
    `;
    const [rows] = await pool.execute(sql, [size, qty, pid, userId]);
    return rows;
}