import { useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../api/axiosInstance";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { toast } from "@/hooks/use-toast.ts";

export default function Write() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [desc, setDesc] = useState<string>("");
  const username = useAuthStore((state) => state.user?.username);

  const encodeFileToBase64 = (image: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => {
        const target = event.target as FileReader | null;
        if (target && target.result) {
          resolve(target.result);
        } else {
          reject(new Error("File reading failed"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (event.target.files && event.target.files[0]) || null;
    if (!file) return;
    const convertedFile = await encodeFileToBase64(file);
    setThumbnail(convertedFile as string);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!title || !category || !thumbnail || !desc || !username) {
        alert("입력 값이 누락되었습니다.");
        return;
      }
      const { status } = await axiosInstance.post("/posts", {
        title,
        category,
        thumbnail,
        desc,
        username,
      });
      if (status === 201) {
        toast({
          title: "게시글 등록 성공",
          description: "게시글이 등록되었습니다.",
          variant: "success",
        });
        navigate("/");
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
    <>
      <main className="flex flex-col items-center justify-center my-12 min-h-[calc(100vh-131px-128px-96px)] sm:min-h-[calc(100vh-114px-110px-96px)] md:min-h-[calc(100vh-131px-128px-96px)]">
        <div className="pl-4 pr-4 pt-8 pb-8 max-w-[42rem] w-full">
          <h2 className="mb-4 text-xl leading-7 font-bold text-[#111827]">
            새로운 글 작성
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm leading-5 font-medium text-[#111827]"
                >
                  제목
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block px-2.5 py-2.5 rounded-lg border border-[#d1d5db] w-full text-sm leading-5 text-[#111827] bg-[#f9fafb]"
                  placeholder="Type product name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm leading-5 font-medium text-[#111827]"
                >
                  카테고리
                </label>
                <select
                  id="category"
                  className="block px-2.5 py-2.5 rounded-lg border border-[#d1d5db] w-full text-sm leading-5 text-[#111827] bg-[#f9fafb]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Life">Life</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="writer"
                  className="block mb-2 text-sm leading-5 font-medium text-[#111827]"
                >
                  작성자
                </label>
                <input
                  type="text"
                  name="writer"
                  id="writer"
                  className="block px-2.5 py-2.5 rounded-lg border border-[#d1d5db] w-full text-sm leading-5 text-[#111827] bg-[#f9fafb] disabled:bg-gray-200"
                  placeholder="Type product name"
                  value={username}
                  disabled={true}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <div>
                  <label
                    htmlFor="item-weight"
                    className="block mb-2 text-sm leading-5 font-medium text-[#111827]"
                  >
                    썸네일
                  </label>
                  <label
                    className="hidden mb-2 text-sm leading-5 font-medium text-[#111827]"
                    htmlFor="user_avatar"
                  >
                    Upload file
                  </label>
                  <input
                    className="block rounded-lg border border-[#d1d5db] w-full text-sm leading-5 text-[#111827] cursor-pointer h-[42px] p-[7px] bg-[#f9fafb]"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm leading-5 font-medium text-[#111827]"
                >
                  내용
                </label>
                <textarea
                  id="description"
                  className="block px-2.5 py-2.5 rounded-lg border border-[#d1d5db] w-full h-60 text-sm leading-5 text-[#111827] bg-[#f9fafb]"
                  placeholder="Your description here"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex py-2.5 px-5 mt-4 items-center rounded-lg border border-[#d1d5db] text-sm leading-5 font-medium text-center"
            >
              글등록
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
