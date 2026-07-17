import React from "react";
import { SOURCE_STYLES } from "../data/sourceStyles";

export default function SourceBadge({ source }) {
  const s = SOURCE_STYLES[source];

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium ${s.chip}`}
    >
      {source}
    </span>
  );
}