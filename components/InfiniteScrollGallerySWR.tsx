import React, { useState, useEffect, FC } from 'react';
import { View, Image, FlatList, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import IPhoto from '../interfaces/IPhoto';
import useSWRInfinite from "swr/infinite"
import { Link } from 'expo-router';


interface InfiniteScrollGalleryProps {
    query: string,
    color: string,
    orientation: string
}

const InfiniteScrollImages = ({ query, color, orientation }: InfiniteScrollGalleryProps) => {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.results) return null
        return `https://api.unsplash.com/search/photos?page=${pageIndex + 1}&query=${query}${color ? `&color=${color}` : ""}${orientation ? `&orientation=${orientation}` : ""}&per_page=18&client_id=bPfgiIw4vW72MUt72sWrzfIR4KSMdhe3J0brvyZqoCs`
    }

    const { data, size, setSize } = useSWRInfinite(getKey, fetcher)
    const [images, setImages] = useState<IPhoto[]>([]);

    useEffect(()=> {
        let img: IPhoto[] = []
        data?.forEach(resultSet => {
            resultSet.results.forEach((item: IPhoto) => {
                img.push(item)
            });
        })
        setImages(img)
    }, [data])


    const renderImage = ({ item }: { item: IPhoto }) => (
        <Link 
            href={{
                pathname: '/imageDetail',
                params: {
                    image: encodeURIComponent(item.urls.regular),
                    user: item.user.username,
                    likes: item.likes,
                    description: item.description,
                    id: item.id
                }
            }} 
            asChild>
            <Pressable>
                <Image source={{ uri: item.urls.thumb }} style={styles.image} />
            </Pressable>
        </Link>
        
    );

    const renderFooter: FC = () => {
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    };

    const handleLoadMore = () => {
        setSize(size + 1);
    };

    return (
        <FlatList
            data={images}
            renderItem={renderImage}
            keyExtractor={item => item.id}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            style={styles.flatList}
        />
    );
};

const styles = StyleSheet.create({
    flatList : {
        width: "75%",
    },
    image: {
        borderRadius: 10,
        marginVertical: 10,
        width: "100%",
        height: 200,
    }
});

export default InfiniteScrollImages;
