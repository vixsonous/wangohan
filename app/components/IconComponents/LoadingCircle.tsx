import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingCircle({color = '#6b4528'} : {color?:string}) {
    return (
        <FontAwesomeIcon className={`text-[${color}]`} spin icon={faCircleNotch} size="sm"/>
    )
}