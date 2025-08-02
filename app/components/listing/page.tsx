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
  // const offers = await prisma.offer.findMany({
  //   where: {
  //     AND: [
  //       { title: { contains: params.search || '', mode: 'insensitive' } },
  //       { category: { equals: params.category || '' } },
  //       { condition: { equals: params.condition || '' } },
  //       { price: { gte: Number(params.priceMin) || 0, lte: Number(params.priceMax) || 10000 } },
  //     ],
  //   },
  // });

  // able to use prisma here now!

  return (
    <main>
      <ListingFilters SearchParams={params} />
      <div>
        <p>Ovde bi trebalo da ide lista proizvoda</p>
      </div>
    </main>
  );
}
