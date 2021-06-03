import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SelectedList from './SelectedList';

Index.propTypes = {
  droppableId: PropTypes.string.isRequired,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'stretch',
    flexWrap: 'wrap',
    background: theme.palette.background.light,
    padding: `0.25rem `,
    zIndex: '1',
    marginTop: '-1px',
    flexGrow: 1,
  },
}));

export default function Index({ droppableId }) {
  const { list } = useSelector(({ items }) => ({
    list: items[droppableId] || [],
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SelectedList className={classes.list} droppableId={droppableId} list={list} />
    </div>
  );
}
