import React from 'react';
import styled from 'styled-components';
import { VEvent } from '../types';
import './Day.css';
import { translatePositionByPxToDate } from '../utils';

type DayProps = {
  date: Date;
  events: VEvent[];
  onCreateEvent: (timestamp: number) => void;
};

export const Day = (props: DayProps) => {
  const day = props.date.getDate();
  const monthName = props.date.toLocaleString('en-us', { month: 'long' });
  const fullYear = props.date.getFullYear();
  const dayName = props.date.toLocaleString('en-us', { weekday: 'long' });
  return (
    <div className='cal-view'>
      <div className='cal-view__header'>
        <div className='cal-view__title'>
          <b>
            {day} {monthName}
          </b>{' '}
          {fullYear}
        </div>
        <div className='cal-day__grid__header'>{dayName}</div>
      </div>
      <div className='cal-day__grid-wrapper'>
        <div className='cal-day__grid'>
          <HoursLabels />
          <div className='day-view__grid'>
            {[...Array(24)].map((element, index) => (
              <div key={index} className='day-view__grid-hour' />
            ))}
            <EventGrid
              date={props.date}
              events={props.events}
              onCreateEvent={(timestamp: number) =>
                props.onCreateEvent(timestamp)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StyledHoursLabels = styled.div`
  margin: 0;
  padding: 0;
  left: 0;
  font-size: 11px;
  color: #ccc;
  margin-right: 8px;
  font-weight: 200;
`;

const HoursLabel = styled.div`
  height: 40px;
`;

export const HoursLabels = () => (
  <StyledHoursLabels>
    {[...Array(24)].map((element, index) => (
      <HoursLabel>{index.toString().padStart(2, '0')}:00</HoursLabel>
    ))}
  </StyledHoursLabels>
);

export type EventGridProps = {
  date: Date;
  events: VEvent[];
  onCreateEvent: (timestamp: number) => void;
};

const DayEvents = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 960px;
`;

const DayViewEvent = styled.div`
  position: absolute;
  width: 100%;
  background: #339af0;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

export const EventGrid = (props: EventGridProps) => {
  const currentDateString = props.date.toDateString();
  const currentDateEvents = props.events.filter((event: VEvent) => {
    const eventDateString = new Date(event.start).toDateString();
    return eventDateString === currentDateString;
  });
  const currentDateEventsList = currentDateEvents.map((event, index) => {
    const startHours = new Date(event.start).getHours();
    const top = startHours * 40;
    return (
      <DayViewEvent
        key={index}
        className='day-view__event'
        style={{ top: top + 'px' }}
      >
        {event.title}
      </DayViewEvent>
    );
  });
  return (
    <DayEvents
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        props.onCreateEvent(
          translatePositionByPxToDate(props.date, event.nativeEvent.offsetY)
        )
      }
    >
      {currentDateEventsList}
    </DayEvents>
  );
};
