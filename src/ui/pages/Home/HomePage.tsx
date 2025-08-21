import Row from '../../components/Row/Row';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <Row title='musicas melhores q a sua escolha' />
        <Row title='os maiores sucessos' />
      </div>
    </div>
  )
};

export default HomePage;