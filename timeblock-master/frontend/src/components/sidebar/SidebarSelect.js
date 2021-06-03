import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import useTheme from '@material-ui/core/styles/useTheme';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import EditIcon from '@material-ui/icons/Edit';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SearchIcon from '@material-ui/icons/Search';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { appActions as aa } from 'store/app/appReducer';
import { priorityKeysHigh } from '../../constants';
import ToggleItem from './ToggleItem';
// const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  showSearch: ({ showSearchItems }) => ({
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
  search: {
    paddingTop: 0,
    paddingBottom: 0,
    justifySelf: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  searchRoot: {},
  button: {},
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorities: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  priority: {
    paddingLeft: '.25rem',
    paddingRight: '.25rem',
  },
}));

export default function SidebarSelect() {
  const dispatch = useDispatch();
  const { showSearchItems, searchText, searchPriorities, editAvailable } = useSelector(({ app }) => ({
    showSearchItems: app.showSearchItems,
    searchText: app.search.text,
    searchPriorities: app.search.priorities,
    editAvailable: app.editAvailable,
  }));
  const theme = useTheme();
  const handleSearchChange = (e) => void dispatch(aa.setSearchText({ text: e.target.value }));
  const clearSearch = () => void dispatch(aa.setSearchText({ text: '' }));
  const updatePriorityList = (priority) => dispatch(aa.setSearchPriorities({ priority }));
  const classes = useStyles({ showSearchItems });
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <div className={classes.root}>
      <ToggleItem state={showSearchItems} text="Pick Items" action={aa.toggleSearchItems} Icon={ListAltIcon} />
      <ToggleItem state={editAvailable} text="Edit Items" action={aa.toggleEditAvailable} Icon={EditIcon} />
      <ListItem>
        <div className={classes.priorities}>
          {priorityKeysHigh.map((priority) => {
            const color = theme.palette.priorities[priority.toString()].main;
            const Icon = searchPriorities.includes(priority) ? TurnedInIcon : TurnedInNotIcon;
            return (
              <IconButton
                className={classes.priority}
                key={`priority-${priority}`}
                onClick={() => updatePriorityList(priority)}
              >
                <Icon style={{ color }} />
              </IconButton>
            );
          })}
        </div>
      </ListItem>
      <ListItem className={classes.search}>
        {smUp ? (
          <TextField
            id="standard-full-width"
            label="Search"
            placeholder="Search Items"
            onChange={handleSearchChange}
            value={searchText}
            margin="dense"
            variant="outlined"
            inputProps={{ className: classes.searchRoot }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : (
          <IconButton disabled={!searchText} onClick={clearSearch} color={searchText ? 'primary' : 'default'}>
            <SearchIcon />
          </IconButton>
        )}
      </ListItem>
    </div>
  );
}
