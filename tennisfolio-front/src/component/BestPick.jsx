import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useState } from 'react';

import Products from './Products.jsx';
import bestdata from '../data/bestdata.js';
import bestbag from '../data/bestbag.js';
import besttennis from '../data/besttennis.js';
import bestracquet from '../data/bestracquet.js';
import bestwoman from '../data/bestwoman.js';
import bestman from '../data/bestman.js';
import bestacc from '../data/bestacc.js';
import bestshoes from '../data/bestshoes.js';

function BestPick() {
  // useState를 활용해 tennisCategory 라는 이름의 배열객체를 DB와 연동
  // datafetch.js 파일 생성 후 get, post, put, delete 등의 fetch 혹은 axios 함수 생성 및 임포트

  let [tennisCategory] = useState(bestdata);
  let [view, setView] = useState(0);

  function MultiPage() {
    switch (view) {
      case 0: return <TennisBagBox />;
      case 1: return <TennisItemBox />;
      case 2: return <TennisRacquetBox />;
      case 3: return <TennisWomanBox />;
      case 4: return <TennisManBox />;
      case 5: return <TennisAccBox />;
      case 6: return <TennisShoesBox />;
      default: return null;
    }
  }

  return (
    <div className="container bestItem" style={{ margin: "150px auto 150px", maxWidth: "1600px" }}>
      <div className="categoryMore">
        <h3>카테고리별 인기 아이템</h3>
        <p className="more"><a href="#home">더 많은 아이템 확인하기 +</a></p>
      </div>

      {/* 카테고리 슬라이드 */}
      
      <Swiper
        slidesPerView={3}
        speed={500}
        pagination={{ clickable: true }}
        breakpoints={{
          400: { slidesPerView: 4 },
          600: { slidesPerView: 5 },
          800: { slidesPerView: 6 },
          900: { slidesPerView: 7 }
        }}
      >
        {tennisCategory.map((item, index) => (
          <SwiperSlide
            key={index}
            className="Container category"
            onClick={() => setView(index)}
          >
            <Category
              id={item.id}
              imgUrl={item.imgUrl}
              name={item.name}
              count={item.count}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 멀티페이지 */}
      <div className="Container bestContentsBox">
        {MultiPage()}
      </div>
    </div>
  );
}

function Category(props) {
  return (
    <>
      <div className={`categoryWrap ${props.id}`}>
        <div className="imgbox">
          <img src={props.imgUrl} alt="category" />
        </div>
        <div className="textbox">
          <span className="categoryName">{props.name}</span>
          <span className="count">{props.count}</span>
        </div>
      </div>
    </>
  );
}

function TennisBagBox() {
  let [tennisBag] = useState(bestbag);
  let [clicked] = useState("bag");
  return (
    <div style={{ textAlign: "center" }}>
      <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
        {tennisBag.map((item, index) => (
          <Products key={index} i={index} clicked={clicked} imgUrl={item.imgUrl}
            shop={item.shop} product={item.product} dc={item.dc}
            per={item.per} price={item.price} nodc={item.nodc} />
        ))}
      </div>
    </div>
  );
}

function TennisItemBox() {
  let [tennisItem] = useState(besttennis);
  let [clicked] = useState("item");
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {tennisItem.map((item, index) => (
        <Products key={index} i={index} clicked={clicked} imgUrl={item.imgUrl}
          shop={item.shop} product={item.product} dc={item.dc}
          per={item.per} price={item.price} nodc={item.nodc} />
      ))}
    </div>
  );
}

function TennisRacquetBox() {
  let [tennisRacquet] = useState(bestracquet);
  let [clicked] = useState("racquet");
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {tennisRacquet.map((item, index) => (
        <Products key={index} i={index} clicked={clicked} imgUrl={item.imgUrl}
          shop={item.shop} product={item.product} dc={item.dc}
          per={item.per} price={item.price} nodc={item.nodc} />
      ))}
    </div>
  );
}

function TennisWomanBox() {
  let [tennisWoman] = useState(bestwoman);
  let [clicked] = useState("woman");
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {tennisWoman.map((item, index) => (
        <Products key={index} i={index} clicked={clicked} imgUrl={item.imgUrl}
          shop={item.shop} product={item.product} dc={item.dc}
          per={item.per} price={item.price} nodc={item.nodc} />
      ))}
    </div>
  );
}

function TennisManBox() {
  let [tennisMan] = useState(bestman);
  let [clicked] = useState("man");
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {tennisMan.map((item, index) => (
        <Products key={index} i={index} clicked={clicked} imgUrl={item.imgUrl}
          shop={item.shop} product={item.product} dc={item.dc}
          per={item.per} price={item.price} nodc={item.nodc} />
      ))}
    </div>
  );
}

function TennisAccBox() {
  let [tennisAcc] = useState(bestacc);
  let [clicked] = useState("acc");
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {tennisAcc.map((item, index) => (
        <Products key={index} i={index} clicked={clicked} imgUrl={item.imgUrl}
          shop={item.shop} product={item.product} dc={item.dc}
          per={item.per} price={item.price} nodc={item.nodc} />
      ))}
    </div>
  );
}

function TennisShoesBox() {
  let [tennisShoes] = useState(bestshoes);
  let [clicked] = useState("shoes");
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {tennisShoes.map((item, index) => (
        <Products key={index} i={index} clicked={clicked} imgUrl={item.imgUrl}
          shop={item.shop} product={item.product} dc={item.dc}
          per={item.per} price={item.price} nodc={item.nodc} />
      ))}
    </div>
  );
}

export default BestPick;
