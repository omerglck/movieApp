import {createAsyncThunk} from '@reduxjs/toolkit';
import {getTopRatedMovies, getTrendingMovies, getUpcomingMovies} from '../api';
import {
  setTopRatedState,
  setTrendingState,
  setUpcomingState,
} from './movieSlice';

export const GetTrendingMovies = createAsyncThunk(
  'movie/getTrendingMovies',
  async (_, {dispatch}) => {
    const response = await getTrendingMovies();
    // console.log(JSON.stringify(response, null, 2));
    dispatch(setTrendingState(response.results));
  },
);
export const GetUpcomingMovies = createAsyncThunk(
  'movie/getUpcomingMovies',
  async (_, {dispatch}) => {
    const response = await getUpcomingMovies();
    // console.log(JSON.stringify(response, null, 2));
    dispatch(setUpcomingState(response.results));
  },
);
export const GetTopRatedMovies = createAsyncThunk(
  'movie/getTopRatedMovies',
  async (_, {dispatch}) => {
    const response = await getTopRatedMovies();
    // console.log(JSON.stringify(response, null, 2));
    dispatch(setTopRatedState(response.results));
  },
);
