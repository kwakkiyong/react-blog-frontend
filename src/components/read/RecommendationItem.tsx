import { NavLink } from "react-router";

export default function RecommendationItem({
  id,
  title,
  desc,
  thumbnail,
}: Post) {
  return (
    <li className="my-5">
      <NavLink to={`/read/${id}`}>
        <div className="flex flex-col gap-4 sm:flex-row">
          <img
            src={thumbnail}
            alt={title}
            className="max-w-full rounded-md sm:max-w-[250px]"
          />
          <div>
            <h4 className="mb-2 text-[1.325rem] leading-7 font-bold sm:text-lg">
              {title}
            </h4>
            <p className="text-base leading-6 text-[#4b4b4b] overflow-hidden line-clamp-4">
              {desc}
            </p>
          </div>
        </div>
      </NavLink>
    </li>
  );
}
