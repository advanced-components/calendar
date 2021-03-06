import React from "react";
import styled from "styled-components";
import { VEvent } from "../types";

type DayGridProps = {
  full?: boolean;
  date: Date;
  events: any;
};

type StyledDayGridProps = {
  full?: boolean;
};

const StyledDayGrid = styled.div`
  width: ${(props: StyledDayGridProps) =>
    props.full ? "100%" : "14.2857142857%"};
  padding-top: 6px;
  position: relative;
`;
const Hour = styled.div`
  height: 40px;
  border-top: 1px solid #f8f9fa;
  border-right: 1px solid #eeeeee;
  :last-child {
    border-right: none;
  }
`;

export const DayGrid = (props: DayGridProps) => {
  const currentDateString = props.date.toDateString();
  const currentDateEvents = props.events.filter((event: VEvent) => {
    const eventDateString = new Date(event.startDate).toDateString();
    return eventDateString === currentDateString;
  });
  return (
    <StyledDayGrid full={props.full}>
      {[...Array(24)].map((element, index) => {
        return (
          <Hour>
            {currentDateEvents.map((item: any) => {
              const hours = item.startTime.slice(0, -3);
              if (index == hours) {
                return (
                  <DayViewEvent
                    style={{ height: item.height + "px" }}
                    key={index}
                  >
                    {item.title}
                  </DayViewEvent>
                );
              }
            })}
          </Hour>
        );
      })}
    </StyledDayGrid>
  );
};

const DayViewEvent = styled.div`
  position: absolute;
  text-align: center;
  padding-top: 10px;
  width: 135px;
  height: 50px;
  background: #339af0;
  color: white;
  padding: 5px;
  cursor: pointer;
`;
