import { useState } from 'react';
import HomeIcon from '../../icons/HomeIcon';
import SearchIcon from '../../icons/SearchIcon';
import RoundInput from '../RoundInput/RoundInput';
import styles from './HeaderGlobal.module.scss';
import RoundBottom from '../RoundBottom/RoundBottom';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

const HeaderGlobal = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const { avatar } = useAppSelector(state => state.user);

  const redirectToProfile = () => {
    navigate('/profile');
  };

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <>
      <div className={styles.container}>
        <RoundBottom onClick={() => redirectToHome()}>
          <HomeIcon />
        </RoundBottom>
        <div className={styles.searchInput}>
          <RoundInput
            value={search}
            icon={<SearchIcon />}
            placeholder='O que queres reproduzir?'
            onChange={setSearch}
          />
        </div>
        <div className={styles.userSection}>
          <RoundBottom onClick={() => redirectToProfile()}>
            <img className={styles.userImage} src={`data:image/jpeg;base64,${avatar}`} />
          </RoundBottom>
        </div>
      </div>
    </>
  )
}

export default HeaderGlobal;