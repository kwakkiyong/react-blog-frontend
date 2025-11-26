import { useEffect, useRef, useState } from "react";
import { search } from "../../assets/images/images";
import { useNavigate, useSearchParams } from "react-router";

export default function SearchArea() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const debounceTimer = useRef<null | number>(null);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current); // 이전 타이머 취소
    }
    debounceTimer.current = setTimeout(() => {
      // 디바운스: 입력 300ms 후에 검색 수행
      navigate(query ? "?q=" + query : "/");
    }, 300);
    return () => {
      // 클린업: 컴포넌트 언마운트 시 타이머 취소
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [navigate, query]); // query가 변경될 때마다 실행

  return (
    <>
      <section className="mb-5">
        <article className=" text-center">
          <h2 className="font-serif text-3xl lg:text-[2.25rem] font-bold mb-2">
            The Kiyong's Blog
          </h2>
          <p className="font-serif text-lg sm:text-[1.125rem] lg:text-[1.35rem] text-[#605c59] mb-4">
            This blog can record everything in life.
          </p>
          <form
            className="flex justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-[40%] sm:w-[35%] md:w-[30%]">
              <input
                type="text"
                name="q"
                placeholder="Search"
                className="w-full py-2 pl-4 pr-10 border border-[#605c59] rounded h-[2.8125rem]"
                autoComplete="off"
                value={query}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 border-none bg-transparent outline-none p-1"
              >
                <img src={search} alt="search-icon" className="w-5 h-5" />
              </button>
            </div>
          </form>
        </article>
      </section>
    </>
  );
}
