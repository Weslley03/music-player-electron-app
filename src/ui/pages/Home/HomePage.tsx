import GenericLayout from "../../layouts/GenericLayout";
import styles from './HomePage.module.scss';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

const HomePage = () => {
  const count = useAppSelector((state) => state.count);
  const dispatch = useAppDispatch();

  return (
    <GenericLayout>
      <div className={styles.mainContainer}>
        <p> HomePage! </p>
        <div>
          <h2>Count: {count}</h2>
          <button onClick={() => dispatch({ type: 'INCREMENT', payload: 1 })}>increment</button>
          <button onClick={() => dispatch({ type: 'DECREMENT', payload: 1 })}>decrement</button>
        </div>
      </div>
    </GenericLayout>
  )
};

export default HomePage;