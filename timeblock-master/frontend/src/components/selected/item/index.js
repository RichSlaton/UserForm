import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Details from './Details';
import { Accordion, AccordionDetails, AccordionSummary } from './Styles';
import Summary from './Summary';

const useStyles = makeStyles(() => ({
  root: {},
  accordian: {
    minHeight: 0,
    // margin: 0,
  },
}));

SelectedItem.propTypes = {
  item: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
  currentTotalTime: PropTypes.number.isRequired,
  expandedId: PropTypes.string.isRequired,
  setExpandedId: PropTypes.func.isRequired,
};
export default function SelectedItem({ item, snapshot, provided, currentTotalTime, expandedId, setExpandedId }) {
  const { startTime } = useSelector(({ items }) => ({ startTime: items.startTime }));
  const classes = useStyles();
  const calculatedTime = moment(startTime).add(parseInt(currentTotalTime), 'minutes').format('hh:mm a');
  const hoursTotal = Math.floor(parseInt(item.totalMinutes) / 60);
  const minutesTotal = parseInt(item.totalMinutes) % 60;

  return (
    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <Paper elevation={4} className={classes.root}>
        <Accordion
          square
          expanded={expandedId === item.dayItemId}
          onChange={() => setExpandedId((currentId) => (currentId !== item.dayItemId ? item.dayItemId : ''))}
        >
          <AccordionSummary classes={{ root: classes.accordian }}>
            <Summary
              item={item}
              isDragging={snapshot.isDragging}
              calculatedTime={calculatedTime}
              hoursTotal={hoursTotal}
              minutesTotal={minutesTotal}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Details item={item} hoursTotal={hoursTotal} minutesTotal={minutesTotal} />
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
}
