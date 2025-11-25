import { useAxios } from "../../hooks/useAxios";
import PostItem from "./PostItem";
import { useSearchParams } from "react-router";

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
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
      {data && data.map((post) => <PostItem key={post.id} {...post} />)}
    </section>
  );
}
