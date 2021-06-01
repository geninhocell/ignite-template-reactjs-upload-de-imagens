/* eslint-disable import/no-extraneous-dependencies */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type GetNextPageParamProps = {
  data: {
    after: string;
  };
};

type IData = {
  pages: {
    data: {
      id: string;
      title: string;
      description: string;
      url: string;
      ts: number;
    }[];
    after: string;
  }[];
  pageParams: string[];
};

type FormattedData = {
  id: string;
  title: string;
  description: string;
  url: string;
  ts: number;
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) =>
      api.get(`/api/images`, {
        params: {
          after: pageParam,
        },
      }),
    {
      getNextPageParam: (lastPage: GetNextPageParamProps) => {
        // eslint-disable-next-line react/destructuring-assignment
        if (lastPage.data.after) {
          return lastPage.data.after;
        }
        return null;
      },
    }
  );

  const formattedData = useMemo(() => {
    const formatted = data?.pages.map(page => page.data.data.map(d => d));

    return formatted?.flat();
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={fetchNextPage}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
