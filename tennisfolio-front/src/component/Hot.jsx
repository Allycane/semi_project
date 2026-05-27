import { useEffect, useState } from 'react';
import Products from './Products.jsx';
import { getHotProducts } from '../util/product.js';

function Hot() {
  let [clicked] = useState("hot");
  let [hotProducts, setHotProducts] = useState([]);

  useEffect(() => {
    const fetchHotProducts = async()=>{
      const result =await getHotProducts();
      setHotProducts(result);
    };
      fetchHotProducts();    
    }

  , []);

  return (
    <div className="container hotItems" style={{ margin: "150px auto 150px", maxWidth: "1600px" }}>
      <h3 style={{ fontWeight: "700" }}>요즘 핫해요</h3>
      <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-4">
        {hotProducts.map((item, index) => (
          <Products
            key={index}
            clicked={clicked}
            i={index}
            new={item.new}
            imgUrl={item.imgUrl}
            shop={item.shop}
            product={item.product}
            dc={item.dc}
            per={item.per}
            price={item.price}
            nodc={item.nodc}
          />
        ))}
      </div>
    </div>
  );
}

export default Hot;
