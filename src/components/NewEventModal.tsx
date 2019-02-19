import React, { useState } from 'react';
import { formatDate } from '../helpers';

import './NewEventModal.css';

export const NewEventModal: React.FunctionComponent<{
  handleClose: Function;
  show: boolean;
  date: Date;
}> = props => {
  const [startDate, setStartDate] = useState(
    props.date.toISOString().substr(0, 16)
  );
  const [endDate, setEndDate] = useState(
    props.date.toISOString().substr(0, 16)
  );
  const showHideClassName = props.show ? 'modal show' : 'modal hide';
  return (
    <div className={showHideClassName}>
      <div className='modal-main new-event'>
        <div className='modal-header'>
          <button onClick={() => props.handleClose()}>x</button>
        </div>
        <form className='event-form'>
          <input
            className='event-form__name'
            type='text'
            name='name'
            placeholder='Add title'
          />
          <input
            type='datetime-local'
            onChange={event => {
              setStartDate(event.target.value);
            }}
            value={startDate}
          />
          <input
            type='datetime-local'
            onChange={event => {
              setEndDate(event.target.value);
            }}
            value={endDate}
          />
          <input className='event-form__submit' type='submit' value='Create' />
        </form>
      </div>
    </div>
  );
};
