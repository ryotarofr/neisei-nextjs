function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <h2>
      {format(props.displayMonth, 'MMM yyy')}
      <div className='flex flex-row gap-6 my-4'>
        <div
          className='cursor-pointer hover:border hover:border-violet-700 px-4 py-2 rounded-full'
          // disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
        >
          Previous
        </div>
        <div
          className='cursor-pointer hover:border hover:border-violet-700 px-4 py-2 rounded-full'
          // disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
        >
          Next
        </div>
      </div>
    </h2>
  );
}


const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;


import React, { useState } from 'react';

import { format } from 'date-fns';
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker';

import style from "./Calendar.module.css"

export default function Calendar() {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);

  const footer = selectedDay ? (
    <p className='text-lg'>select : {format(selectedDay, 'PPP')}.</p>
  ) : (
    <p>Please pick a day.</p>
  );

  return (
    <>
      <style>{css}</style>
      <div className='flex'>
        <DayPicker
          className={style.container}
          modifiersClassNames={{
            selected: 'my-selected',
            today: 'my-today'
          }}
          // components={{
          //   Caption: CustomCaption
          // }}
          mode="single"
          required
          selected={selectedDay}
          onSelect={setSelectedDay}
          // footer={footer}
          numberOfMonths={4}
          defaultMonth={new Date(2023, 0)}
        />
        <DayPicker
          className={style.container}
          modifiersClassNames={{
            selected: 'my-selected',
            today: 'my-today'
          }}
          // components={{
          //   Caption: CustomCaption
          // }}
          mode="single"
          required
          selected={selectedDay}
          onSelect={setSelectedDay}
          // footer={footer}
          numberOfMonths={4}
          defaultMonth={new Date(2023, 4)}
        />
        <DayPicker
          className={style.container}
          modifiersClassNames={{
            selected: 'my-selected',
            today: 'my-today'
          }}
          // components={{
          //   Caption: CustomCaption
          // }}
          mode="single"
          required
          selected={selectedDay}
          onSelect={setSelectedDay}
          // footer={footer}
          numberOfMonths={4}
          defaultMonth={new Date(2023, 8)}
        />
      </div>
    </>
  );
}
