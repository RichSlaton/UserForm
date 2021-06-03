import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, del } from 'store/utils';
import moment from 'moment';

const ct = (action, callback) => createAsyncThunk(`items/thunk/${action}`, callback);

export const initialize = ct('initialize', async (payload, thunkAPI) => {
  const { userId = 'test123', startTime } = thunkAPI.getState().items;

  const { user } = (await get(`/user?userId=${userId}`)) || {};
  const { day } = await get(`/day?userId=${userId}&date=${moment(startTime).format('YYYY-MM-DD')}`);

  return { items: user.items, day };
});
export const createUserItem = ct('createUserItem', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState().items;
  const { name, totalMinutes, priority, tags } = payload;
  const { item } = await post(`/user-item?userId=${userId}`, { name, totalMinutes, priority, tags });

  return { item };
});

export const getUser = ct('getUser', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState().items;
  const { user } = (await get(`/user?userId=${userId}`)) || {};
  return { items: user.items };
});

export const updateUserItem = ct('updateUserItem', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState().items;
  const { item } = await put(`/user-item?userId=${userId}`, { item: payload.item });
  return { item };
});

export const deleteUserItem = ct('deleteUserItem', async (payload, thunkAPI) => {
  const { id } = payload;
  const { userId } = thunkAPI.getState().items;
  await del(`/user-item?id=${id}&userId=${userId}`);
  return { id };
});

export const getDay = ct('getDay', async (payload, thunkAPI) => {
  const { startTime } = payload;
  const { userId } = thunkAPI.getState().items;
  const { day } = await get(`/day?userId=${userId}&date=${moment(startTime).format('YYYY-MM-DD')}`);

  return { day, startTime };
});

export const createDay = ct('createDay', async (payload, thunkAPI) => {
  const { selected, startTime, userId } = thunkAPI.getState().items;
  const { day } = await post(`/day?userId=${userId}`, {
    items: selected,
    startTime: moment(startTime).toDate(),
  });
  return { day };
});

export const updateDay = ct('updateDay', async (payload, thunkAPI) => {
  const { userId } = thunkAPI.getState().items;
  const { fieldName, fieldValue, date } = payload;
  const { day } = await put(`/day?userId=${userId}`, { date, fieldName, fieldValue });
  return { day };
});

export const updateDayItem = ct('updateDayItem', async (payload, thunkAPI) => {
  const { userId, startTime } = thunkAPI.getState().items;
  const { dynamoIndex, fieldName, fieldValue } = payload;
  const { items } = await put(`/day-item?userId=${userId}`, {
    date: moment(startTime).format('YYYY-MM-DD'),
    dynamoIndex,
    fieldName,
    fieldValue,
  });
  return { items };
});

export const deleteDay = ct('deleteDay', async (payload, thunkAPI) => {
  const { userId, startTime } = thunkAPI.getState().items;
  await del(`/day?date=${moment(startTime).format('YYYY-MM-DD')}&userId=${userId}`);
});

export const test = ct('test', async (payload, thunkAPI) => {
  const { userId, selected } = thunkAPI.getState().items;
  await post(`/test?userId=${userId}`, { selected });
});
