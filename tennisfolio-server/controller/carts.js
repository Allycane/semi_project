let carts = [];

const addToCart = (req, res) => {
  const { pid, size, qty, userId } = req.body;
  const newCartItem = {
    id: Date.now(),
    pid,
    size,
    qty,
    userId
  };

  carts.push(newCartItem);

  console.log("현재 장바구니:", carts);

  res.json({
    message: "장바구니에 추가되었습니다.",
    cartItem: newCartItem,
    carts
  });
};

export default { addToCart };