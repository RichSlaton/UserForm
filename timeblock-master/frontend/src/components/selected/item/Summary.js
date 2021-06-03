import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';

const getTime = (hr, min) => {
  let time = 'Time: ';
  if (hr) {
    time += `${hr} hr `;
  }
  time += `${min} min`;
  return time;
};

const useStyles = makeStyles((theme) => ({
  priority: ({ priority }) => ({
    color: theme.palette.priorities[priority].main,
    [theme.breakpoints.up('md')]: {
      paddingRight: '.1rem',
    },
  }),
  name: {
    paddingLeft: '.5rem',
    fontSize: theme.typography.pxToRem(13),
  },
  topRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexBasis: '100%',
  },
  titleRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  duration: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '1rem',
    },
    fontSize: theme.typography.pxToRem(12),
  },
  startTime: {
    paddingLeft: '0rem',
    fontSize: theme.typography.pxToRem(12),
    [theme.breakpoints.up('md')]: {
      paddingRight: '1.25rem',
    },
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  close: {
    marginRight: '.5rem',
  },
  displayContent: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  nameWrapper: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '100%',
    },
  },
}));

Summary.propTypes = {
  item: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  calculatedTime: PropTypes.any.isRequired,
  hoursTotal: PropTypes.number.isRequired,
  minutesTotal: PropTypes.number.isRequired,
};
export default function Summary({ item, isDragging, calculatedTime, hoursTotal, minutesTotal }) {
  const classes = useStyles({ priority: item.priority });
  const dispatch = useDispatch();
  const removeItem = () => void dispatch(ia.deleteItemAction({ dayItemId: item.dayItemId }));

  return (
    <div className={classes.root}>
      <div className={classes.displayContent}>
        <div className={classes.titleRow}>
          <Typography variant="body2" color="textSecondary" className={classes.startTime}>
            {!isDragging && calculatedTime}
          </Typography>
          <div className={classes.nameWrapper}>
            <IconButton className={classes.priority}>
              <TurnedInIcon />
            </IconButton>
            <Typography variant="h6" className={classes.name}>
              {item.name}
            </Typography>
          </div>
          <Typography className={classes.duration} color="textSecondary">
            {getTime(hoursTotal, minutesTotal)}
          </Typography>
        </div>
        <div>
          <IconButton onClick={removeItem} className={classes.close}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.detailsGrid}>
        <Typography>{item.details}</Typography>
      </div>
    </div>
  );
}
