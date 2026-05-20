import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Products(props) {
  let navigate = useNavigate();

  function handleClick() {
    switch (props.clicked) {
      case "hot":     navigate("/detail/hot/"     + props.i); break;
      case "bag":     navigate("/detail/best/bag/"     + props.i); break;
      case "item":    navigate("/detail/best/item/"    + props.i); break;
      case "racquet": navigate("/detail/best/racquet/" + props.i); break;
      case "woman":   navigate("/detail/best/woman/"   + props.i); break;
      case "man":     navigate("/detail/best/man/"     + props.i); break;
      case "acc":     navigate("/detail/best/acc/"     + props.i); break;
      case "shoes":   navigate("/detail/best/shoes/"   + props.i); break;
      default: break;
    }
  }

  return (
    <div className="col">
      <Nav.Link onClick={handleClick}>
        <div className="boxWrap">
          <div className="imgbox">
            {props.new ? <div><span className="new">New</span></div> : null}
            <img src={props.imgUrl} alt="img" />
          </div>
          <div className="textbox" style={{ textAlign: "left" }}>
            <p className="shop">{props.shop}</p>
            <p className="product">{props.product}</p>
            <div className="priceBox">
              {props.dc && props.dc.length !== 0 ? <span className="dc">{props.dc}</span> : null}
              {props.per && props.per.length !== 0 ? <span className="per">{props.per}</span> : null}
              <span className="price">{props.price}</span>
              {props.nodc && props.nodc.length !== 0 ? <span className="nodc">{props.nodc}</span> : null}
            </div>
          </div>
        </div>
      </Nav.Link>
    </div>
  );
}

export default Products;
