import { useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [pageType, setPageType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { toast } = useToast();

  // 로그인 & 회원가입 탭 전환
  const handlePageChange = (type: string) => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setUsername("");
    setPageType(type);
  };

  // 로그인
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/login", {
        email,
        password,
      });
      setAuth(data.user, data.accessToken);
      toast({
        title: "로그인 성공",
        description: "환영합니다!",
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message ?? error.message;
        toast({
          title: "로그인 실패",
          description: msg,
          variant: "error",
        });
      } else if (error instanceof Error) {
        toast({
          title: "로그인 실패",
          description: error.message,
          variant: "error",
        });
      } else {
        toast({
          title: "로그인 실패",
          description: "알 수 없는 이유로 실패했습니다.",
          variant: "error",
        });
      }
    }
  };

  // 회원가입
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 공백인 항목 존재할 때
      if (email === "" || password === "" || username === "") {
        toast({
          title: "입력 오류",
          description: "모든 항목을 입력해 주세요.",
          variant: "error",
        });
        return;
      }

      // 비밀번호, 비밀번호 확인이 일치하지 않을 때
      if (password !== passwordConfirm) {
        toast({
          title: "비밀번호 오류",
          description: "비밀번호가 일치하지 않습니다.",
          variant: "error",
        });
        return;
      }

      // 사용자 정보 등록
      const { data } = await axiosInstance.post("/register", {
        email,
        password,
        username,
      });

      if (data) {
        toast({
          title: "회원가입 완료",
          description: "회원가입을 완료했습니다.",
          variant: "success",
        });
        setPassword("");
        setPasswordConfirm("");
        setUsername("");
        setPageType("login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message ?? error.message;
        toast({
          title: "회원가입 실패",
          description: msg,
          variant: "error",
        });
      } else if (error instanceof Error) {
        toast({
          title: "회원가입 실패",
          description: error.message,
          variant: "error",
        });
      } else {
        toast({
          title: "회원가입 실패",
          description: "알 수 없는 이유로 실패했습니다.",
          variant: "error",
        });
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center my-12 min-h-[calc(100vh-131px-128px-96px)] sm:min-h-[calc(100vh-114px-110px-96px)] md:min-h-[calc(100vh-131px-128px-96px)]">
      <article className="flex flex-col space-y-5 justify-center items-center">
        <div className="font-serif text-center bg-secondary">
          <h2 className="text-3xl lg:text-[2.25rem] font-bold mb-2">
            The Kiyong's Blog
          </h2>
          <p className="text-lg sm:text-[1.125rem] lg:text-[1.35rem] text-[#605c59]">
            This blog can record everything in life.
          </p>
        </div>
        <section className="w-full max-w-[400px] bg-white rounded-lg shadow-md overflow-hidden">
          <nav className="flex bg-black">
            <button
              id="login-tab"
              className={`flex-1 px-4 py-[15px] border-none bg-black text-white cursor-pointer transition-colors ${
                pageType === "login" ? "" : "bg-gray-400"
              }`}
              onClick={() => handlePageChange("login")}
            >
              로그인
            </button>
            <button
              id="signup-tab"
              className={`flex-1 px-4 py-[15px] border-none bg-black text-white cursor-pointer transition-colors ${
                pageType === "register" ? "" : "bg-gray-400"
              }`}
              onClick={() => handlePageChange("register")}
            >
              회원가입
            </button>
          </nav>

          <div className="p-[30px]">
            <form
              className={`${pageType === "login" ? "block" : "hidden"}`}
              id="login-form"
              onSubmit={handleLogin}
            >
              <label htmlFor="login-email" className="sr-only">
                이메일
              </label>
              <input
                type="email"
                id="login-email"
                className="w-full px-3 py-3 mb-[15px] border border-[#ddd] rounded"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="login-password" className="sr-only">
                비밀번호
              </label>
              <input
                type="password"
                id="login-password"
                className="w-full px-3 py-3 mb-[15px] border border-[#ddd] rounded"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full px-3 py-3 bg-black text-white border-none rounded cursor-pointer transition-colors hover:bg-[#333]"
              >
                로그인
              </button>
            </form>

            <form
              className={`${pageType === "register" ? "block" : "hidden"}`}
              id="signup-form"
              onSubmit={handleSignup}
            >
              <label htmlFor="signup-email" className="sr-only">
                이메일
              </label>
              <input
                type="email"
                id="signup-email"
                className="w-full px-3 py-3 mb-[15px] border border-[#ddd] rounded"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="signup-name" className="sr-only">
                이름
              </label>
              <input
                type="text"
                id="signup-name"
                className="w-full px-3 py-3 mb-[15px] border border-[#ddd] rounded"
                placeholder="이름"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="signup-password" className="sr-only">
                비밀번호
              </label>
              <input
                type="password"
                id="signup-password"
                className="w-full px-3 py-3 mb-[15px] border border-[#ddd] rounded"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label htmlFor="signup-confirm-password" className="sr-only">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                className="w-full px-3 py-3 mb-[15px] border border-[#ddd] rounded"
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full px-3 py-3 bg-black text-white border-none rounded cursor-pointer transition-colors hover:bg-[#333]"
              >
                회원가입
              </button>
            </form>
          </div>
        </section>
      </article>
    </main>
  );
}
