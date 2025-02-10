"use client";
import { defineScreenMode, lg } from "@/constants/constants";
import { doScrolling } from "@/constants/functions";
import { useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";

export default function HomeNavigation() {
  const { user, isLoggedIn } = useAppSelector((state) => state.user);

  const gotoCategories = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    doScrolling("#category", 200);
  };
  return (
    <div className="flex text-sm md:text-base gap-2 sm:gap-4 mt-10 flex-wrap justify-center w-full md:justify-between md:px-8">
      <button
        onClick={gotoCategories}
        className="text-primary-text font-semibold hover:text-[#9ba3af]"
      >
        レシピを探す
      </button>
      <span className="select-none">|</span>
      <Link
        href={isLoggedIn ? "" : "/login"}
        className="text-primary-text font-semibold hover:text-[#9ba3af]"
      >
        レシピを作成する
      </Link>
      <span className="select-none">|</span>
      <Link
        href={"/recipe/list/1"}
        className="text-primary-text font-semibold hover:text-[#9ba3af]"
      >
        レシピ図鑑
      </Link>
      <span className="select-none opacity-0 md:opacity-100">|</span>
      <Link
        href={"/columns"}
        className="text-primary-text font-semibold hover:text-[#9ba3af]"
      >
        犬と食に関するコラム
      </Link>
      <span className="select-none">|</span>
      <Link
        href={
          isLoggedIn
            ? `/user/settings/${user.user_id}?=#register-pet`
            : "/login"
        }
        className="text-primary-text font-semibold hover:text-[#9ba3af]"
      >
        愛犬登録
      </Link>
    </div>
  );
}
