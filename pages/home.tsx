import * as React from 'react';

const Home = () => {
  React.useEffect(() => {
    fetch('api/tweets')
      .then((resp) => resp.json())
      .then(console.log);
  }, []);
  return <div>Home lol</div>;
};

Home.headerTitle = 'Latest Tweets';

export default Home;
