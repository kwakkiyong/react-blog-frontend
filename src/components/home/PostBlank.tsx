import { SearchIcon } from "lucide-react";

export default function PostBlank() {
  return (
    <div className="rounded-lg px-3 py-10 text-center">
      <div className="flex flex-col items-center justify-center text-sm text-gray-500">
        <SearchIcon className="mb-2 h-8 w-8 text-gray-300" />
        <p className="mb-1 text-sm text-gray-500">
          등록된 게시글이 존재하지 않습니다.
        </p>
      </div>
    </div>
  );
}
