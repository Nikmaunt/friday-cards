import { DataRows } from "../../feature/packs/PacksTable";

export const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "cards",
    numeric: true,
    disablePadding: false,
    label: "Cards",
  },
  {
    id: "lastUpdated",
    numeric: true,
    disablePadding: false,
    label: "Last Updated",
  },
  {
    id: "createdBy",
    numeric: true,
    disablePadding: false,
    label: "Created by",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

///////types/////
interface HeadCell {
  disablePadding: boolean;
  id: keyof DataRows;
  label: string;
  numeric: boolean;
}
