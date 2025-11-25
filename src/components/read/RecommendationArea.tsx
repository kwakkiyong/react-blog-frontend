import { useParams } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import RecommendationItem from "./RecommendationItem";

export default function RecommendationArea() {
  const params = useParams();
  const { data, isLoading, error } = useAxios<Post[]>(
    `/posts/${params.id}/related`,
    []
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (data.length === 0) return null;

  return (
    <>
      <article className="w-full max-w-[800px] my-4">
        <h3 className="font-bold text-[1.8rem] mb-5 sm:text-2xl">
          Recommend Reading
        </h3>
        <ul>
          {/* RecommendationItem  */}
          {data &&
            data.map((post) => <RecommendationItem key={post.id} {...post} />)}
        </ul>
      </article>
    </>
  );
}
