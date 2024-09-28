import { createSlice } from "@reduxjs/toolkit";
import { Comment as CommentType } from "@/constants/interface";

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        show: false,
        uploading: false,
        commentState: {
            comments: new Array<CommentType>,
            isSubmittingComment: false
        }
    },
    reducers: {
        show: state => {
            state.show = true;
            const html = document.querySelector("html");
            if(html) html.style.overflowY = "hidden";
            
        },
        hide: state => {
            state.show = false;
            const html = document.querySelector("html");
            if(html) html.style.overflowY = "scroll";
        },
        submitComment: state => {
            state.commentState.isSubmittingComment = true;
        },
        addComment: (state, action) => {
            state.commentState.comments.push(action.payload);
            state.commentState.isSubmittingComment = false;
        },
        setComments: (state, action) => {
            state.commentState.comments = action.payload;
        }
    }
});

export const { show, hide, submitComment, addComment, setComments } = recipeSlice.actions;
export default recipeSlice.reducer;