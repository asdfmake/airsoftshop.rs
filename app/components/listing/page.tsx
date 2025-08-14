// listing/page.tsx
import ListingCard from '../card/page';
import ListingFilters from './listingFilters';
import prisma from '@/prisma/prisma';

interface ListingPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ListingPage({ searchParams }: ListingPageProps) {
  let params = JSON.parse(JSON.stringify(await searchParams));
  const filters: any = {};

  if (params.search) {
    filters.title = { contains: params.search, mode: "insensitive" };
  }

  if (params.category) {
    filters.category = { equals: params.category };
  }

  if (params.condition) {
    filters.condition = { equals: params.condition };
  }

  // Price filter is optional
  filters.price = {
    gte: params.priceMin ? Number(params.priceMin) : 0,
    lte: params.priceMax ? Number(params.priceMax) : 99999999999,
  };

  const offers = await prisma.offer.findMany({
    where: filters,
  });


  return (
    <main>
      <ListingFilters SearchParams={params} />
      <div>
        {offers.map((offer) => (
          <ListingCard
            key={offer.id}
            images={offer.pictures}
            title={offer.title}
            description={offer.description}
            condition={offer.condition}
            category={offer.category}
            contact={offer.contact}
            price={offer.price}
          />
        ))}  
      </div>
    </main>
  );
}
