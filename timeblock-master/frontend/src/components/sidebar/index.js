import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppSidebar from './AppSidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
  },
  content: {
    flexGrow: 1,
  },
}));

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function AppWrapper({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <AppSidebar />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
