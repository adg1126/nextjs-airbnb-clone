import React from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/dist/client/router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

export default function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formatDate = date => format(new Date(date), 'dd MMMM yy');

  const range = `${formatDate(startDate)} - ${formatDate(endDate)}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            300+ Stays - {range} - for {noOfGuests} guests
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>
            Stays in {location}
          </h1>

          <div
            className='hidden lg:inline-flex mb-5 space-x-3 
          text-gray-800 whitespace-nowrap'
          >
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beds</p>
            <p className='button'>More filters</p>
          </div>

          <div className='flex flex-col'>
            {searchResults?.map((item, i) => (
              <InfoCard key={i} {...item} />
            ))}
          </div>
        </section>

        <section className='hidden xl:inline-flex xl:min-w-[600px]'>
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const searchResults = await fetch('https://jsonkeeper.com/b/5NPS').then(res =>
    res.json()
  );

  return { props: { searchResults } };
}
