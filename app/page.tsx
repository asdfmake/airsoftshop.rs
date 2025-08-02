// app/page.tsx (root page)
import Navbar from "@/app/components/navbar/page";
import ListingPage from "./components/listing/page";

interface RootPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default function Home({ searchParams }: RootPageProps) {
  return (
    <main>
      <Navbar />
      <ListingPage searchParams={searchParams} />
    </main>
  );
}
