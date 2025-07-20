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
      return { count: newCount < 0 ? 0 : state.count - action.payload };
    }
    default:
      return state;
  }
};