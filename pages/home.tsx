import { GetServerSideProps } from 'next';
import * as React from 'react';
import { QueryCache, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const fetchTweets = () =>
  new Promise((res) => {
    fetch('https://swapi.dev/api/planets/')
      .then((resp) => resp.json())
      .then((r) => {
        setTimeout(() => res(r), 2000);
      });
  });

const Home = () => {
  const todosQuery = useQuery('tweets', fetchTweets);

  console.log(todosQuery);

  if (todosQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {
        // @ts-ignore
        todosQuery.data.results.map((r) => (
          <div key={r.name}>{r.name}</div>
        ))
      }
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryCache = new QueryCache();
  await queryCache.prefetchQuery('tweets', fetchTweets);

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
  };
};

Home.headerTitle = 'Latest Tweets';

export default Home;
