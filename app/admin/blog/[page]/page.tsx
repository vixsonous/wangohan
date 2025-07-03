import { getAdminBlogs, getBlogs } from "@/action/blog"
import { getUserId } from "@/action/users";
import OptImage from "@/app/components/ElementComponents/Image"
import { faChevronLeft, faChevronRight, faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";

export default async function Blog({params}: {params: {page: number}}) {
  const [blogsDb, user_id] = await Promise.all([
    await getAdminBlogs(Number(params.page)),
    await getUserId()
  ]);

  const processedBlogs = blogsDb.map(b => {
    return {
      id: b.blog_id,
      profile: b.user_image,
      user_codename: b.user_codename,
      image: b.blog_image,
      title: b.title,
      text: '',
      date: new Date(b.created_at).toISOString().split("T")[0]
    }
  })

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {/* Blog Section */}
      <section>
        <div className="bg-secondary-bg p-2 rounded-t-xl flex justify-between items-center">
          <span className="text-lg font-bold">Blog <Link className="text-xs border border-black px-2 py-1 rounded-md" href={"/admin/blog/create/" + user_id}>Create</Link></span>
          <FontAwesomeIcon icon={faMessage}/>
        </div>
        <div className="bg-secondary-bg p-2 mt-1 rounded-b-xl">
          <section className="flex flex-col gap-4">
            {
              processedBlogs.map( (blog, idx) => {
                return (
                  <article key={blog.id} className="w-full flex flex-col gap-1">
                    <div className="flex flex-col gap-1 items-start">
                      <div className="flex gap-2 items-center justify-between w-full">
                        <span className="text-lg font-bold">{blog.title} <Link className="text-xs border border-black px-2 py-1 rounded-md" href={"/admin/blog/edit/" + blog.id}>Edit</Link></span>
                        <span className="text-xs">{blog.date}</span>
                      </div>
                      <div className="flex items-end gap-2">
                        <OptImage fullContainer={false} width={24} height={24} className="w-6 h-6 rounded-2xl" src={blog.profile}/>
                        <span className="text-xs">{blog.user_codename}</span>
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
              <Link 
                aria-disabled={Number(params.page) - 1 > 0} 
                tabIndex={Number(params.page) - 1 > 0 ? -1 : undefined}  
                href={"/admin/blog/" + (Number(params.page) - 1)}
                className={`${Number(params.page) - 1 > 0 ? 'pointer-events-auto' : 'pointer-events-none opacity-50'}`}
              ><FontAwesomeIcon size="xs" icon={faChevronLeft}/></Link>
              <div>
                  <span className="text-xs">{params.page}</span>
              </div>
              <Link href={"/admin/blog/" + (Number(params.page) + 1)}><FontAwesomeIcon size="xs" icon={faChevronRight}/></Link>
          </div>
        </div>
      </section>
    </div>
  )
}