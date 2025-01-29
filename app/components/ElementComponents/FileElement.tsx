import { BlogData } from "@/constants/interface";

export default function FileElement({ blog }: { blog: BlogData }) {
  return (
    <section className="w-44 md:w-96">
      <div className="file-head grid grid-cols-12 h-22 md:h-44">
        <div className="col-span-3 flex flex-col items-center">
          <img src="/columns/paw1.png" className="w-24 h-24 p-2" alt="" />
          <div className="w-full h-full bg-button rounded-tl-lg" />
        </div>
        <div className="col-span-9 relative bg-button rounded-t-lg w-full h-full">
          <div className="absolute w-full h-full bg-gray-400 opacity-50 top-2 left-2 rounded-t-lg -z-10"></div>
        </div>
      </div>
      <div className="file-body bg-white p-2 rounded-b-lg relative h-8 md:h-16">
        <div className="absolute top-2 left-2 bg-gray-400 opacity-50 w-full h-full rounded-b-lg -z-10"></div>
        <h1>{blog.title}</h1>
      </div>
    </section>
  );
}
