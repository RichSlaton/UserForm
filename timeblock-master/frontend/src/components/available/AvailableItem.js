import Paper from '@material-ui/core/Paper';
import Typograhpy from '@material-ui/core/Typography';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
const useStyles = makeStyles((theme) => ({
  item: ({ priority, editAvailable }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem',
    margin: `.1rem`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: editAvailable ? theme.palette.grey.main : theme.palette.priorities[priority].main,
      border: `2px solid ${theme.palette.priorities[priority].main}`,
    },
  }),
  title: {
    fontSize: theme.typography.pxToRem(12),
  },
  icon: {
    fontSize: theme.typography.pxToRem(15),
    marginRight: '.25rem',
  },
  priority: ({ priority }) => ({
    color: theme.palette.priorities[priority].main,
  }),
}));

Item.propTypes = {
  item: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
};
export default function Item({ item }) {
  const dispatch = useDispatch();
  const { editAvailable } = useSelector(({ app }) => ({
    editAvailable: app.editAvailable,
  }));

  const classes = useStyles({
    priority: item.priority,
    editAvailable,
  });
  const handleClick = () => {
    if (editAvailable) {
      dispatch(ia.setItemModal({ item, isOpen: true, isEditingItem: true }));
    } else {
      dispatch(ia.addToSelected({ item }));
    }
  };

  return (
    <Paper elevation={4} className={classes.item} onClick={handleClick}>
      <TurnedInIcon className={classes.priority} />
      <Typograhpy className={classes.title}>{item.name}</Typograhpy>
      <div style={{ flexGrow: 1 }} />
    </Paper>
  );
}
