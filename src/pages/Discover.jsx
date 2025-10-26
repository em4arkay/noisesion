import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { genres, countries } from '../assets/constants';

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const [country, setCountry] = useState('US');

  const { data, isFetching, error } = useGetSongsByGenreQuery({
    genre: genreListId || 'POP',
    countryCode: country,
  }, {
    skip: !country,
  });

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title || 'Pop';

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold font-dmsans text-3xl text-white text-left">Discover {genreTitle}</h2>

        <div className="flex gap-4">
          <select
            onChange={handleCountryChange}
            value={country}
            className="bg-black text-white p-3 text-sm font-dmsans rounded-lg outline-none sm:mt-0 mt-5"
          >
            {countries.map((c) => <option key={c.value} value={c.value}>{c.title}</option>)}
          </select>

          <select
            onChange={(e) => dispatch(selectGenreListId(e.target.value))}
            value={genreListId || 'pop'}
            className="bg-black text-white p-3 text-sm font-dmsans rounded-lg outline-none sm:mt-0 mt-5"
          >
            {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
          </select>
        </div>
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

export default Discover;
