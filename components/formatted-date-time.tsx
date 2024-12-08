import React from "react";
import { cn, formatDateTime } from "@/lib/utils";

type FormattedDateTimeProps = {
  date: string;
  className?: string;
};

export function FormattedDateTime(props: FormattedDateTimeProps): JSX.Element {
  const { date, className } = props;
  return (
    <p className={cn("body-1 text-light-200", className)}>
      {formatDateTime(date)}
    </p>
  );
}
