"use client";
import React from 'react';
import { Button } from "@material-tailwind/react";
import ContentWrapper from '@/components/ContentWrapper';
import Link from 'next/link';

const page = () => {
  return (
    <ContentWrapper classname={'flex items-center justify-center flex-col gap-[20px]'}>
        <Link href={'/movie_list/bollywood'}>
            <Button className='min-w-[150px]' color="blue">BollyWood</Button>
        </Link>

        <Link href={'/movie_list/hollywood'}>
            <Button className='min-w-[150px]' color="red">Hollywood</Button>
        </Link>

        <Link href={'/movie_list/tollywood'}>
            <Button className='min-w-[150px]' color="green">Tollywood</Button>
        </Link>
    </ContentWrapper>
  )
}

export default page