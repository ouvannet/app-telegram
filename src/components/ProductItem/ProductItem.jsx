import React from "react";
import Button from "../Button/Button";
import './ProductItem.css';
import ProductList from "../ProductList/ProductList";

const ProductItem = ({product,className,onAdd}) =>{
    console.log(product.title);
    const onAddHandler=()=>{
        onAdd(product);
    }
    return (
        
        <div className={'product '+className}>
            <div className={'img'}><img src={product.image} height={'100%'} /></div>
            <div className={'title'}>{product.title}</div>
            {/* <div className={'title'}>{product.description}</div> */}
            <div className={'price'}>
                <span>Price: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Product
            </Button>
        </div>
    );
};


export default ProductItem;