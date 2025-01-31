import OptImage from "@/app/components/ElementComponents/Image";
import {
  faBook,
  faChevronLeft,
  faChevronRight,
  faDashboard,
  faEdit,
  faMessage,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../../components/Dropdown";

export default function Admin() {
  const users = [
    { id: 1, user_first_name: "Victor", user_last_name: "Chiong", role: 1 },
    { id: 2, user_first_name: "Minami", user_last_name: "Sakai", role: 2 },
    { id: 3, user_first_name: "Kurmu", user_last_name: "Sakai", role: 2 },
  ];
  const blogs = [
    {
      id: 1,
      profile:
        "https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/profile/MlXG7GuTcRjVhQS2FB7VPtype_thumbnail.webp",
      user_first_name: "Victor",
      user_last_name: "Chiong",
      image:
        "https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/recipes/00000067/XbTaqicYvthAeCErPkwZXtype_thumbnail.webp",
      title: "Sample Title",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rerum sint id voluptate iure corporis ut quam dolorum vitae veniam eligendi, temporibus atque! Temporibus, aliquid. Odit quaerat illo laudantium unde.",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: 1,
      profile:
        "https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/profile/MlXG7GuTcRjVhQS2FB7VPtype_thumbnail.webp",
      user_first_name: "Victor",
      user_last_name: "Chiong",
      image:
        "https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/recipes/00000067/XbTaqicYvthAeCErPkwZXtype_thumbnail.webp",
      title: "Sample Title",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rerum sint id voluptate iure corporis ut quam dolorum vitae veniam eligendi, temporibus atque! Temporibus, aliquid. Odit quaerat illo laudantium unde.",
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: 1,
      profile:
        "https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/profile/MlXG7GuTcRjVhQS2FB7VPtype_thumbnail.webp",
      user_first_name: "Victor",
      user_last_name: "Chiong",
      image:
        "https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/recipes/00000067/XbTaqicYvthAeCErPkwZXtype_thumbnail.webp",
      title: "Sample Title",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rerum sint id voluptate iure corporis ut quam dolorum vitae veniam eligendi, temporibus atque! Temporibus, aliquid. Odit quaerat illo laudantium unde.",
      date: new Date().toISOString().split("T")[0],
    },
  ];

  const recipes = [
    {
      id: 1,
      recipe_title: "This is a recipe",
      user_first_name: "Victor",
      user_last_name: "Chiong",
      role: 1,
    },
    {
      id: 2,
      recipe_title: "This is another Recipe",
      user_first_name: "Minami",
      user_last_name: "Sakai",
      role: 2,
    },
    {
      id: 3,
      recipe_title: "WanWan Recipe",
      user_first_name: "Kurmu",
      user_last_name: "Sakai",
      role: 2,
    },
  ];

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <section className="md:hidden">
        <div className="bg-secondary-bg p-2 rounded-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <OptImage
              className="w-8 h-8 rounded-full"
              src={
                "https://wangohan-public.s3.ap-northeast-1.amazonaws.com/00000003/profile/MlXG7GuTcRjVhQS2FB7VPtype_thumbnail.webp"
              }
            />
            <span className="text-sm font-bold">Victor Chiong</span>
          </div>
          <Dropdown>
            <ul className="flex flex-col gap-2 bg-secondary-bg items-center p-2 rounded-md border border-primary-text">
              <li className="flex items-center justify-between w-full px-4 bg-primary-bg rounded-l-full">
                <FontAwesomeIcon size="sm" icon={faDashboard} />
                <span>Dashboard</span>
              </li>
              <li className="flex items-center justify-between w-full px-4 rounded-l-full">
                <FontAwesomeIcon size="sm" icon={faUsers} />
                <span>Users</span>
              </li>
              <li className="flex items-center justify-between w-full px-4 rounded-l-full">
                <FontAwesomeIcon size="sm" icon={faBook} />
                <span>Recipe</span>
              </li>
              <li className="flex items-center justify-between w-full px-4 rounded-l-full">
                <FontAwesomeIcon size="sm" icon={faMessage} />
                <span>Blog</span>
              </li>
            </ul>
          </Dropdown>
        </div>
      </section>
      <section>
        <div className="bg-secondary-bg p-2 rounded-t-xl flex justify-between items-center">
          <span className="text-lg font-bold">Users</span>
          <FontAwesomeIcon icon={faUsers} />
        </div>
        <div className="bg-secondary-bg p-2 mt-1 rounded-b-xl">
          <ul className="list-none w-full">
            {users.map((user, idx) => {
              return (
                <li className="w-full">
                  <div className="flex flex-col gap-1 py-1">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm">
                          {user.user_first_name} {user.user_last_name}
                        </span>
                        {user.role === 1 && (
                          <span className="text-xs">Super Admin</span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <FontAwesomeIcon size="xs" icon={faEdit} />
                        <FontAwesomeIcon size="xs" icon={faTrash} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary-bg h-0.5 w-full"></div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center px-2 pt-2 gap-2 items-center">
            <FontAwesomeIcon size="xs" icon={faChevronLeft} />
            <div>
              <span className="text-sm">1</span>
            </div>
            <FontAwesomeIcon size="xs" icon={faChevronRight} />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section>
        <div className="bg-secondary-bg p-2 rounded-t-xl flex justify-between items-center">
          <span className="text-lg font-bold">Blog</span>
          <FontAwesomeIcon icon={faMessage} />
        </div>
        <div className="bg-secondary-bg p-2 mt-1 rounded-b-xl">
          <section className="flex flex-col gap-4">
            {blogs.map((blog, idx) => {
              return (
                <article className="w-full flex flex-col gap-1">
                  <div className="flex flex-col gap-1 items-start">
                    <div className="flex gap-2 items-center justify-between w-full">
                      <span className="text-lg font-bold">{blog.title}</span>
                      <span className="text-xs">{blog.date}</span>
                    </div>
                    <div className="flex items-end gap-2">
                      <OptImage
                        className="w-6 h-6 rounded-2xl"
                        src={blog.profile}
                      />
                      <span className="text-xs">
                        {blog.user_first_name} {blog.user_last_name}
                      </span>
                    </div>
                  </div>
                  <div className="bg-primary-bg h-0.5 w-full"></div>
                  <div className="flex flex-col gap-1 py-1">
                    <div className="text-xs">
                      <OptImage
                        src={blog.image}
                        className="float-left pr-4 max-w-[100px]"
                      />
                      <span className="overflow-hidden">{blog.text}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
          <div className="flex justify-center px-2 pt-2 gap-2 items-center">
            <FontAwesomeIcon size="xs" icon={faChevronLeft} />
            <div>
              <span className="text-xs">1</span>
            </div>
            <FontAwesomeIcon size="xs" icon={faChevronRight} />
          </div>
        </div>
      </section>

      <section>
        <div className="bg-secondary-bg p-2 rounded-t-xl flex justify-between items-center">
          <span className="text-lg font-bold">Recipes</span>
          <FontAwesomeIcon icon={faBook} />
        </div>
        <div className="bg-secondary-bg p-2 mt-1 rounded-b-xl">
          <ul className="list-none w-full">
            {recipes.map((recipe, idx) => {
              return (
                <li className="w-full">
                  <div className="flex flex-col gap-1 py-1">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-1">
                        <span>{recipe.recipe_title}</span>
                        <span className="text-xs">
                          {recipe.user_first_name} {recipe.user_last_name}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <FontAwesomeIcon size="xs" icon={faEdit} />
                        <FontAwesomeIcon size="xs" icon={faTrash} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary-bg h-0.5 w-full"></div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center px-2 pt-2 gap-2 items-center">
            <FontAwesomeIcon size="xs" icon={faChevronLeft} />
            <div>
              <span className="text-sm">1</span>
            </div>
            <FontAwesomeIcon size="xs" icon={faChevronRight} />
          </div>
        </div>
      </section>
    </div>
  );
}
