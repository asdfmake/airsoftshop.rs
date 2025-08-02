// listing/page.tsx
import ListingCard from '../card/page';
import ListingFilters from './listingFilters';

interface ListingPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ListingPage({ searchParams }: ListingPageProps) {
  let params = JSON.parse(JSON.stringify(await searchParams));
  console.log("Search params on server:", params);

  return (
    <main>
      <ListingFilters SearchParams={params} />
      <div>
        <p>Ovde bi trebalo da ide lista proizvoda</p>
      </div>
    </main>
  );
}
