import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "../../stores/useAuthStore";
import { useAxios } from "../../hooks/useAxios";
import { axiosInstance } from "../../api/axiosInstance";
import axios from "axios";
import { format } from "date-fns";

export default function ReadArea() {
  const params = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((store) => store.user);
  const {
    data: { category, title, username, thumbnail, desc, author, regdate },
    isLoading,
    error,
  } = useAxios<Post>(`/posts/${params.id}`, {} as Post);
  const handleDelete = async () => {
    try {
      const { status } = await axiosInstance.delete(`/posts/${params.id}`);
      if (status === 204) {
        alert("삭제되었습니다.");
        navigate("/");
      } else {
        throw new Error("삭제에 실패했습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message ?? error.message;
        alert(msg);
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알 수 없는 이유로 실패했습니다.");
      }
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <>
      <article className="w-full max-w-[800px]">
        <section>
          <strong className="flex justify-center items-center text-white w-[4.5rem] h-[1.625rem] text-xs bg-[#283a61] my-[0.325rem]">
            {category}
          </strong>
          <h2 className="font-bold text-2xl sm:text-[1.625rem] md:text-[1.825rem]">
            {title}
          </h2>
          <div className="flex justify-between">
            <p className="text-sm text-[#515151] my-1">
              {username} • {format(regdate, "MMM dd, yyyy")}
            </p>
            {user?.email === author && (
              <button
                className="bg-transparent border-none text-[#605c59] underline cursor-pointer"
                onClick={handleDelete}
              >
                삭제
              </button>
            )}
          </div>
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-[280px] object-cover"
          />
        </section>
        <section className="mt-5 text-lg leading-7 max-w-[800px] text-[#434343] sm:text-base">
          <pre className="mb-4 whitespace-pre-wrap font-sans">{desc}</pre>
        </section>
      </article>
    </>
  );
}
