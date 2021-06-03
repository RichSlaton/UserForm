import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlarmIcon from '@material-ui/icons/AddAlarm';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import makeStyles from '@material-ui/styles/makeStyles';
import 'date-fns';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import { getDay } from 'store/items/itemsThunks';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  date: {
    fontSize: theme.typography.pxToRem(8),
  },
  icon: {
    fontSize: theme.typography.pxToRem(12),
  },
  input: {
    fontSize: theme.typography.pxToRem(13),
  },
}));

export default function SelectTime() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { startTime } = useSelector(({ items }) => ({
    startTime: items.startTime,
  }));
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    setCurrentDate(startTime);
  }, [startTime]);
  const handleDateChange = (date, val) => {
    if (val.endsWith(' _')) val = val.replace(' _', ' am');
    // date = moment(val.toString()).toDate();
    if (moment(date).isValid()) {
      if (moment(date).isSame(currentDate, 'day')) {
        dispatch(ia.updateStartTime({ startTime: moment(date).toDate() }));
      } else {
        dispatch(getDay({ startTime: moment(date).toDate() }));
      }
    }
    setCurrentDate(date);
  };
  return (
    <ListItem>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          autoOk
          className={classes.date}
          classes={{
            root: {
              fontSize: 12,
            },
          }}
          size="small"
          inputVariant="outlined"
          margin="dense"
          variant="inline"
          ampm={true}
          value={currentDate}
          onChange={handleDateChange}
          allowKeyboardControl={true}
          minDate={new Date('2019-01-01')}
          showTodayButton
          leftArrowButtonProps={{ 'aria-label': 'Prev month' }}
          rightArrowButtonProps={{ 'aria-label': 'Next month' }}
          format="MM/dd/yyyy hh:mm a"
          InputProps={{
            className: classes.input,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <AlarmIcon className={classes.icon} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </MuiPickersUtilsProvider>
    </ListItem>
  );
}
