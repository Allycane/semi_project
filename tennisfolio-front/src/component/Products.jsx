import { Link } from 'react-router-dom';

const Products = ({id, categoryId, imgUrl, shop, product, price, dc, per, nodc}) => {
  const linkTo = categoryId === 8 ? `/detail/hot/${id}` : `/detail/best/${id}`;

  return (
    <div className='col'>
      <Link to={linkTo} className='productCardButton'>
        <div className='boxWrap'>
          <div className='imgbox'>
            {/* {
              isNew ? (
                <div>
                  <span className='new'>New</span>
                </div>
              ) : null
            } */}
            <img src={imgUrl} alt={product} />
          </div>

          <div className='textbox' style={{textAlign: 'left'}}>
            <p className='shop'>{shop}</p>
            <p className='product'>{product}</p>

            <div className='priceBox'>
              {dc ? <span className='dc'>{dc}</span> : null}
              {per ? <span className='per'>{per}</span> : null}
              <span className='price'>{price}</span>
              {nodc ? <span className='nodc'>{nodc}</span> : null}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}


export default Products;
