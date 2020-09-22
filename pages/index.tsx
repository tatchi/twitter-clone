import * as React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import loadable, { lazy } from '@loadable/component';

const About = lazy(() => import(/* webpackChunkName: "Abouta" */ '../About2'));

const Home = () => (
  <div>
    This is home <Link to="about">About</Link>
  </div>
);

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
    <React.Suspense fallback="loading...">
      <Router>
        <AllRoutes />
      </Router>
    </React.Suspense>
  ) : null;
};

export default App;
