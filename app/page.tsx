import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "@/components/login/Login";

export default function Home() {
  return (
    
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Login></Login>
      </main>
    
  );
}
