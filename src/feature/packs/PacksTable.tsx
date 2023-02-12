import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { PacksResponseType } from "./packsReducer";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";

interface Data {
  name: string;
  cards: number;
  lastUpdated: string;
  createdBy: string;
  actions: string;
}

type TablePropsType = {
  packs: PacksResponseType;
};

export const PacksTable = (props: TablePropsType) => {
  // console.log("props PacksTable:", props);

  let rows: any = [];

  //создание строки
  function createData(name: string, cards: number, createdBy: string, lastUpdated: string, actions: string): Data {
    return {
      name,
      cards,
      lastUpdated,
      createdBy,
      actions,
    };
  }

  if (props.packs.cardPacks) {
    props.packs.cardPacks.map((pack) => {
      rows.push(createData(pack.name, pack.cardsCount, pack.user_name, pack.updated, "add action"));
      return rows;
    });
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // направление сортировки
  type Order = "asc" | "desc";

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
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
      id: "createdBy",
      numeric: true,
      disablePadding: false,
      label: "Last Updated",
    },
    {
      id: "lastUpdated",
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

  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  //////////////////Заголовки колонок таблицы////////////////////////////
  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="normal"></TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  interface EnhancedTableToolbarProps {
    numSelected: number;
  }
  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    return (
      <div>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
            СЮДА ДОБАВИТЬ И ПОИСК ФИЛЬТРАЦИЮ
          </Typography>

          <Tooltip title="Clear filter">
            <IconButton>
              <FilterAltOffOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </div>
    );
  }

  function EnhancedTable() {
    //направление стрелочек фильтрации
    const [order, setOrder] = React.useState<Order>("asc");

    const [orderBy, setOrderBy] = React.useState<keyof Data>("cards");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);

    // для переключения размеров страницы
    const [dense, setDense] = React.useState(false);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: readonly string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }

      setSelected(newSelected);
    };

    //пагинация
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    //изменение размеров таблицы
    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {/*в тулбаре будет фильтрация и поиск*/}
          <EnhancedTableToolbar numSelected={selected.length} />

          {/*Таблица*/}
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
              {/*заголовки таблицы Name Cards Last Updated Created bt Actions*/}
              <EnhancedTableHead
                numSelected={selected.length}
                order={order} //направление фильтра (стрелочки)
                orderBy={orderBy} //колонка фильтрации
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              {/*Наполнение таблицы*/}
              <TableBody>
                {/*здесь задается направление сортировки и по какому параметру*/}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // @ts-ignore
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // @ts-ignore
                        onClick={(event) => handleClick(event, row.name)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell align={"center"} padding={"none"} />
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.cards}</TableCell>
                        <TableCell align="right">{row.lastUpdated}</TableCell>
                        <TableCell align="right">{row.createdBy}</TableCell>
                        <TableCell align="right">{row.actions}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/*Пагинация*/}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.packs.cardPacksTotalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/*Отступы между строк*/}
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
      </Box>
    );
  }
  return (
    <div>
      <EnhancedTable />
    </div>
  );
};
