import { getDecryptedSession } from "@/action/lib";
import Link from "next/link";

export default async function HomeNavigation() {

  const user = await getDecryptedSession(); 
  const isLoggedIn = user ? true : false;
  return (
    <div className="flex text-sm md:text-base gap-4 mt-10 flex-wrap justify-center">
      <Link href={'/recipe/list/1'} className="text-primary-text font-semibold hover:text-secondary-bg">レシピを探す</Link>
      <span className="select-none">|</span>
      <Link href={isLoggedIn ? '': '/login'} className="text-primary-text font-semibold hover:text-secondary-bg">レシピを作成する</Link>
      <span className="select-none">|</span>
      <Link href={'/recipe/list/1'} className="text-primary-text font-semibold hover:text-secondary-bg">レシピ図鑑</Link>
      <span className="select-none">|</span>
      <Link href={'/columns'} className="text-primary-text font-semibold hover:text-secondary-bg">犬と食に関するコラム</Link>
      <span className="select-none">|</span>
      <Link href={isLoggedIn ? `/user/settings/${user.user.user_id}?=#register-pet` : '/login'} className="text-primary-text font-semibold hover:text-secondary-bg">愛犬登録</Link>
    </div>
  )
} 