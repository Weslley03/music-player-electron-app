import { useEffect, useState } from 'react';
import HomeIcon from '../../icons/HomeIcon';
import SearchIcon from '../../icons/SearchIcon';
import RoundInput from '../RoundInput/RoundInput';
import styles from './HeaderGlobal.module.scss';
import RoundBottom from '../RoundBottom/RoundBottom';
import type { User, UsersResponse } from '../../types/user';
import api from '../../services/api';

const HeaderGlobal = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<User>();

  //onMounted
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get<UsersResponse>('/user.json');
        const userData = [...response.data.users];
        setUser(userData.find(user => user.id === 1)); //mocking selection of a single user
      } catch (err) {
        console.error(err)
      };
    };

    getUser();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <RoundBottom>
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