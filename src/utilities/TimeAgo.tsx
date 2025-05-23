import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

type TimeStampProp = {
  timestamp: string;
};

export const TimeAgo: React.FC<TimeStampProp> = ({ timestamp }) => {
  let timeAgo;

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp} className="text-[10px]">
      {" "}
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
