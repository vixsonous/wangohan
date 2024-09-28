import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UpArrow({color="#6b4528"}: {color: string}) {
    return (
        <FontAwesomeIcon className={`text-[${color}]`} icon={faArrowUp} size="sm"/>
    )
}