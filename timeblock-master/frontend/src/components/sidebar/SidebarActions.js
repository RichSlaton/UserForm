import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { itemsActions as ia } from 'store/items/itemsReducer';
import { createDay, deleteDay } from 'store/items/itemsThunks';

const useStyles = makeStyles((theme) => ({
  item: {
    paddingTop: '0rem',
    paddingBottom: '0rem',
  },
  text: {
    fontSize: theme.typography.pxToRem(12),
  },
  icon: { fontSize: theme.typography.pxToRem(18) },
}));

export default function SidebarContent() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const items = [
    { Icon: RestoreIcon, name: 'Reset Durations', handler: () => void dispatch(ia.resetAllDayTimes()) },
    { Icon: ClearAllIcon, name: 'Reset Items', handler: () => void dispatch(ia.clearDailyScheduleAction()) },
    { Icon: SaveIcon, name: 'Save Day', handler: () => void dispatch(createDay()) },
    { Icon: DeleteIcon, name: 'Erase Day', handler: () => void dispatch(deleteDay()) },
    {
      Icon: AddCircleOutlineIcon,
      name: 'Create Saved Item',
      handler: () => void dispatch(ia.setItemModal({ isOpen: true })),
    },
  ];
  return (
    <List>
      {items.map((item) => (
        <ListItem button onClick={item.handler} className={classes.item} key={item.name}>
          <ListItemIcon>
            <item.Icon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={item.name} primaryTypographyProps={{ variant: 'p' }} className={classes.text} />
        </ListItem>
      ))}
    </List>
  );
}
