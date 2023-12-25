import {
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Logo from '../components/Logo';
import {useNavigation} from '@react-navigation/native';
import {AppScreens} from '../navigation/types';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from './MovieList';
import {GetUpcomingMovies, GetTopRatedMovies} from '../app/movieAction';
import {useDispatch, useSelector} from 'react-redux';
import {getTopRatedState, getUpcomingState} from '../app/movieSelector';
getUpcomingState;
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUpcomingMovies());
    dispatch(GetTopRatedMovies());
  }, [dispatch]);

  const upcomingMovies = useSelector(getUpcomingState());
  // console.log('upcoming', JSON.stringify(console.log(upcomingMovies, null, 4)));
  const topRatedMovies = useSelector(getTopRatedState());
  console.log(JSON.stringify(topRatedMovies, null, 4));
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="mb-3">
        <StatusBar barStyle="light-content" />
        <View className="flex-row justify-between px-4 items-center">
          <Icon name="menuunfold" size={30} color="#fff" />
          <Logo />
          <TouchableOpacity
            onPress={() => navigation.navigate(AppScreens.Search)}>
            <Icon name="search1" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView>
        {/* trending movies */}
        <TrendingMovies />
        {/* upcoming movies */}
        <MovieList title="Upcoming" data={upcomingMovies} />
        {/* toprated movies */}
        <MovieList title="Top Rated" data={topRatedMovies} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
