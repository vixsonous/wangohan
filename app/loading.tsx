import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IndexLoading() {
    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <FontAwesomeIcon className="w-[25px] h-[25px] text-[#6b4528]" spin icon={faCircleNotch} size="sm"/>
        </div>
    )
}