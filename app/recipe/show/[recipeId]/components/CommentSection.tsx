"use client";

import { Comment } from "@/constants/interface"
import CommentForm from "./CommentForm"
import StarReviews from "./StarReviews"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setComments } from "@/lib/redux/states/recipeSlice";
import LoadingCircle from "@/app/components/IconComponents/LoadingCircle";
import { textColor } from "@/constants/constants";
import Link from "next/link";

export default function CommentSection({reviewComments, recipe_id, total_comments}: {reviewComments: Array<Comment>, recipe_id: number, total_comments:number}) {

    const {comments} = useAppSelector(state => state.recipeSlice.commentState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setComments(reviewComments));
    },[]);

    const [state,setState] = useState({
        curPage: 0,
        isRetrieving: false,
        isFinished: false,
    });

    const retrieveComments = async () => {

        setState(prev => ({...prev, curPage: prev.curPage + 1, isRetrieving: true}))
        const recipes = await fetch('/api/comments?' + new URLSearchParams({recipeId: String(recipe_id), pageNo: String(state.curPage + 1)}), {
            method: 'GET',
        }).then(async res => {

            const body = await res.json();
            if(res.status === 500) {
                throw new Error(body.message);
            } else if(res.status === 200){
                return body;
            }
        }).catch( err => console.error((err as Error).message));

        const arrF = recipes.body;
        const arrS = comments;

        const combinedArr = arrS.concat(arrF);
        dispatch(setComments(combinedArr));
        setState(prev => ({...prev, isRetrieving: false, isFinished: true}));
    }

    return (
        <div className="reviews flex flex-col gap-[20px]">
            {
                comments.map((com, idx) => {
                    return (
                        <div key={idx} className="review-comment flex w-[100%] gap-[10px]">
                            <div className="avatar">
                                <Link href={`/user/${com.user.user_id}`}>
                                    <img src={com.user.user_image} className="relative top-[5px] w-[30px] rounded-full object-cover overflow-hidden h-[30px] max-w-none" width={10000} height={10000} alt="website banner" />
                                </Link>
                            </div>
                            <div className="comment-container w-[100%] flex flex-col justify-center">
                                <div className="upper-content flex justify-between items-center text-[10px] h-[40px]">
                                    <div className="name-stars flex items-center justify-center self-center gap-[10px]">
                                        {com.user.user_codename}
                                        <StarReviews value={com.recipe_comment_rating} interactive={false}/>
                                    </div>
                                    <div className="date">
                                        {com.created_at}
                                    </div>
                                </div>
                                <div className="lower-content whitespace-pre-wrap rounded-md text-[10px] bg-[#fef1dd] p-[10px]">
                                    <span>{com.recipe_comment_subtext}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {
                total_comments > 10 && !state.isFinished && (
                    <button onClick={() => retrieveComments()} className="text-[10px] ml-[50px] flex gap-[10px] items-center">
                        全てのレビューを見る
                        { state.isRetrieving && <LoadingCircle />}
                    </button>
                )
            }
        </div>
    )
}