import { useEffect, useState } from 'react';
import Row from '../../components/Row/Row';
import styles from './HomePage.module.scss';
import type { Album } from '../../types/album-type';
import type { Artist } from '../../types/artist-type';
import { getFeedByUserId } from '../../services/library/library-service';
import { useAppSelector } from '../../hooks/redux-hooks';

type CardItem = Album | Artist;

const HomePage = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const { id } = useAppSelector(state => state.user);

  useEffect(() => {
    const getCardsOptions = async () => {
      const res = await getFeedByUserId(id);
      const allItems: CardItem[] = [...res.albums, ...res.artists];
      setCards(allItems);
    };

    getCardsOptions();
  }, [id]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <Row title='musicas melhores q a sua escolha' cards={cards} />
      </div>
    </div>
  )
};

export default HomePage;