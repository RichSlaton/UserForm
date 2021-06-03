import IconButton from '@material-ui/core/IconButton';
import ArrowUpIcon from '@material-ui/icons/ExpandLess';
import ArrowDownIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '.25rem',
  },
  arrows: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '2rem',
    border: 'none',
    borderBottom: `.5px solid ${theme.palette.grey.main}`,
    color: theme.palette.grey.dark,
    textAlign: 'center',
  },
  inputRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  upArrow: () => ({
    fontSize: '1.25rem',
    color: theme.palette.primary.main,
    '&:disabled': {
      color: theme.palette.grey.main,
    },
    fontWeight: 'bolder',
  }),
  downArrow: () => ({
    fontSize: '1.25rem',
    color: theme.palette.primary.main,
    '&:disabled': {
      color: theme.palette.grey.main,
    },
    fontWeight: 'bolder',
  }),
  displayWord: {
    fontSize: '90%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'flex-end',
    color: theme.palette.grey.dark,
  },
}));

const NumberInput = ({ type, dayItemId, hoursTotal, minutesTotal }) => {
  const [displayNumber, setDispalyNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const value = type === 'hours' ? hoursTotal : minutesTotal;
  let isSubtractDisabled = false;
  let isAddDisabled = false;
  if (type === 'hours') {
    isSubtractDisabled = hoursTotal === 0;
    isAddDisabled = hoursTotal === 23;
  } else {
    isSubtractDisabled = hoursTotal === 0 && minutesTotal === 0;
    isAddDisabled = hoursTotal === 23 && minutesTotal === 59;
  }
  const classes = useStyles();
  useEffect(() => {
    setDispalyNumber(value);
  }, [value]);

  const handleTimeUpdate = (number, setType) => {
    if (!isNaN(number)) {
      if (setType === 'add' || (number >= 0 && number < (type === 'hours' ? 24 : 60))) {
        setShowError(false);
        dispatch(ia.updateSelectedItemTotalTimeAction({ dayItemId, type, number, setType }));
      } else {
        setShowError(true);
      }
    } else {
      setDispalyNumber('0');
      dispatch(ia.updateSelectedItemTotalTimeAction({ dayItemId, type, number: 0, setType }));
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.inputRoot}>
        <div className={classes.arrows}>
          <IconButton
            onClick={() => void handleTimeUpdate(1, 'add')}
            className={classes.upArrow}
            disabled={isAddDisabled}
          >
            <ArrowUpIcon />
          </IconButton>
          <input
            className={classes.input}
            value={displayNumber}
            onChange={(e) => void handleTimeUpdate(parseInt(e.target.value), 'set')}
          />
          <IconButton
            onClick={() => void handleTimeUpdate(-1, 'add')}
            className={classes.downArrow}
            disabled={isSubtractDisabled}
          >
            <ArrowDownIcon />
          </IconButton>
        </div>

        {showError && <div>Error</div>}
        <div className={classes.displayWord}>{type === 'hours' ? 'hr' : 'min'}</div>
      </div>
    </div>
  );
};

NumberInput.propTypes = {
  type: PropTypes.string.isRequired,
  dayItemId: PropTypes.string.isRequired,
  hoursTotal: PropTypes.number.isRequired,
  minutesTotal: PropTypes.number.isRequired,
};

export default NumberInput;
