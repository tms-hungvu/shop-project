export function combineReducers(reducers : any) {  
    return (state = {} as any, action : any) => {
      const newState = {} as any;
      for (let key in reducers) {
        newState[key] = reducers[key](state[key], action);
      }
      return newState;
    }
}