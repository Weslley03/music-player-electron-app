import { useEffect, useState } from 'react';
import HomeIcon from '../../icons/HomeIcon';
import SearchIcon from '../../icons/SearchIcon';
import RoundInput from '../RoundInput/RoundInput';
import styles from './HeaderGlobal.module.scss';
import RoundBottom from '../RoundBottom/RoundBottom';
import type { User } from '../../types/user-type';
import { useNavigate } from 'react-router-dom';
import { getUserInformations } from '../../services/user/user-service';

const HeaderGlobal = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate('/');
  };

  //onMounted
  useEffect(() => {
    const getUser = async () => {
      const user = await getUserInformations('12345678');
      setUser(user);
    };

    getUser();
  }, []);

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
          <RoundBottom>
            <img className={styles.userImage} src={user?.imglogo} />
          </RoundBottom>
        </div>
      </div>
    </>
  )
}

export default HeaderGlobal;