import { BlogData } from "@/constants/interface";

export default function FileElement({ blog }: { blog: BlogData }) {
  return (
    <section className="w-44 md:w-96">
      <div className="file-head grid grid-cols-12 h-22 md:h-52 relative">
        <img
          src={blog.blog_image}
          className="absolute w-full h-full top-0 -z-10 left-1 rounded-t-lg"
          alt=""
        />
        <div className="col-span-3 flex flex-col items-center">
          <img src="/columns/paw1.png" className="w-24 h-24 p-2" alt="" />
          <div className="w-full h-full bg-button rounded-tl-lg" />
        </div>
        <div className="col-span-9 relative bg-button rounded-t-lg w-full h-full">
          <div className="absolute w-full h-full bg-gray-400 opacity-50 top-2 left-2 rounded-t-lg -z-10"></div>
        </div>
      </div>
      <div className="file-body bg-white p-2 px-4 rounded-b-lg relative">
        <div className="absolute top-2 left-2 bg-gray-400 opacity-50 w-full h-full rounded-b-lg -z-10"></div>
        <h1 className="text-xs font-bold md:text-sm line-clamp-2 h-[2lh]">
          {blog.title}
        </h1>
      </div>
    </section>
  );
}
