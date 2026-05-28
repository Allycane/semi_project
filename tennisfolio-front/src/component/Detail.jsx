import { Button, Nav, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {useAuthStore} from '../../store/useAuthStore.js';

import productHot from '../data/productHot.js';
import bestbag from '../data/bestbag.js';
import besttennis from '../data/besttennis.js';
import bestracquet from '../data/bestracquet.js';
import bestwoman from '../data/bestwoman.js';
import bestman from '../data/bestman.js';
import bestacc from '../data/bestacc.js';
import bestshoes from '../data/bestshoes.js';
import review from '../data/review.js';

import { addItem } from '../util/cart.js';
import { useDispatch } from 'react-redux';

import style from '../css/Detail.module.css';

function Detail() {
  const { id } = useParams();
  const location = useLocation();
  let pathname = location.pathname.split("/")[3];
  let [multi, setMulti] = useState(bestbag);
  let [like, setLike] = useState(0);
  let thisItem = multi[Number(id)];

  let [tap, setTap] = useState(0);
  let [scrollActive, setScrollActive] = useState(false);

  function multipath() {
    switch (pathname) {
      case "bag":     return setMulti(bestbag);
      case "item":    return setMulti(besttennis);
      case "racquet": return setMulti(bestracquet);
      case "woman":   return setMulti(bestwoman);
      case "man":     return setMulti(bestman);
      case "acc":     return setMulti(bestacc);
      case "shoes":   return setMulti(bestshoes);
      default:        return setMulti(productHot);
    }
  }

  useEffect(() => {
    function scrollFixed() {
      const position = window.scrollY;
      if (window.innerWidth > 1400) {
        setScrollActive(position > 1050);
      } else {
        setScrollActive(false);
      }
    }
    window.addEventListener("scroll", scrollFixed);
    return () => window.removeEventListener("scroll", scrollFixed);
  });

  useEffect(() => {
    multipath();
    window.scrollTo(0, 0);
  }, []);

  if (!thisItem) return null;

  return (
    <div style={{ background: "#f5f6f7" }}>
      <div className="container" style={{ padding: "50px" }}>
        <div className="row">
          {/* 왼쪽 */}
          <div className="col-xl-7 col-md-12" style={{ padding: "20px" }}>
            <div className="ThumbImg">
              <div className={style.mainImg}>
                <img src={"/" + thisItem.imgUrl} alt="thumbimg" />
              </div>
              <div className={style.subImg}>
                <img src={"/" + thisItem.imgUrl} alt="subimg" />
              </div>
            </div>
          </div>
          {/* 오른쪽 */}
          <div className="col-xl-5 col-md-12" style={{ padding: "20px 50px" }}>
            <div className={style.detailTop}>
              <span className={style.brand}>{thisItem.shop}</span>
              <p className={style.product}>{thisItem.product}</p>
            </div>
            <div className={style.price}>
              <p>{thisItem.price}</p>
              <div className={style.likeBox}>
                <i className="fa-regular fa-face-smile" onClick={() => setLike(like + 1)}></i>
                <span>{like}</span>
              </div>
            </div>
            <span className={style.delivery}>무료배송</span>
            <div className={style.deliveryInfo}>
              <span>브랜사 직접배송</span><br />
              <span>제주도 정가배송/도서산간지역 정가배송</span>
            </div>
            <Price thisItem={thisItem} />
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className={`container-fluid ${scrollActive ? style.fixedLeft : ""}`} style={{ height: "92px", background: "#fff" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-9">
              <div style={{ padding: "50px 50px 0", background: "#fff" }} className="detailTab">
                <Nav variant="tabs" defaultActiveKey="link0">
                  <Nav.Item>
                    <Nav.Link onClick={() => { setTap(0); window.scrollTo(0, 1000); }} eventKey="link0">상세정보</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => { setTap(1); window.scrollTo(0, 1000); }} eventKey="link1">후기</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => { setTap(2); window.scrollTo(0, 1000); }} eventKey="link3">배송환불</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
            <div className="col-xl-3 d-none d-xl-block">
              <Price thisItem={thisItem} id={id} />
            </div>
          </div>
        </div>
      </div>

      {/* 상품 콘텐츠 */}
      <div className="container-fluid">
        <div className="container-fluid" style={{ background: "#fff" }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-9" style={{ padding: "50px" }}>
                <TabContent tap={tap} thisItem={thisItem} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Price(props) {
  let [count, setCount] = useState(1);
  let dispatch = useDispatch();
  let basket = props.thisItem;
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const userId = useAuthStore((s) => s.userId);
  const isLogin = useAuthStore((s) => s.isLogin);

  function totalPrice() {
    let total = Number(basket.price.replace(",", "")) * count;
    return total.toLocaleString();
  }

  return (
    <>
      <div className={style.detailSelect}>
        <div className={style.optionBox}>
          <div className={style.count}>
            <button className={style.leftBtn} onClick={() => count > 1 ? setCount(count - 1) : setCount(1)}>-</button>
            <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} title="totalCount" className={style.inputNum} />
            <button className={style.rightBtn} onClick={() => setCount(count + 1)}>+</button>
          </div>
          <div className={style.total}>
            <span>{totalPrice()}</span>
          </div>
        </div>
      </div>
      <div className={style.totalBox}>
        <span className={style.totalTit}>총 상품 금액</span>
        <span className={style.totalBig}>{totalPrice()}원</span>
      </div>
      <div className={style.buttonBox}>
        <Button
          variant="secondary"
          className={style.grayBtn}
          onClick={() => {
            if (!isLogin) {
              alert("로그인이 필요합니다.");
              return;
            }

            // 바로구매 로직 있으면 여기 작성
          }}
        >
          바로구매
        </Button>{' '}
        <Button
          variant="secondary"
          className={style.purpleBtn}
          onClick={() => {
            if (!isLogin) {
              alert("로그인이 필요합니다.");
              return;
            }

            setShow(true);
            addItem({
              pid: props.thisItem.id,
              size: "Free",
              qty: count,
              userId:userId
            });
          }}
        >
          장바구니
        </Button>{' '}

        <Modal show={show} onHide={handleClose} className={style.cartModal} centered>
          <Modal.Body>
            <div className={style.cartModalTit}>
              <i className="fa-solid fa-cart-shopping"></i>
              <p>{`선택하신 상품이\n 장바구니에 추가되었습니다.`}</p>
            </div>
            <div className={style.cartModalBtn}>
              <Button variant="secondary" className={style.grayBtn} onClick={handleClose}>쇼핑 계속하기</Button>
              <Button className={style.purpleBtn} onClick={() => navigate("/Cart")}>장바구니로 이동</Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

function TabContent(props) {
  return [
    <ProductInfo key={0} thisItem={props.thisItem} />,
    <Review key={1} thisItem={props.thisItem} />,
    <Delivery key={2} />
  ][props.tap];
}

function ProductInfo(props) {
  return (
    <div className={style.productInfo} style={{ padding: "50px 0 150px" }}>
      <div>
        <img src={"/" + props.thisItem.subImg} alt="productInfo" />
      </div>
      <div className={style.infoDetail}>
        <h3 className={style.title}>상품정보 제공 고시</h3>
        <table className={style.detailTable}>
          <tbody>
            <tr><th>품명 및 모델명</th><td>{props.thisItem.product}</td></tr>
            <tr><th>소재</th><td>상세페이지 참조</td></tr>
            <tr><th>색상</th><td>상세페이지 참조</td></tr>
            <tr><th>제조자</th><td>상세페이지 참조</td></tr>
            <tr><th>제조국</th><td>상세페이지 참조</td></tr>
            <tr><th>취급시 주의사항</th><td>상세페이지 참조</td></tr>
            <tr><th>품질보증기준</th><td>상세페이지 참조</td></tr>
            <tr><th>A/S 책임자와 전화번호</th><td>상세페이지 참조</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Review(props) {
  return (
    <div className={style.review} style={{ padding: "50px 0 150px" }}>
      <h3 className={style.title}>후기</h3>
      <div className={`row ${style.rating}`}>
        <div className={`col-md-6 col-sm-12 ${style.left}`}>
          <StarBig ratingTitle="별점" />
          <span className={style.ratingNow}>4.5</span>
          <span className={style.ratingTotal}>/5.0</span>
        </div>
        <div className={`col-md-6 col-sm-12 ${style.right}`}>
          <Star ratingTitle="내구성" />
          <Star ratingTitle="가격" />
          <Star ratingTitle="디자인" />
          <Star ratingTitle="배송" />
        </div>
      </div>
      <div className={`row ${style.reviewBox}`}>
        <div className="col-xl-12">
          <ul>
            <ReviewContent thisItem={props.thisItem} num={0} />
            <ReviewContent thisItem={props.thisItem} num={1} />
            <ReviewContent thisItem={props.thisItem} num={2} />
          </ul>
        </div>
      </div>
    </div>
  );
}

function StarBig(props) {
  return (
    <div className={style.starsBig}>
      <p className={style.ratingTitle}>{props.ratingTitle}</p>
      <div className={style.ratingBox}>
        <div className={style.ratingBase}><img src="/img/star_rating_base.svg" alt="starbase" /></div>
        <div className={style.ratingFill}><img src="/img/star_rating_fill.svg" alt="starfill" /></div>
      </div>
    </div>
  );
}

function Star(props) {
  return (
    <div className={style.stars}>
      <p className={style.ratingTitle}>{props.ratingTitle}</p>
      <div className={style.ratingBox}>
        <div className={style.ratingBase}><img src="/img/star_rating_base.svg" alt="starbase" /></div>
        <div className={style.ratingFill}><img src="/img/star_rating_fill.svg" alt="starfill" /></div>
      </div>
    </div>
  );
}

function ReviewContent(props) {
  let [count, setCount] = useState(0);
  let [reviewData] = useState(review);
  return (
    <li className={style.reviewContent}>
      <div className={style.reviewLeft}>
        <div className={style.imgbox}><img src="/img/profile_basic.svg" alt="profile" /></div>
      </div>
      <div className={style.reviewRight}>
        <p className={style.product}>{props.thisItem.product}</p>
        <p className={style.option}>옵션1</p>
        <div className={style.ratingBox}>
          <div className={style.ratingBase}><img src="/img/star_rating_base.svg" alt="starbase" /></div>
          <div className={style.ratingFill} style={{ width: reviewData[props.num].percent }}>
            <img src="/img/star_rating_fill.svg" alt="starfill" />
          </div>
          <span>{reviewData[props.num].rating}</span>
        </div>
        <p className={style.content}>{reviewData[props.num].text}</p>
        <div className={style.btnbox}>
          <div className={style.thankBtn} onClick={() => setCount(count + 1)}>
            <i className="fa-solid fa-thumbs-up"></i>
            <span>감사요</span><span>{count}</span>
          </div>
          <div className={style.reportBtn}><span>신고하기</span></div>
          <div className={style.data}><span>{reviewData[props.num].date}</span></div>
        </div>
      </div>
    </li>
  );
}

function Delivery() {
  return (
    <div className={style.deliveryDetail} style={{ padding: "50px 0 150px" }}>
      <h3 className={style.title}>상품정보 제공 고시</h3>
      <table className={style.detailTable}>
        <tbody>
          <tr><th>배송</th><td>브랜드사 직접배송</td></tr>
          <tr><th>배송비</th><td>무료</td></tr>
          <tr><th>제주도/도서산간지역</th><td>제주도: 5,500원 / 도서 산간지역:5,500원</td></tr>
          <tr><th>배송불가지역</th><td>배송 불가 지역이 없습니다.</td></tr>
          <tr><th>배송기간</th><td>평일기준 3-5일 소요</td></tr>
        </tbody>
      </table>
      <div className={style.changeDetail}>
        <h3 className={style.title}>반품/교환</h3>
        <table className={style.detailTable}>
          <tbody>
            <tr><th>반품배송비</th><td>반품비용 : 5,000 원</td></tr>
            <tr><th>교환 배송비</th><td>교환비용 : 5,000 원</td></tr>
            <tr><th>보내실 곳</th><td>(12950) 경기 하남시 대청로 9 7층 L7119호</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Detail;
