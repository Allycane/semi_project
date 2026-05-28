import { Link } from 'react-router-dom';

const Products = ({id, categoryId, imgUrl, shop, product, price, dc, per, nodc}) => {
  const linkTo = categoryId === 8 ? `/detail/hot/${id}` : `/detail/best/${id}`;

  return (
    <div className='col'>
      <Link to={linkTo} className='productCardButton'
        style={{
          textDecoration: 'none'
        }}
      >
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

          <div className='textbox' 
            style={{
              textAlign: 'left'
            }}>
            <p className='shop'
              style={{
                color: 'gray'
            }}
            >{shop}</p>
            <p className='product'
              style={{
                color: 'black'
            }}
            >{product}</p>

            <div className='priceBox'>
              {dc ? <span className='dc'>{dc}</span> : null}
              {per ? <span className='per'
                style={{
                  color: 'red',
                  fontSize: '.9rem',
                  textAlign: 'center'
                }}
              >{per}</span> : null}
              <span className='price'
                style={{
                  color: 'black'
                }}
              >{price}</span>
              {nodc ? <span className='nodc'>{nodc}</span> : null}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}


export default Products;
