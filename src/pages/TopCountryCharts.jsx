import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { countries } from '../assets/constants'; 

const TopCountryCharts = () => {
  const [country, setCountry] = useState('US');
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery({
    countryCode: country,
    skip: !country,
  });

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const countryName = countries.find((c) => c.value === country)?.title;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold font-dmsans text-3xl text-white text-left">Top 50 {countryName || 'United States'}</h2>
        <select
          onChange={handleCountryChange}
          value={country}
          className="bg-black text-white p-3 text-sm font-dmsans rounded-lg outline-none sm:mt-0 mt-5"
        >
          {countries.map((c) => <option key={c.value} value={c.value}>{c.title}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap font-dmsans sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCountryCharts;
