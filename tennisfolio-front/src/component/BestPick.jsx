import { useEffect, useState } from 'react';
import axios from 'axios';

import Products from './Products.jsx';
// import style from '../css/BestPick.Module.css';

const BestPick = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try{
        const response = await axios.get('/api/best/categories');
        setCategories(response.data);
        // console.log('categories ----->', categories, typeof categories);
      }
      catch (error) {
        console.error(error);
        setError('카테고리 데이터를 불러오지 못했습니다.');
      }
    }

    fetchCategories();
  }, [])

  // 클릭된 카테고리에 맞는 상품 목록 불러오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('/api/best/products', {params:{ category : selectedCategoryId }});
      }
      catch (error) {
        console.error(error);
        setError('상품 데이터를 불러오지 못했습니다.');
      }
      finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategoryId]);

  return (
    <div className="container bestItem" style={{ margin: "150px auto 150px", maxWidth: "1600px" }}>
      <div className="categoryMore">
        <h3>카테고리별 인기 아이템</h3>
        <p className="more"><a href="#home">더 많은 아이템 확인하기 +</a></p>
      </div>

      <div className='categoryList'>
        {
          categories.map(item => {
            <button type='button' key={item.category_id}
            className={`Container category ${
              selectedCategoryId === item.category_id ? 'active' : ''
            }`}
            onClick={() => {setSelectedCategoryId(item.category_id)}}>
              <Category
              category_id={item.category_id}
              imgUrl={item.imgUrl}
              name={item.name}
              count={item.count}/>
            </button>
          })
        }
      </div>

      <div className="Container bestContentsBox">
        {loading && <p>상품을 불러오는 중입니다.</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <ProductList 
            products={products}
            selectedCategoryId={selectedCategoryId}
          />
        )}
      </div>
    </div>
  );
}

const Category = ({categoryId, imgUrl, name, count}) => {
  return (
    <>
      <div className={`categoryWrap ${categoryId}`}>
        <div className="imgbox">
          <img src={imgUrl} alt={name} />
        </div>

        <div className="textbox">
          <span className="categoryName">{name}</span>
          <span className="count">{count}</span>
        </div>
      </div>
    </>
  );
}

const ProductList = ({products}) => {
  return (
    <div className='row row-cols-2 row-cols-md-3 row-cols-xxl-5'>
      {products.map((item, idx) => {
        <Products
          key={item.id}
          id={item.id}
          categoryId={item.category_id}
          imgUrl={item.imgUrl}
          shop={item.shop}
          product={item.product}
          dc={item.dc}
          per={item.per}
          price={item.price}
          nodc={item.nodc}
        />
      })}
    </div>
  );
}

export default BestPick;
