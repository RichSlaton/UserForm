import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import NumberInput from './NumberInput';
import PrioritySelect from './PrioritySelect';

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `${theme.typography.pxToRem(0.5)} dotted ${theme.palette.grey.main}`,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-start',
  },
  duration: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.primary.main,
  },
  editDuration: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '100%',
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '.5rem',
    },
  },
}));

Details.propTypes = {
  item: PropTypes.object.isRequired,
  hoursTotal: PropTypes.number.isRequired,
  minutesTotal: PropTypes.number.isRequired,
};
export default function Details({ item, hoursTotal, minutesTotal }) {
  const classes = useStyles({ priority: item.priority });

  return (
    <div className={classes.root}>
      <div className={classes.duration}>
        <Typography className={classes.titles}>Duration</Typography>
        <div className={classes.editDuration}>
          <NumberInput hoursTotal={hoursTotal} dayItemId={item.dayItemId} minutesTotal={minutesTotal} type={'hours'} />
          <NumberInput
            hoursTotal={hoursTotal}
            dayItemId={item.dayItemId}
            minutesTotal={minutesTotal}
            type={'minutes'}
          />
        </div>
      </div>
      <div className={classes.duration}>
        <Typography className={classes.titles}>Priority</Typography>
        <PrioritySelect item={item} />
      </div>
    </div>
  );
}
