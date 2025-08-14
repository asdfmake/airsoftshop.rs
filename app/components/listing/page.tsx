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
  const offers = await prisma.offer.findMany();

  // getting error while trying to querry the offers:
  // 
  // {
  //   where: {
  //     AND: [
  //       { title: { contains: params.search || '', mode: 'insensitive' } },
  //       { category: { equals: params.category || '' } },
  //       { condition: { equals: params.condition || '' } },
  //       { price: { gte: Number(params.priceMin) || 0, lte: Number(params.priceMax) || 10000 } },
  //     ],
  //   },
  // }

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
