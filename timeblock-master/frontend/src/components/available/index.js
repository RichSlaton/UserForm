import List from '@material-ui/core/List';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
import Item from './AvailableItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    background: theme.palette.background.light,
    padding: `0.25rem `,
    zIndex: '1',
    marginTop: '-1px',
  },
  list: {
    padding: '.5rem',
    justifySelf: 'flex-start',
  },
}));

export default function Index() {
  const classes = useStyles();
  const { searchText, list, searchPriorities } = useSelector(({ app, items }) => ({
    searchText: app.search.text,
    list: items.available || [],
    searchPriorities: app.search.priorities,
  }));
  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {list
          .filter((item) => {
            let showItem = true;
            if (!searchPriorities.includes(item.priority)) {
              showItem = false;
            } else if (searchText) {
              const s = searchText.toLowerCase();
              if ((item.tags || []).some((tag) => tag.toLowerCase().includes(s))) {
                showItem = true;
              } else if (item.name.toLowerCase().includes(s)) {
                showItem = true;
              } else {
                showItem = false;
              }
            }
            return showItem;
          })
          .map((item, index) => (
            <Item item={item} key={`available-${item.id}`} index={index} />
          ))}
      </List>
    </div>
  );
}
