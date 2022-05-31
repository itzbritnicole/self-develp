import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import WriteReview from '../components/Popup/WriteReview';
import Reviews from '../components/Popup/Reviews';
import Item from '../components/Common/Item';
import { fetchItems } from '../reducks/items/operations';
import { getItems } from '../reducks/items/selectors';
import { getCarts, getSubtotal } from '../reducks/carts/selectors';
import { fetchFromLocalStorage } from '../reducks/carts/operations';
import queryString from 'query-string';
import sign from '../assets/img/me.svg';

const Home = () => {
    const parsed = queryString.parse(window.location.search);
    const [showWriteReview, setShowWriteReview] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [showCartList, setShowCartList] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const items = getItems(selector);
    const carts = getCarts(selector);
    const subtotal = getSubtotal(selector);

    useEffect(() => {
        dispatch(fetchFromLocalStorage());
        dispatch(fetchItems(parsed.category));
    }, []);

    const showItem = item => {
        let selected_count = 0;
        if (carts[item.id] && carts[item.id].selected_count) {
            selected_count = carts[item.id].selected_count;
        }
        if (showCartList && carts[item.id] === undefined) {
            // if the page is cart page and item is not slected, show nothing.
            return;
        }
        return (
            <div>
                <Item
                    key={item.id}
                    item={item}
                    selected_count={selected_count}
                    setShowWriteReview={setShowWriteReview}
                    setShowReviews={setShowReviews}
                    setSelectedItemId={selectedItemId}
                />
            </div>
        );
    };
    return (
        <>
            <section class="types">
                {showCartList ? (
                    <h1>Cart</h1>
                ) : (
                    <>
                        <p>Our Most Popular Recipes</p>
                        <img src={sign} alt="" />
                        <h6>Try our Most Delicious food and it usually take minutes to deliver</h6>
                        <div class="btn">
                            <a href="/">
                                <button>ALL</button>{' '}
                            </a>
                            <a href="/?category=hot">
                                <button>HOT</button>{' '}
                            </a>
                            <a href="/?category=cold">
                                <button>COLD</button>{' '}
                            </a>
                            <a href="/?category=bagel">
                                <button>BAGEL</button>{' '}
                            </a>
                        </div>
                    </>
                )}
                <div class="items">{items && items.map(item => showItem(item))} </div>
            </section>
            <Footer price={subtotal} showCartList={showCartList} setShowCartList={setShowCartList} />
            {showWriteReview && (
                <WriteReview
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                    setShowWriteReview={setShowWriteReview}
                />
            )}
        </>
    );
};

export default Home;
