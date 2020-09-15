import Link from 'next/link';
import { AppProps } from 'next/app';
import React from 'react';
import {
  BellIcon,
  BellIconEmpty,
  HomeIcon,
  HomeIconEmpty,
  MailBoxIcon,
  MailBoxIconEmpty,
  SearchIcon,
  SearchIconEmpty,
  StarsIconEmpty,
} from '../icons';
import '../styles/index.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center px-4 py-3 border-b">
        <img
          className="rounded-full w-8 h-8"
          src="https://pbs.twimg.com/profile_images/1149779844567306241/IlP2z5ch_bigger.jpg"
        />
        <p className="mx-6 text-lg font-extrabold flex-1">
          {
            // @ts-ignore
            Component.headerTitle
          }
        </p>
        <a href="" className="w-6 h-6 text-blue-500">
          <StarsIconEmpty />
        </a>
      </header>
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <footer className="flex items-center border-t">
        <Link href="/home">
          <a
            className={`flex-1 justify-items-center ${
              router.pathname === '/home' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <div className="p-4 flex justify-center">
              {router.pathname === '/home' ? (
                <HomeIcon className="w-6 h-6" />
              ) : (
                <HomeIconEmpty className="w-6 h-6" />
              )}
            </div>
          </a>
        </Link>
        <Link href="/explore">
          <a
            className={`flex-1 ${
              router.pathname === '/explore' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <div className="p-4 flex justify-center">
              {router.pathname === '/explore' ? (
                <SearchIcon className="w-6 h-6" />
              ) : (
                <SearchIconEmpty className="w-6 h-6" />
              )}
            </div>
          </a>
        </Link>
        <Link href="/notifications">
          <a
            className={`flex-1 ${
              router.pathname === '/notifications'
                ? 'text-blue-500'
                : 'text-gray-500'
            }`}
          >
            <div className="p-4 flex justify-center">
              {router.pathname === '/notifications' ? (
                <BellIcon className="w-6 h-6" />
              ) : (
                <BellIconEmpty className="w-6 h-6" />
              )}
            </div>
          </a>
        </Link>
        <Link href="/messages">
          <a
            className={`flex-1 ${
              router.pathname === '/messages'
                ? 'text-blue-500'
                : 'text-gray-500'
            }`}
          >
            <div className="p-4 flex justify-center">
              {router.pathname === '/messages' ? (
                <MailBoxIcon className="w-6 h-6" />
              ) : (
                <MailBoxIconEmpty className="w-6 h-6" />
              )}
            </div>
          </a>
        </Link>
      </footer>
    </div>
  );
}

export default MyApp;
