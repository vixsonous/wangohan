'use client';

import { fontSize, POPUPTIME, textColor } from "@/constants/constants";
import { faEdit, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import {motion} from 'framer-motion';
import Link from "next/link";
import { CircleNotch, DotsThreeOutlineVertical } from "@phosphor-icons/react/dist/ssr";
import Modal from "@/app/components/ElementComponents/Modal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { hideError, hideModal, showError, showModal } from "@/lib/redux/states/messageSlice";
import { useRouter } from "next/navigation";

export default function RecipeOptions({recipe_id} : {recipe_id: number}) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const router = useRouter();

    const menuVariants = {
        open: {scale: 1, opacity: 1},
        closed: {scale: 0, opacity: 0}
    }
    const [state, setState] = useState({
        displayMenu: false,
        isDeleting: false,
    });

    const deleteModal = () => dispatch(showModal());
    const closeDeleteModal = () => dispatch(hideModal());

    const deleteRecipe = async () => {
      setState(prev => ({...prev, isDeleting: true}));
      const res = await fetch('/api/recipe', {
          method: 'DELETE',
          body: JSON.stringify({recipe_id: recipe_id})
      });

      setState(prev => ({...prev, isDeleting: false}));

      if(res.ok) {
        router.push("/user/" + user.user_id);
        router.refresh();
        dispatch(hideModal());
        dispatch(showError("削除しました"));
        setTimeout(() => {
          dispatch(hideError());
        },POPUPTIME);
      }
    }

    const openOptions = useCallback(() => setState(prev => ({...prev, displayMenu: !state.displayMenu})), [state.displayMenu]);

    return (
        <>
        <div className="absolute z-[5] right-0">
            <button className="relative right-8 top-4 bg-primary-text p-1 rounded-full text-[#FFFAF0] z-30 flex justify-center items-center">
              <DotsThreeOutlineVertical size={20} onClick={openOptions}/>
            </button>
            <motion.div key={1} initial={"closed"} animate={state.displayMenu ? "open" : "closed"} exit={"closed"} variants={menuVariants} className={`absolute top-8 right-12 origin-top-right`}>
                <div className="flex flex-col relative z-20 p-[15px] gap-[5px]">
                    <button className="flex gap-[5px] items-center justify-center z-20">
                        <FontAwesomeIcon icon={faEdit} color={"#FFFAF0"} className="self-center"/>
                        <Link href={`/recipe/edit/${recipe_id}`}>
                            <h1 style={{fontSize: fontSize.l2}} className="whitespace-nowrap text-[#FFFAF0]">編集する</h1>
                        </Link>
                    </button>
                    <hr />
                    <button onClick={deleteModal} className="flex gap-[5px] items-center justify-center z-20">
                        <FontAwesomeIcon icon={faTrash} color={"#FFFAF0"} className="self-center"/>
                        <h1 style={{fontSize: fontSize.l2}} className="whitespace-nowrap text-[#FFFAF0]">削除する</h1>
                    </button>
                    <div className="absolute w-full h-full bg-primary-text opacity-100 top-0 left-0 rounded-md z-10"></div>
                </div>
            </motion.div>
        </div>
        <Modal>
          <div className="bg-secondary-bg flex flex-col gap-4 z-[999] py-4 px-8 rounded-lg">
            <h1 className="text-xl font-semibold">本当に削除しますか？</h1>
            <hr />
            <div className="flex justify-end gap-2">
              <button onClick={closeDeleteModal} className="w-32 text-center py-2 px-4 bg-gray-200 rounded-lg">キャンセル</button>
              <button disabled={state.isDeleting} onClick={deleteRecipe} className={`w-32 justify-center py-2 px-4 bg-red-500 text-white rounded-lg flex gap-2 items-center ${state.isDeleting ? 'opacity-50': ''}`}>
                {state.isDeleting && <CircleNotch className="animate-spin" size={20}/>}
                削除
              </button>
            </div>
          </div>
        </Modal>
        </>
    )
}