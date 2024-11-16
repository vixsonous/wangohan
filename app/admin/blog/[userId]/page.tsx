import OptImage from "@/app/components/ElementComponents/Image"
import { faChevronLeft, faChevronRight, faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Dropdown from "../../components/Dropdown"

export default function Blog() {

    const blogs = [
        {id: 1, profile: 'https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/profile/MlXG7GuTcRjVhQS2FB7VPtype_thumbnail.webp', user_first_name: 'Victor', user_last_name: 'Chiong',image: 'https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/recipes/00000067/XbTaqicYvthAeCErPkwZXtype_thumbnail.webp', title: 'Sample Title', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rerum sint id voluptate iure corporis ut quam dolorum vitae veniam eligendi, temporibus atque! Temporibus, aliquid. Odit quaerat illo laudantium unde.', date: new Date().toISOString().split("T")[0]},
        {id: 1, profile: 'https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/profile/MlXG7GuTcRjVhQS2FB7VPtype_thumbnail.webp',user_first_name: 'Victor', user_last_name: 'Chiong',image: 'https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/recipes/00000067/XbTaqicYvthAeCErPkwZXtype_thumbnail.webp', title: 'Sample Title', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rerum sint id voluptate iure corporis ut quam dolorum vitae veniam eligendi, temporibus atque! Temporibus, aliquid. Odit quaerat illo laudantium unde.', date: new Date().toISOString().split("T")[0]},
        {id: 1, profile: 'https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/profile/MlXG7GuTcRjVhQS2FB7VPtype_thumbnail.webp',user_first_name: 'Victor', user_last_name: 'Chiong',image: 'https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/recipes/00000067/XbTaqicYvthAeCErPkwZXtype_thumbnail.webp', title: 'Sample Title', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rerum sint id voluptate iure corporis ut quam dolorum vitae veniam eligendi, temporibus atque! Temporibus, aliquid. Odit quaerat illo laudantium unde.', date: new Date().toISOString().split("T")[0]},
    ]

    return (
        <div className="w-full p-4 flex flex-col gap-4">

            {/* Blog Section */}
            <section>
                <div className="bg-secondary-bg p-2 rounded-t-xl flex justify-between items-center">
                    <span className="text-lg font-bold">Blog</span>
                    <FontAwesomeIcon icon={faMessage}/>
                </div>
                <div className="bg-secondary-bg p-2 mt-1 rounded-b-xl">
                    <section className="flex flex-col gap-4">
                        {
                            blogs.map( (blog, idx) => {
                                return (
                                    <article className="w-full flex flex-col gap-1">
                                        <div className="flex flex-col gap-1 items-start">
                                            <div className="flex gap-2 items-center justify-between w-full">
                                                <span className="text-lg font-bold">{blog.title}</span>
                                                <span className="text-xs">{blog.date}</span>
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <OptImage className="w-6 h-6 rounded-2xl" src={blog.profile}/>
                                                <span className="text-xs">{blog.user_first_name} {blog.user_last_name}</span>
                                            </div>
                                        </div>
                                        <div className="bg-primary-bg h-0.5 w-full"></div>
                                        <div className="flex flex-col gap-1 py-1">
                                            <div className="text-xs">
                                                <OptImage src={blog.image} className="float-left pr-4 max-w-[100px]"/>
                                                <span className="overflow-hidden">{blog.text}</span>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })
                        }
                    </section>
                    <div className="flex justify-center px-2 pt-2 gap-2 items-center">
                        <FontAwesomeIcon size="xs" icon={faChevronLeft}/>
                        <div>
                            <span className="text-xs">1</span>
                        </div>
                        <FontAwesomeIcon size="xs" icon={faChevronRight}/>
                    </div>
                </div>
            </section>
        </div>
    )
}