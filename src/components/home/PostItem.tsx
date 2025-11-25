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
      <NavLink to={`/read/${id}`} className="block">
        <img
          src={thumbnail}
          alt={title}
          className="w-full max-w-full h-[16.625rem] object-cover"
        />
        <em className="flex justify-center items-center w-[4.5rem] h-[1.625rem] text-xs text-white bg-[#283a61] my-[0.325rem]">
          {category}
        </em>
        <h2 className="text-[1.3rem] font-bold">{title}</h2>
        <p className="text-sm text-[#515151] my-1">
          {username} • {format(regdate, "MMM dd, yyyy")}
        </p>
        <p className="text-sm text-[#434343] mb-4 overflow-hidden line-clamp-3">
          {desc}
        </p>
      </NavLink>
    </article>
  );
}
