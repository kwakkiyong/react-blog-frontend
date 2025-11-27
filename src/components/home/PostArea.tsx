import { useAxios } from "@/hooks/useAxios.ts";
import PostItem from "./PostItem";
import PostBlank from "./PostBlank";
import { NavLink, useSearchParams } from "react-router";

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
          className="flex text-[15px] text-[#605c59] border-none cursor-pointer"
        >
          글쓰기
        </NavLink>
      </div>
      <div className="flex flex-col gap-6">
        {data.length !== 0 ? (
          data.map((post) => <PostItem key={post.id} {...post} />)
        ) : (
          <PostBlank />
        )}
      </div>
    </section>
  );
}
