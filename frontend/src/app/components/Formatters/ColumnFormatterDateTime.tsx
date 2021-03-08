import moment from 'moment';
import React from 'react';

interface Props {
  value: string;
}
const DateTimeFormatter: React.FC<Props> = ({ value }) => {
  return (
    <div>{value ? moment(value).format('DD MMM YYYY, HH:mm:ss') : ''}</div>
  );
};


export default DateTimeFormatter;
