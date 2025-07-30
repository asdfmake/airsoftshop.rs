import ListingCard from '../card/page';
import ListingFilters from './listingFilters';

export default async function ListingPage() {
  
  
  return (
    <main>
        {/* Prvo idu filteri za listanje, a ispod njih su proizvodi */}
        <ListingFilters />


        <div>
          Ovde bi trebalo da ide lista proizvoda
        </div>
    </main>
  );
}