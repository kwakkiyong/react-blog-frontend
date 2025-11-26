import { NavLink, useNavigate } from "react-router";
import { axiosInstance } from "../api/axiosInstance";
import { useAuthStore } from "../stores/useAuthStore";
import axios from "axios";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast.ts";

export default function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const unsetAuth = useAuthStore((state) => state.unsetAuth);

  const handleLogout = async () => {
    try {
      const { status } = await axiosInstance.post("/logout");
      if (status === 200) {
        unsetAuth();
        toast({
          title: "로그아웃 성공",
          description: "로그아웃하였습니다.",
          variant: "success",
        });
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
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button className="flex cursor-pointer items-center space-x-1 bg-gray-200 rounded-full p-2 hover:bg-gray-300 active:bg-gray-400 transition-colors">
              <div className="flex items-center justify-center text-[#737373]">
                <User className="h-5 w-5" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-24">
            <DropdownMenuItem
              onClick={() => navigate("/auth")}
              disabled={user !== null}
              className="cursor-pointer"
            >
              로그인
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={!user}
              className="cursor-pointer"
            >
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
