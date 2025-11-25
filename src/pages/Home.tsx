import SearchArea from "../components/home/SearchArea";
import PostArea from "../components/home/PostArea";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center my-12 min-h-[calc(100vh-131px-128px-96px)] sm:min-h-[calc(100vh-114px-110px-96px)] md:min-h-[calc(100vh-131px-128px-96px)]">
      {/* Search  */}
      <SearchArea />
      {/* PostArea  */}
      <PostArea />
    </main>
  );
}
