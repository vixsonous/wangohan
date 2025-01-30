import { BlogData } from "@/constants/interface";

export default function FileElement({ blog }: { blog: BlogData }) {
  return (
    <section className="w-44 md:w-96 relative">
      <div className="grid-cols-12 absolute w-full grid justify-center">
        <img
          src="/columns/paw1.png"
          className="col-span-3 p-2 relative left-2 z-20"
          alt=""
        />
        <h1 className="col-span-9"></h1>
      </div>
      <div
        style={{
          maskImage: `url(mask.png)`,
          maskRepeat: "no-repeat",
          maskSize: "100%",
        }}
        className="file-head grid grid-cols-12 h-20 md:h-52 relative"
      >
        <img
          src={blog.blog_image}
          className="absolute w-full h-full top-0 object-cover z-10 left-1 rounded-t-lg"
          alt=""
        />
      </div>
      <div className="bg-gray-400 absolute top-2 rounded-lg -right-2 w-1/2 h-full -z-10"></div>
      <div className="file-body bg-white p-2 px-4 rounded-b-lg relative">
        <div className="absolute top-2 left-2 bg-gray-400 w-full h-full rounded-b-lg -z-10"></div>
        <h1 className="text-xs font-bold md:text-sm line-clamp-2 h-[2lh]">
          {blog.title}
        </h1>
      </div>
    </section>
  );
}
