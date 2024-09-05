import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai"

const apikey = "906bf2a331aebd2706ba7cf027a04137";
const url = "https://api.themoviedb.org/3";
const imgurl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowplaying = "now_playing";
const Popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => (
  <img className='card' src={img} alt="cover" />
);

const Row = ({ title, arr }) => (
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgurl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setupcomingMovies] = useState([]);
  const [nowplayingMovies, setnowplayingMovies] = useState([]);
  const [popularMovies, setpopularMovies] = useState([]);
  const [topRatedMovies, settopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}&page=2`);
      setupcomingMovies(results);
    };

    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowplaying}?api_key=${apikey}`);
      setnowplayingMovies(results);
    };

    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${Popular}?api_key=${apikey}`);
      setpopularMovies(results);
    };

    const fetchTopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`);
      settopRatedMovies(results);
    };

    const getAllGenre = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);
      setGenre(genres);
    };

    getAllGenre();
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();

  }, []);

  return (
    <section className="home">
      <div className="banner" style={{
        backgroundImage:popularMovies[0]?`url(${`${imgurl}/${popularMovies[0].poster_path}`})`:"rgb(16,16,16)"}}>
        {
          popularMovies[0]&&( <h1>{popularMovies[0].original_title}</h1>)
        }
         {
          popularMovies[0]&&(
            <p>{popularMovies[0].overview}</p>
          )
         }
        <div>
        <button><BiPlay/>Play </button>
         <button>MyList <AiOutlinePlus/></button>
        </div>
         

        </div>
      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowplayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
      <div className='genrebox'>
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
