'use client';

import { getSocket } from "@/action/socket";
import { POPUPTIME, textColor } from "@/constants/constants";
import { useAppDispatch } from "@/lib/redux/hooks";
import { hideError, showError } from "@/lib/redux/states/messageSlice";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import React, { memo, useCallback, useEffect, useState } from "react";

const socket = getSocket(); 

export default memo(function LikeRecipe({
  recipe_id, 
  recipe_name, 
  user_id, 
  user_name, 
  style={}, 
  likeStatus={isLikedExist: false, liked: false}
} : {
  recipe_id: number, 
  recipe_name: string, 
  user_id:number, 
  user_name: string, 
  style?:object, 
  likeStatus?: {isLikedExist: boolean, liked: boolean}
}) {

  const dispatch = useAppDispatch();

  const [state, setState] = useState({
      isLiked: likeStatus.liked,
      processing: false,
      bounce: false
  });

  const messageRecieve = useCallback(async (message:string) => {
    console.log("message");
  },[]);

  useEffect(() => {
    socket.on('like recipe', messageRecieve);

    return () => {
      socket.off('like recipe', messageRecieve)
    };
  },[]);

  const likeFunc = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    socket.emit('like recipe', JSON.stringify({
      recipe_id: recipe_id, 
      user_id: user_id,
      recipe_name: recipe_name,
      user_name: user_name,
    }));

    setState(prev => ({...prev, isLiked: !prev.isLiked, processing: true, bounce: true}));
    // setState(prev => ({...prev, bounce: false}));

    await fetch('/api/recipe-like', {
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
    setState(prev => ({...prev, processing: false}));
},[state.isLiked]);

  return (
      <button disabled={state.processing} onClick={likeFunc}>
          {/* <FontAwesomeIcon color={state.isLiked ? textColor.error : ''} size="sm" bounce={state.bounce} style={style} icon={faHeart}/> */}
          <Heart color={state.isLiked ? textColor.error : ''} weight={state.isLiked ? "fill" : "regular"} size={28}/>
      </button>
  )
})