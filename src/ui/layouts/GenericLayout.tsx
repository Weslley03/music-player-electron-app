import React from 'react';
import HeaderGlobal from '../components/HeaderGlobal/HeaderGlobal';
import MyLibrary from '../components/MyLibrary/MyLibrary';
import MediaPlayer from '../components/MediaPlayer/MediaPlayer';
import styles from './GenericLayout.module.scss';
import { Outlet } from 'react-router-dom';

const GenericLayout: React.FC = () => {
  return (
    <div>
      <header className={styles.header}>
        <HeaderGlobal />
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <MyLibrary />
        </aside>

        <main className={styles.routesArea}>
          <Outlet />
        </main>
      </div>

      <footer className={styles.mediaPlayer}>
        <MediaPlayer />
      </footer>
    </div>
  );
};

export default GenericLayout;