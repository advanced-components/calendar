import React from "react";
import styled from "styled-components";

import { getCurrentWeekDates } from "../utils";
import { VEvent } from "../types";
import { HoursLabels } from "../Day/HoursLabels";
import { DayGrid } from "../Day/DayGrid";
import { WeekEvent } from "./WeekViewEvent";

const StyledWeek = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 100%;
  overflow: scroll;
  height: 100%;
  padding-left: 32px;
`;

const WeekWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  flex-grow: 1;
`;

type WeekProps = {
  date: Date;
};

export const Week = (props: WeekProps) => {
  const week = getCurrentWeekDates();
  return (
    <StyledWeek>
      <WeekEvent date={week}></WeekEvent>
      <HoursLabels />
      {week.map((date, index) => (
        <DayGrid key={index} full={false} date={date} />
      ))}
    </StyledWeek>
  );
};
