import React from 'react';
import closebutton from '../../assets/img/close-button.svg';
import goodbutton from '../../assets/img/good-button.svg';
import verygood from '../../assets/img/very-good-button.svg';
import excellent from '../../assets/img/excelent-button.svg';
import notgood from '../../assets/img/not-good-button.svg';
import API from '../../API';
import { useState } from 'react';
import { useEffect } from 'react';
import {push } from 'connected-react-router'
import { useDispatch } from 'react-redux';
import close  from '../Common/Item'
const api = new API();
const Reviews = props => {
    console.log('reviews', props);
    const [reviews, setReviews] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(props.selectedItemId);
    const dispatch = useDispatch()

    let temp = props.selectedItemId;
    const [showReviews, setShowReviews] = useState();
    useEffect((selectedItemId, setSelectedItemId) => {
        api.getReviews(temp).then(reviews => {
            setReviews(reviews);
            console.log('useeffect', reviews);
        });
    }, []);
    
    const getImgReaction = like_count => {
        switch (like_count) {
            case 1:
                return goodbutton;
            case 2:
                return verygood;
            case 3:
                return excellent;
            default:
                return notgood;
        }
    };
    return (
        <div>
            <section class="popup">
                <div class="popupp-innerr">
                <img src={closebutton} onClick={() => close} alt="" />
                    <br />
                    <h1>Review</h1>
                    <br />

                    <div class="buttonss">
                        {reviews &&
                            reviews.map(review => (
                                <>
                                    <div class="popupp-inputt">
                                        <img src={getImgReaction(review.like_count)} alt="" />
                                        <input className="name" type="text" placeholder="text" value={review.name} />
                                        <input type="text" placeholder="text" value={review.body} />

                                        <br />
                                        <br />
                                    </div>
                                </>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Reviews;
