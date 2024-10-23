'use client';

import { POPUPTIME, textColor } from "@/constants/constants";
import { useAppDispatch } from "@/lib/redux/hooks";
import { hideError, showError } from "@/lib/redux/states/messageSlice";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function LikeRecipe({recipe_id, style={}, likeStatus={isLikedExist: false, liked: false}} : {recipe_id: number, style?:object, likeStatus?: {isLikedExist: boolean, liked: boolean}}) {

    const dispatch = useAppDispatch();

    const [state, setState] = useState({
        isLiked: likeStatus.liked
    })

    const likeFunc = async (e: React.MouseEvent<SVGElement>) => {
        e.preventDefault();

        fetch('/api/recipe-like', {
            method: likeStatus.isLikedExist ? 'PATCH' : 'POST',
            body: JSON.stringify({isLiked: !state.isLiked, recipe_id})
        })
        .then( async res => {
            const body = await res.json();
            if(res.status === 500) throw new Error(body.message);
        })
        .catch( err => {
            dispatch(showError((err as Error).message));
            setTimeout(() => {
                dispatch(hideError());
            },POPUPTIME);
        });

        setState(prev => ({...prev, isLiked: !prev.isLiked}));
    }

    return (
        <div>
            <FontAwesomeIcon onClick={likeFunc} color={state.isLiked ? textColor.error : ''} style={style} icon={faHeart}/>
        </div>
    )
}