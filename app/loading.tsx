import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

export default function IndexLoading() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <CircleNotch className="animate-spin" size={40}/>
        </div>
    )
}