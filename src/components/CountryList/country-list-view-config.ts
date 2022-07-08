import { TableCellProps } from "@mui/material";
import { Country } from "../../common/types/Country";

/*
  Specifies columns to be displayed
  Modify this array to to add and remove columns, or change their order
 */
export const columnKeys: Array<keyof Country> = [
  "emoji",
  "code",
  "name",
  "phone",
];

export const columnLabelMapping: Map<keyof Country, string> = new Map([
  ["emoji", "Country Flag"],
  ["code", "Country Code"],
  ["name", "Country Name"],
  ["phone", "Dialing Code"],
]);

export const tableCellPropsMapping: Map<keyof Country, TableCellProps> =
  new Map([
    ["emoji", { width: 150 }],
    ["code", { width: 200 }],
    ["name", { width: 200 }],
    ["phone", { width: 150 }],
  ]);

export const ROWS_PER_PAGE_OPTIONS = [15, 45, 90];

export const ROWS_PER_PAGE_DEFAULT = 15;
