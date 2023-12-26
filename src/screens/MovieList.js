import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';

import MovieListItem from '../components/MovieListItem';

export default function MovieList({title, data, hideSeeAll}) {
  return (
    <View className="my-8 space-y-4">
      <View className="flex-row mx-4 justify-between items-center">
        <Text className="text-white text-lg">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-[#eab308] text-lg">See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
        horizontal
        className="rounded-xl"
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={({item}) => <MovieListItem movie={item} key={item.id} />}
      />
    </View>
  );
}
