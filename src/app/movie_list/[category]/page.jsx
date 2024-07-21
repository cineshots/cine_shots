"use client"
import ContentWrapper from '@/components/ContentWrapper';
import TabsCustomAnimation from '@/components/movie_list_tab';
import React from 'react';
const MovieList = ({params}) => {
    return (
        <ContentWrapper classname={'relative'}>
            <TabsCustomAnimation params={params}/>
        </ContentWrapper>
    )
}

export default MovieList