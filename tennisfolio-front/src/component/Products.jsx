import { useNavigate } from 'react-router-dom';

const Products = ({id, categoryId, imgUrl, shop, product, dc, per, price, nodc, isNew}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (categoryId === 8) {
      navigate(`/detail/hot/${id}`);
      return;
    }

    navigate(`/detail/best/${id}`);
  }

  return (
    <div className='col'>
      <button
        type='button'
        className='productCardButton'
        onClick={handleClick}
      >
        <div className='boxWrap'>
          <div className='imgbox'>
            {
              isNew ? (
                <div>
                  <span className='new'>New</span>
                </div>
              ) : null
            }

            <img src={imgUrl} alt={product} />
          </div>

          <div className='textbox' style={{textAlign:'left'}}>
            <p className='shop'>{shop}</p>
            <p className='product'>{product}</p>

            <div className='priceBox'>
              {dc ? <span className='dc'>{dc}</span> : null}
              {per ? <span className='dc'>{per}</span> : null}
              <span className='price'>{price}</span>
              {nodc ? <span className='nodc'>{nodc}</span> : null}
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}


export default Products;
