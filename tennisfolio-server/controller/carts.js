import * as repository from "../repository/carts.js";

export const addToCart = async (req, res) => {
    const { pid, size, qty, userId } = req.body;

    const cartItem = await repository.getCartItem({ pid, size, userId });

    if (cartItem) {
      await repository.updateCartQty({
        cid: cartItem.cid,
        qty
      });

      return res.json({
        message: "장바구니 수량이 증가되었습니다.",
        type: "update"
      });
    }
    const result = await repository.addCartItem({ pid, size, qty, userId });

    res.json({
      message: "장바구니에 추가되었습니다.",
      type: "insert",
      insertId: result.insertId
    });
  
};

export const getCartItems = async (req, res) => {
  const result=await repository.getCartItems(req.query.userId);
  res.json(result);
};
