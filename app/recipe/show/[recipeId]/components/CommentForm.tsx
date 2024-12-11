"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { memo, SyntheticEvent, useState } from "react";
import StarReviews from "../../../../components/ElementComponents/StarReviews";
import { fontSize } from "@/constants/constants";
import { addComment } from "@/lib/redux/states/recipeSlice";
import { Comment } from "@/constants/interface";
import ErrorSpan from "@/app/components/TextComponents/ErrorSpan";
import LoadingCircle from "@/app/components/IconComponents/LoadingCircle";
import UpArrow from "@/app/components/IconComponents/UpArrow";
import Link from "next/link";
import { getSocket } from "@/action/socket";

const socket = getSocket();

export default memo(function CommentForm({
  recipe_id, 
  isLoggedIn, 
  user_id, 
  user_name,
  recipe_owner_id,
  recipe_image
} : {
  recipe_id: number, 
  user_id: number, 
  user_name: string,
  recipe_image: string,
  isLoggedIn: boolean, 
  recipe_owner_id:number
}) {

  const {user} = useAppSelector(state => state.user);
  const {comments} = useAppSelector(state => state.recipeSlice.commentState);
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
      comment: '',
      error: '',
      submitting: false
  })

  const submitCommentFunc = async (e:SyntheticEvent) => {
      e.preventDefault();

      const rating = (document.querySelector("input[name='rating']") as HTMLInputElement);
      
      setState(prev => ({...prev, submitting: true}));

      socket.emit('review recipe', JSON.stringify({
        type: 'review',
        recipe_id: recipe_id, 
        user_id: user_id,
        recipe_image: recipe_image,
        recipe_owner_id: recipe_owner_id,
        notification_content: `あなたのレシピに新規レビューがあります。`,
        is_read: false,
        created_at: new Date()
      }));

      const res = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
              rating: rating.value,
              subtext: state.comment,
              title: '',
              recipe_id: recipe_id,
              user_id: user.user_id,
          })
      }).then(async res => {
          const body = await res.json();
          if(res.status === 500) throw new Error(body.message);
          else if(res.status === 200) return body;
      }).catch(err => setState(prev => ({...prev, error: (err as Error).message})));
      setState(prev => ({...prev, submitting: false, comment: ''}));
      rating.value = '';

      if(res) {
          const updated_comment = {...res.body, user: user}
          console.log(updated_comment);
          dispatch(addComment(updated_comment as Comment));

          console.log( comments );
      }
      
  }
  return (
      <>
      <form className="relative flex justify-center flex-col gap-[10px]" action="">
          { isLoggedIn ? (
              <>
              <div className="flex gap-[10px] items-center">
                  <StarReviews value={0} interactive={true}/>
                  <h1 style={{fontSize: fontSize.l2}}>Please enter your review!</h1>
              </div>
              <div className="w-[100%] flex items-center">
                  <textarea value={state.comment} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setState(prev => ({...prev, comment: e.target.value}))} placeholder="このレシピのレビューを投稿する" className="text-[10px] rounded-[50px] px-[15px] py-[10px] w-full" name="comment" rows={1}></textarea>
                  <button disabled={state.submitting} onClick={submitCommentFunc} className="absolute bg-[#7e594e] w-[50px] text-white rounded-[50px] right-[1%] top-[33px]" type="submit">
                      {
                          state.submitting ? (
                              <LoadingCircle color="#FFFAF0" />
                          ) : (
                              <UpArrow color="#FFFAF0" />
                          )
                      }
                  </button>
              </div>
              <div className="w-full">
                  <ErrorSpan>
                      {state.error}
                  </ErrorSpan>
              </div>
              </>
          ) : <div className="w-full text-center text-sm"><Link className="text-blue-400 font-bold" href="/login">ログイン</Link>してレビューを書く</div>
          }
      </form>
      </>
  )
});