type CounterState = {
  count: number;
}

type CounterAction =
  | { type: 'INCREMENT', payload: number }
  | { type: 'DECREMENT', payload: number };

const inicialState: CounterState = { count: 0 };

export const counterReducer = (state: CounterState = inicialState, action: CounterAction) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.payload };
    case 'DECREMENT': {
      const newCount = state.count - action.payload;
      return { count: newCount < 0 ? 0 : newCount };
    }
    default:
      return state;
  }
};

export const increment = (number: number): CounterAction => {
  return {
    type: 'INCREMENT',
    payload: number,
  }
};

export const decrement = (number: number): CounterAction => {
  return {
    type: 'DECREMENT',
    payload: number,
  }
}