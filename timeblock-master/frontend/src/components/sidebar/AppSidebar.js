import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appActions as aa } from 'store/app/appReducer';
import SidebarActions from './SidebarActions';
import SidebarSelect from './SidebarSelect';
import SelectTime from './SelectTime';
import SidebarTitle from './SidebarTitle';
// const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: '100vh',
    borderRight: `1px solid ${theme.palette.grey.main}`,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  drawerOpen: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },

  subheader: {
    marginTop: '1rem',
    alignSelf: 'flex-start',
    paddingBottom: '0rem',
    lineHeight: '0',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

AppSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function AppSidebar() {
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const dispatch = useDispatch();
  const { showDrawer } = useSelector(({ app }) => ({
    showDrawer: app.showDrawer,
  }));
  useEffect(() => {
    dispatch(aa.setShowDrawer({ showDrawer: smUp }));
  }, [smUp]);
  const classes = useStyles();
  return (
    <div
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: showDrawer,
        [classes.drawerClose]: !showDrawer,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: showDrawer,
          [classes.drawerClose]: !showDrawer,
        }),
      }}
    >
      <SidebarTitle />
      <Divider />
      <ListSubheader className={classes.subheader}>Date & Start Time</ListSubheader>
      <SelectTime />
      <Divider />
      <ListSubheader className={classes.subheader}>Configure</ListSubheader>
      <SidebarSelect />
      <Divider />
      <ListSubheader className={classes.subheader}>Actions</ListSubheader>
      <SidebarActions />
      <Divider />
    </div>
  );
}
