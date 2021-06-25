import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';

const PhotoList = ({route}) => {
  console.log('functional photolist', route.params.albumId);
  const [photoset, setPhotos] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () =>{
      const { data } = await axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${route.params.albumId}&user_id=137290658%40N08&format=json&nojsoncallback=1`,
      );

      setPhotos(data.photoset.photo);
    }
      fetchPhotos();
  }, []);

  const renderItem = ({item}) => (
      <PhotoDetail
        key={item.title}
        title={item.title}
        imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`}
      />
  )

  if (!photoset) {
    return (
      <View style={{flex: 1}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList 
        data={photoset} 
        renderItem={renderItem}
      />
    </View>
  );
}

export default PhotoList;