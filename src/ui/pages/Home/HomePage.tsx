import GenericLayout from "../../layouts/GenericLayout";
import styles from './HomePage.module.scss';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { decrement, increment } from "../../reducers/counterReducer";

const HomePage = () => {
  const count = useAppSelector((state) => state.count);
  const dispatch = useAppDispatch();

  return (
    <GenericLayout>
      <div className={styles.mainContainer}>
        <p> HomePage! </p>
        <div>
          <h2>Count: {count}</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => dispatch(increment(5))}>increment five</button>
            <button onClick={() => dispatch(increment(1))}>increment</button>
            <button onClick={() => dispatch(decrement(1))}>decrement</button>
            <button onClick={() => dispatch(decrement(5))}>decrement five</button>
          </div>
        </div>
      </div>
    </GenericLayout>
  )
};

export default HomePage;