import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getTrendingState} from '../app/movieSelector';
import {useEffect} from 'react';
import {GetTrendingMovies} from '../app/movieAction';
import Carousel from 'react-native-snap-carousel';
import MovieCard from './MovieCard';

export default function TrendingMovies() {
  const {width, height} = Dimensions.get('window');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetTrendingMovies());
  }, [dispatch]);

  const trendingMovies = useSelector(getTrendingState());
  return (
    <View>
      <Carousel
        data={trendingMovies}
        renderItem={({item}) => <MovieCard movie={item} />}
        firstItem={2}
        inactiveSlideScale={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
      />
    </View>
  );
}
