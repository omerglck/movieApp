import {ScrollView, Image, Dimensions, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetMovieCredits,
  GetMovieDetails,
  GetSimilarMoviesState,
} from '../app/movieAction';
import {
  getMovieDetailState,
  getMovieCreditState,
  getSimilarMoviesState,
} from '../app/movieSelector';
import BackAndFavorite from '../components/BackAndFavorite';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from './MovieList';
const MovieScreen = () => {
  const dispatch = useDispatch();
  const {id} = useRoute().params;
  const {width, height} = Dimensions.get('window');
  useEffect(() => {
    dispatch(GetMovieDetails(id));
    dispatch(GetMovieCredits(id));
    dispatch(GetSimilarMoviesState(id));
  }, [id, dispatch]);

  const movieDetail = useSelector(getMovieDetailState());
  const movieCredits = useSelector(getMovieCreditState());
  const similarMovies = useSelector(getSimilarMoviesState());
  return (
    <ScrollView className="flex-1 bg-neutral-900 pb-5 ">
      <BackAndFavorite isAbsolute />
      <View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
          }}
          style={{width: width, height: height * 0.55}}
        />
        <LinearGradient
          colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
          style={{
            width: width,
            height: height * 0.4,
          }}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          className="absolute bottom-0"
        />
      </View>
      <View style={{marginTop: -height * 0.09}} className="space-y-3">
        {/* Movie Detail */}
        <Text className="text-white text-center font-semibold text-base tracking-wider ">
          {movieDetail?.title}
        </Text>
        {/* status,relase,runtime */}
        <Text className="text-neutral-400 font-semibold text-center text-base">
          {movieDetail?.status} | {movieDetail?.release_date?.split('-')[0]} |{' '}
          {movieDetail?.runtime} min
        </Text>
        {/* genres */}
        <View className="flex-row justify-center mx-4">
          {movieDetail?.genres?.map((genre, index) => {
            let showDot = index + 1 !== movieDetail?.genres?.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center">
                {genre.name}
                {showDot && ' •'}
                {'  '}
              </Text>
            );
          })}
        </View>
        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide mt-2">
          {movieDetail?.overview ||
            "Lorem Ipsum pasajlarının birçok çeşitlemesi vardır. Ancak bunların büyük bir çoğunluğu mizah katılarak veya rastgele sözcükler eklenerek değiştirilmişlerdir. Eğer bir Lorem Ipsum pasajı kullanacaksanız, metin aralarına utandırıcı sözcükler gizlenmediğinden emin olmanız gerekir. İnternet'teki tüm Lorem Ipsum üreteçleri önceden belirlenmiş metin bloklarını yineler. Bu da, bu üreteci İnternet üzerindeki gerçek Lorem Ipsum üreteci yapar. Bu üreteç, 200'den fazla Latince sözcük ve onlara ait cümle yapılarını içeren bir sözlük kullanır. Bu nedenle, üretilen Lorem Ipsum metinleri yinelemelerden, mizahtan ve karakteristik olmayan sözcüklerden uzaktır."}
        </Text>
      </View>
      {/* cast */}
      {movieCredits?.length > 0 && <Cast data={movieCredits} />}
      {/* similar movies */}
      {similarMovies?.length > 0 && (
        <MovieList title="Similar Movies" data={similarMovies} hideSeeAll />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
