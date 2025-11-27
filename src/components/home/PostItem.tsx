import { format } from "date-fns";
import { NavLink } from "react-router";

export default function PostItem({
  id,
  title,
  category,
  desc,
  thumbnail,
  username,
  regdate,
}: Post) {
  return (
    <article>
      <NavLink to={`/read/${id}`} className="block group border-b pb-5">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 min-h-[180px] md:h-[140px]">
          <div className="flex-1 md:w-[60%] flex flex-col justify-between min-w-0">
            <div className="min-w-0">
              <em className="inline-flex justify-center items-center w-[4.5rem] h-[1.625rem] text-xs text-white bg-[#283a61] my-[0.325rem]">
                {category}
              </em>
              <h2 className="mb-2 overflow-hidden line-clamp-2 group-hover:underline break-words">
                {title}
              </h2>
              <p className="text-sm text-gray-400 overflow-hidden line-clamp-2 md:line-clamp-3 group-hover:underline break-words">
                {desc}
              </p>
            </div>
            <p className="text-sm text-[#515151] mt-auto">
              {username} • {format(regdate, "MMM dd, yyyy")}
            </p>
          </div>
          {thumbnail && (
            <div className="w-full md:w-[25%] flex-shrink-0 md:h-full h-[200px]">
              <img
                src={
                  thumbnail ? thumbnail : "/src/assets/icon/no-img-icon-p.png"
                }
                alt={title}
                className="w-full h-full object-cover rounded"
              />
            </div>
          )}
        </div>
      </NavLink>
    </article>
  );
}
