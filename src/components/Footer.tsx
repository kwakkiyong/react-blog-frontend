import { SiGithub, SiNotion } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center gap-10 py-8 mb-5 bg-gray-200">
      <p className="text-[#605c59]">
        &copy; 2025, Kiyong's Blog made with React
      </p>
      <div className="flex gap-5">
        <button
          onClick={() => window.open("https://github.com/kwakkiyong", "_blank")}
        >
          <SiGithub className="w-6 h-6 text-[#605c59] hover:opacity-100 transition" />
        </button>
        <button onClick={() => window.open("https://www.notion.so/", "_blank")}>
          <SiNotion className="w-6 h-6 text-[#605c59] hover:opacity-100 transition" />
        </button>
      </div>
    </footer>
  );
}
