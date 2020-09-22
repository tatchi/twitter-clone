import * as React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { lazy } from '@loadable/component';
import { StaticRouter } from 'react-router-dom/server';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const Home = () => (
  <div>
    <React.Suspense fallback={<div>lol</div>}>
      This is home <Link to="about">About</Link>
    </React.Suspense>
  </div>
);

const About = lazy(() => import(/* webpackChunkName: "About" */ '../About'));

export const getServerSideProps: GetServerSideProps<{ url: string }> = async (
  context
) => {
  return {
    props: {
      url: context.req.url,
    },
  };
};

const AllRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="about/" element={<About />}></Route>
  </Routes>
);

const App = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return typeof document !== 'undefined' ? (
    <Router>
      <React.Suspense fallback={<div>loading...</div>}>
        <AllRoutes />
      </React.Suspense>
    </Router>
  ) : (
    <StaticRouter location={props.url}>
      <AllRoutes />
    </StaticRouter>
  );
};

export default App;
