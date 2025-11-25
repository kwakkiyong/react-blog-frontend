import { NavLink } from "react-router";
import { axiosInstance } from "../api/axiosInstance";
import { useAuthStore } from "../stores/useAuthStore";
import axios from "axios";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const unsetAuth = useAuthStore((state) => state.unsetAuth);
  const handleLogout = async () => {
    try {
      const { status } = await axiosInstance.post("/logout");
      if (status === 200) {
        unsetAuth();
      } else {
        throw new Error("로그아웃에 실패했습니다.");
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

  return (
    <header className="flex justify-between items-center py-12">
      <h1 className="text-2xl font-bold">
        <NavLink to="/" className="text-inherit no-underline">
          Kiyong's Blog
        </NavLink>
      </h1>
      <nav>
        <ul className="flex items-center justify-around gap-[1.125rem]">
          {user && (
            <li>
              <NavLink
                to="/write"
                className="text-base text-[#605c59] border-none cursor-pointer"
              >
                글쓰기
              </NavLink>
            </li>
          )}
          <li>
            {user && (
              <button
                className="text-base text-[#605c59] border-none cursor-pointer bg-transparent"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
