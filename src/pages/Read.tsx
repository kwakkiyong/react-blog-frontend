import ReadArea from "../components/read/ReadArea";
import RecommendationArea from "../components/read/RecommendationArea";

export default function Read() {
  return (
    <main className="flex flex-col items-center my-12 min-h-[calc(100vh-131px-128px-96px)] sm:min-h-[calc(100vh-114px-110px-96px)] md:min-h-[calc(100vh-131px-128px-96px)]">
      {/* ReadArea  */}
      <ReadArea />
      {/* RecommendationArea  */}
      <RecommendationArea />
    </main>
  );
}
