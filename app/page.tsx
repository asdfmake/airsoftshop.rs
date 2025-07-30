import Navbar from "@/app/components/navbar/page";
import Image from "next/image";
import ListingPage from "./components/listing/page";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <ListingPage />
    </main>
  );
}
