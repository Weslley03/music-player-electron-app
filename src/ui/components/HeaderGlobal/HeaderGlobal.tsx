import { useState } from 'react';
import HomeIcon from '../../icons/HomeIcon';
import SearchIcon from '../../icons/SearchIcon';
import RoundInput from '../RoundInput/RoundInput';
import styles from './HeaderGlobal.module.scss';
import userImageMock from '../../assets/userImage.jpeg';

const HeaderGlobal = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className={styles.container}>
        <div className={styles.roundBottom}>
          <HomeIcon />
        </div>
        <div className={styles.searchInput}>
          <RoundInput
            value={search}
            icon={<SearchIcon />}
            placeholder='O que queres reproduzir?'
            onChange={setSearch}
          />
        </div>
        <div className={styles.userSection}>
          <div className={styles.roundBottom}>
            <img className={styles.userImage} src={userImageMock} />
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderGlobal;