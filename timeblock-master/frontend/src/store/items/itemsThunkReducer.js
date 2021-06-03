import * as it from './itemsThunks';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
const itemsThunkReducer = {
  [it.initialize.fulfilled]: (state, { payload: { items, day } }) => {
    const selected = (day.items || []).map((item) => ({ ...item, dayItemId: uuid() }));
    return {
      ...state,
      available: items,
      startTime: moment(day.startTime).toDate(),
      selected,
    };
  },
  [it.createUserItem.fulfilled]: (state, { payload: { item } }) => {
    state.available.push(item);
  },
  [it.getUser.fulfilled]: (state, { payload: { items } }) => {
    state.available = items;
  },
  [it.updateUserItem.fulfilled]: (state, { payload: { item } }) => {
    const idx = state.available.findIndex(({ id }) => id === item.id);
    state.available[idx] = item;
  },
  [it.deleteUserItem.fulfilled]: (state, { payload: { id } }) => {
    const idx = state.available.findIndex((item) => id === item.id);
    state.available.splice(idx, 1);
  },
  [it.getDay.fulfilled]: (state, { payload: { day } }) => {
    const selected = (day.items || []).map((item) => ({ ...item, dayItemId: uuid() }));
    return { ...state, selected, startTime: day.startTime };
  },
  [it.createDay.fulfilled]: (state, { payload: { day } }) => {
    state.startTime = day.startTime;
  },
  [it.updateDay.fulfilled]: (state, { payload: { day } }) => {
    console.log('THE UPDATE DAY', day);
  },
  [it.updateDayItem.fulfilled]: (state, { payload: { items } }) => {
    console.log('THE NEW DAY ITEMS', items);
  },
  [it.deleteDay.fulfilled]: (state) => {
    state.selected = [];
  },
};

export default itemsThunkReducer;
