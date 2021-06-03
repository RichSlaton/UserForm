import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import SelectedItem from './item/index';
import { useState } from 'react';
SelectedList.propTypes = {
  droppableId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};
SelectedList.defaultProps = {
  list: [],
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexGrow: 1,
  },
  timeline: {
    borderRadius: '10px',
    padding: 8,
    flexGrow: 1,
    overflowY: 'hidden',
  },
  list: {},
  noItems: {
    flexBasis: '100%',
    flexGrow: 1,
    marginTop: '3rem',
    justifySelf: 'center',
  },
}));

export default function SelectedList({ droppableId, list }) {
  const classes = useStyles();
  const [expandedId, setExpandedId] = useState('');
  return (
    <Droppable droppableId={droppableId} className={classes.root}>
      {(provided, snapshot) =>
        list.length === 0 ? (
          <div className={classes.noItems}>
            <Typography variant="h4" align="center" id="standard-full-width" label="Search">
              No Items Selected
            </Typography>
          </div>
        ) : (
          <div
            ref={provided.innerRef}
            className={classes.timeline}
            style={{
              background: snapshot.isDraggingOver ? '#f5f5f5' : '	white',
            }}
          >
            {list.map((item, index) => {
              let currentTotalTime = list
                .slice(0, index)
                .map((itm) => parseInt(itm.totalMinutes))
                .reduce((accumulater, element) => accumulater + element, 0);
              return (
                <Draggable key={item.dayItemId} draggableId={`drag-${item.dayItemId}`} index={index}>
                  {(provided, snapshot) => (
                    <SelectedItem
                      expandedId={expandedId}
                      setExpandedId={setExpandedId}
                      currentTotalTime={currentTotalTime}
                      item={item}
                      snapshot={snapshot}
                      provided={provided}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>
  );
}
