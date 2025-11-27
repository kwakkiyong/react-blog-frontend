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

  // 최대 4개까지만 표시 (한 줄만 출력)
  const displayData = data.slice(0, 4);

  return (
    <>
      <article className="border-t w-full max-w-[800px] pt-5 my-4">
        <h3 className="text-gray-500 font-bold text-[1.3rem] mb-5 sm:text-base">
          관련 게시글
        </h3>
        <ul className="flex flex-wrap gap-4">
          {/* RecommendationItem  */}
          {displayData &&
            displayData.map((post) => (
              <RecommendationItem key={post.id} {...post} />
            ))}
        </ul>
      </article>
    </>
  );
}
