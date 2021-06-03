import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Typograhpy from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  color: ({ showSearchItems }) => ({
    color: clsx({ [theme.palette.primary.main]: showSearchItems }),
  }),
  pickText: {
    display: 'flex',
    alignItems: 'center',
  },
  visible: ({ showSearchItems }) => ({
    marginLeft: '1rem',
    color: showSearchItems ? theme.palette.primary.main : theme.palette.grey.dark,
  }),
  text: {
    fontSize: theme.typography.pxToRem(12),
  },
  icon: {
    fontSize: theme.typography.pxToRem(16),
  },
  iconRoot: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: '.5rem',
  },
}));

ToggleItem.propTypes = {
  action: PropTypes.func.isRequired,
  state: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.node.isRequired,
};

export default function ToggleItem({ action, state, text, Icon }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClick = () => void dispatch(action());
  return (
    <ListItem button onClick={handleClick} className={clsx(classes.color, classes.root)}>
      <ListItemIcon className={classes.iconRoot}>
        <Icon className={clsx(classes.icon, classes.color)} />
      </ListItemIcon>
      <ListItemText
        primary={
          <div className={classes.pickText}>
            <Typograhpy className={classes.text}>{text}</Typograhpy>
            <Switch color="primary" size="small" checked={state} className={classes.visible} />
          </div>
        }
        className={classes.text}
      />
    </ListItem>
  );
}
