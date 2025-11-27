import { NavLink } from "react-router";

export default function RecommendationItem({ id, title, thumbnail }: Post) {
  return (
    <li className="flex-1 min-w-0 max-w-[calc(25%-12px)]">
      <NavLink to={`/read/${id}`}>
        <div className="flex flex-col gap-3">
          {/* 정사각형 이미지 */}
          <div className="w-full aspect-square overflow-hidden rounded-md">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* 제목 (최대 2줄) */}
          <h4 className="text-gray-500 text-[1.3rem] leading-7 font-semibold sm:text-base text-center line-clamp-1">
            {title}
          </h4>
        </div>
      </NavLink>
    </li>
  );
}
