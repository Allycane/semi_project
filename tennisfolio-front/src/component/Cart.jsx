import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, decreaseCount, deleteItem } from './store.js';
import { Link } from 'react-router-dom';
import style from '../css/Cart.module.css';

function Cart() {
  let state = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  let category = "";
  let index = 0;

  const totalArr = state.map((item) => item.price * item.count);
  let totalPrice = 0;
  totalArr.forEach((item) => { totalPrice += item; });

  let sign = { margin: "0 10px", fontWeight: "700", fontSize: "15px", color: "#888" };

  return (
    <div className="container-fluid" style={{ background: "#f5f6f7" }}>
      <div className="container" style={{ padding: "100px 0" }}>
        <div className="row d-flex justify-content-evenly">
          {/* 장바구니 */}
          <div className={`col-xl-7 col-12 ${style.cartbox}`}>
            <Table className="cartList">
              <tbody>
                {state.map((item, i) => {
                  let total = item.price * item.count;

                  if (item.imgUrl.indexOf("hot") > -1) {
                    category = "/detail/hot/"; index = item.id;
                  } else if (item.imgUrl.indexOf("bag") > -1) {
                    category = "/detail/best/bag/"; index = item.id - 8;
                  } else if (item.imgUrl.indexOf("tennis") > -1) {
                    category = "/detail/best/item/"; index = item.id - 18;
                  } else if (item.imgUrl.indexOf("racquet") > -1) {
                    category = "/detail/best/racquet/"; index = item.id - 24;
                  } else if (item.imgUrl.indexOf("woman") > -1) {
                    category = "/detail/best/woman/"; index = item.id - 27;
                  } else if (item.imgUrl.indexOf("man") > -1) {
                    category = "/detail/best/man/"; index = item.id - 37;
                  } else if (item.imgUrl.indexOf("acc") > -1) {
                    category = "/detail/best/acc/"; index = item.id - 47;
                  } else if (item.imgUrl.indexOf("shoes") > -1) {
                    category = "/detail/best/shoes/"; index = item.id - 57;
                  }

                  return (
                    <tr key={i}>
                      <td className={style.imgbox}>
                        <Link to={`${category}${index}`}>
                          <img src={`img/${item.imgUrl}`} alt="img" />
                        </Link>
                      </td>
                      <td className={style.optionbox}>
                        <div className={style.titlebox}>
                          <p className={style.product}>{item.product}</p>
                        </div>
                        <div className={style.btnbox}>
                          <div className={style.countBtn}>
                            <button onClick={() => dispatch(decreaseCount(item.id))} className={style.minus}>-</button>
                            <input type="number" value={item.count} readOnly className={style.inputNum} />
                            <button onClick={() => dispatch(addCount(item.id))} className={style.plus}>+</button>
                          </div>
                          <div className={style.price}>
                            <div className={style.priceWrap}>
                              <p className={style.total}>{total.toLocaleString()}</p>
                              <span className={style.won}>원</span>
                            </div>
                            <button onClick={() => dispatch(deleteItem(item.id))} className={style.delete}>X</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className={style.totalBoxMain}>
              <span>총 상품 금액 <span className={style.bold}>{totalPrice.toLocaleString()}</span>원</span>
              <span style={sign}>+</span>
              <span>배송비 <span className={style.bold}>0</span>원</span>
              <span style={sign}>=</span>
              <span>총 주문 금액 <span className={style.highlight}>{totalPrice.toLocaleString()}</span>원</span>
            </div>
          </div>
          {/* 결제요청 */}
          <div className="col-xl-4 col-12">
            <div className={style.totalBox}>
              <p style={{ fontWeight: "500", fontSize: "17px" }}>결제요청</p>
              <div className={style.order}>
                <div><p>주문건수</p><span>{state.length} 개</span></div>
                <div><p>주문금액</p><span>{`${totalPrice.toLocaleString()} 원`}</span></div>
                <div><p>배송비</p><span>0 원</span></div>
              </div>
              <div className={style.totalPrice}>
                <p>총 결제 금액</p>
                <span>{`${totalPrice.toLocaleString()} 원`}</span>
              </div>
            </div>
            <Button className={`btn btn-primary ${style.buyBtn}`}>결제하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
