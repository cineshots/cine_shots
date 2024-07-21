"use client"
import ContentWrapper from '@/components/ContentWrapper';
import React from 'react';
const MovieDetails = ({params}) => {
    return (
        <ContentWrapper>
            <div>page : {params.id}</div>
        </ContentWrapper>
    )
}

export default MovieDetails