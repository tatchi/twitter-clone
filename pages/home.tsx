import * as React from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { ArrowDown, Comment, Retweet, HeartEmpty, Share } from '../icons';

type Tweet = {
  name: string;
  username: string;
  text: string;
  avatarUrl: string;
  date: string;
};

const fetchTweets = (): Promise<{ tweets: Tweet[] }> =>
  new Promise((res) => {
    fetch('/api/tweets/')
      .then((resp) => resp.json())
      .then((r) => {
        setTimeout(() => res(r), 1000);
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
      {todosQuery.data.tweets.map((tweet) => (
        <div key={tweet.name}>
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex">
              <img
                src={tweet.avatarUrl}
                className="w-10 h-10 rounded-full mr-3"
                alt=""
              />
              <div className="flex justify-between min-w-0 text-sm text-gray-700 flex-1">
                <div className="flex flex-col flex-1 min-w-0">
                  <p className=" flex">
                    <span className="truncate">
                      <span className="font-bold text-black">{tweet.name}</span>
                      <span className="ml-1">@{tweet.username}</span>
                    </span>
                    <span className="flex-shrink-0">
                      <span className="m-1">·</span>
                      <span>{format(new Date(tweet.date), 'MMM d')}</span>
                    </span>
                  </p>
                  <span>
                    <p className="text-sm">{tweet.text}</p>
                  </span>
                  <div className="flex justify-between mt-2">
                    <Comment className="w-4 h-4" />
                    <Retweet className="w-4 h-4" />
                    <HeartEmpty className="w-4 h-4" />
                    <Share className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <ArrowDown className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const queryCache = new QueryCache();
//   await queryCache.prefetchQuery('tweets', fetchTweets);

//   // context.res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');

//   return {
//     props: {
//       dehydratedState: dehydrate(queryCache),
//     },
//   };
// };

Home.headerTitle = 'Latest Tweets';

export default Home;
