import { useAxios } from "@/hooks/useAxios.ts";
import PostItem from "./PostItem";
import { NavLink, useSearchParams } from "react-router";
import { SearchIcon } from "lucide-react";

const BlankPosts = () => (
  <div className="rounded-lg px-3 py-5 text-center">
    <div className="flex flex-col items-center justify-center text-sm text-gray-500">
      <SearchIcon className="mb-2 h-8 w-8 text-gray-300" />
      <p className="mb-1 text-sm text-gray-500">
        등록된 게시글이 존재하지 않습니다.
      </p>
    </div>
  </div>
);

export default function PostArea() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { data, error, isLoading } = useAxios<Post[]>(
    q ? "/posts/search?title=" + q : "/posts",
    []
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <section className="flex flex-col space-y-5">
      <div className="border-b-2 justify-between text-sm py-4 font-semibold flex gap-2">
        <div className="flex gap-2">
          <p>전체 글</p>
          <span className="text-red-600">{data.length}</span>
        </div>
        <NavLink
          to="/write"
          className="text-base text-[#605c59] border-none cursor-pointer"
        >
          글쓰기
        </NavLink>
      </div>
      <div className="flex flex-col gap-6">
        {data.length !== 0 ? (
          data.map((post) => <PostItem key={post.id} {...post} />)
        ) : (
          <BlankPosts />
        )}
      </div>
    </section>
  );
}
