import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/Home.tsx";
import Auth from "./pages/Auth.tsx";
import Write from "./pages/Write.tsx";
import Read from "./pages/Read.tsx";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout.tsx";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.tsx";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route element={<UnauthenticatedLayout />}>
            <Route path="/auth" element={<Auth />} />
          </Route>
          <Route element={<AuthenticatedLayout />}>
            <Route path="/write" element={<Write />} />
          </Route>
          <Route path="/read/:id" element={<Read />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
