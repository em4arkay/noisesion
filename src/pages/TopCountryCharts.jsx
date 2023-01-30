import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { selectCountryListId } from '../redux/features/playerSlice';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { countrys } from '../assets/constants';

const TopCountryCharts = () => {
  const dispatch = useDispatch();
  const { countryListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(countryListId || 'US');

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error) return <Error />;

  const countryName = countrys.find(({ value }) => value === countryListId)?.name;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold font-dmsans text-3xl text-white text-left">Top 50 {countryName || 'United States'}</h2>

        <select
          onChange={(e) => dispatch(selectCountryListId(e.target.value))}
          value={countryListId || 'US'}
          className="bg-black text-gray-300 px-5 py-3 font-dmsans text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {countrys.map((country) => <option key={country.value} value={country.value}>{country.name}</option>)}
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
