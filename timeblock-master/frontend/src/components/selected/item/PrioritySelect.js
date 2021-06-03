import IconButton from '@material-ui/core/IconButton';
import useTheme from '@material-ui/core/styles/useTheme';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import { priorityKeysHigh } from '../../../constants';
import makeStyles from '@material-ui/core/styles/makeStyles';

PriorityFlag.propTypes = {
  item: PropTypes.object.isRequired,
  priority: PropTypes.number.isRequired,
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '.5rem',
  },
  button: {
    flexBasis: '50%',
  },
}));
export default function PriorityFlag({ item }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const updatePriority = (priority) => dispatch(ia.updateSelectedItemPriority({ dayItemId: item.dayItemId, priority }));
  return (
    <div className={classes.root}>
      {priorityKeysHigh.map((priority) => {
        const color = theme.palette.priorities[priority.toString()].main;
        return (
          <IconButton
            className={classes.button}
            key={`priority-${priority}`}
            disabled={priority == item.priority}
            onClick={() => updatePriority(priority)}
          >
            {priority == item.priority ? <TurnedInIcon style={{ color }} /> : <TurnedInNotIcon style={{ color }} />}
          </IconButton>
        );
      })}
    </div>
  );
}
