import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import heart from '../../assets/img/Icon awesome-heart.svg';
import { addCart, increaseCart, decreaseCart } from '../../reducks/carts/operations';
import WriteReview from '../Popup/WriteReview';
import Reviews from '../Popup/Reviews';

const Item = props => {
    const [selectedItemId, setSelectedItemId] = useState(props.selectedItemId);
    const [showReviews, setShowReviews] = useState(props.showReviews);
    const [showWriteReview, setShowWriteReview] = useState(props.setShowWriteReview);
    
    const dispatch = useDispatch();
    const clickAddCart = () => {
        dispatch(addCart(props.item));
    };
    const clickPlusCart = () => {
        dispatch(increaseCart(props.item));
    };
    const clickMinusCart = () => {
        dispatch(decreaseCart(props.item));
    };
    const clickCheckReviews = () => {
        setSelectedItemId(props.item.id);
        setShowReviews(true);
    };
    const clickWrirteReview = () => {
        setSelectedItemId(props.item.id);
        setShowWriteReview(true);
    };
    const close = () => {
        setSelectedItemId(props.item.id);
        setShowReviews(false)
        console.log('asdfghjkll',showReviews);
    }

    return (
        <>
            <div>
                <section className="container">
                    <div className="grid">
                        <div className="item">
                            <div className="image-container">
                                <img src={props.item.image} alt="" />
                            </div>
                            <div className="description">
                                <div className="like">
                                    <img src={heart} alt="" />
                                    <p>({props.item.total_like_count})</p>
                                </div>
                                <div className="item-name">
                                    <p>{props.item.name}</p>
                                </div>
                                <div className="item-review">
                                    <a onClick={() => clickWrirteReview(true)}>Write Review </a>
                                    <a onClick={() => clickCheckReviews(true)}>Check Review</a>
                                </div>

                                <div className="add-to-cart">
                                    {props.selected_count === 0 ? (
                                        <button className="add" onClick={clickAddCart}>
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <div className="number">
                                            <span className="minus" onClick={clickMinusCart}>
                                                -
                                            </span>
                                            <span className="count">{props.selected_count}</span>
                                            <span className="plus" onClick={clickPlusCart}>
                                                +
                                            </span>
                                        </div>
                                    )}
                                    <p>${props.item.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {showWriteReview && (
                <WriteReview
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                    setShowWriteReview={setShowWriteReview}
                />
            )}
            {showReviews && (
                <Reviews
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                    setShowReviews={setShowReviews}
                    // console.log(sel);
                />
            )}
        </>
    );
};

export default Item;
