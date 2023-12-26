import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {AppScreens} from '../navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {GetSearchMovies} from '../app/movieAction';
import {getSearchResultsState} from '../app/movieSelector';
import MovieListItem from '../components/MovieListItem';
export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchTextModified = searchText
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '');
    dispatch(GetSearchMovies(searchTextModified));
  }, [searchText, dispatch]);

  const searchResults = useSelector(getSearchResultsState());
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500  rounded-full">
        <TextInput
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="py-2 px-6  text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          className="p-2 m-1 bg-neutral-700 rounded-full"
          onPress={() => navigation.navigate(AppScreens.Home)}>
          <Icon name="close" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      {searchResults?.length > 0 && (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
            paddingHorizontal: 15,
          }}
          className="space-y-3">
          <Text className="text-white font-semibold ml-1">
            Result Length: ({searchResults?.length})
          </Text>
          <View className="flex-row justify-between flex-wrap px-5">
            {searchResults?.map((movie, index) => (
              <MovieListItem searchPage movie={movie} key={index} />
            ))}
          </View>
        </ScrollView>
      )}
      {searchResults?.length === 0 && (
        <View className="items-center justify-center">
          {/* <Text className="mt-2 text-white font-bold px-3 text-center">
            Aradığını film bulunamadı. Lütfen farklı bir film aratınız.
          </Text> */}
          <Image
            source={require('../assets/images/movieTime.png')}
            className="w-96 h-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
