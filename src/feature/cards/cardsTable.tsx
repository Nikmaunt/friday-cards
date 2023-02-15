import React, {useEffect} from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import Toolbar from "@mui/material/Toolbar";
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
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import s from "./Cards.module.css";
import StarIcon from '@mui/icons-material/Star';
import {useAppDispatch, useAppSelector} from "../../app/store";
import { setUserCards} from "./cardsReducer";
import {useSelector} from "react-redux";
import {selectorCards} from "./cardsSelectors";
import {SuperButton} from "../../common/superButton/superButton";
import {useParams} from "react-router-dom";
import {Rating, Stack} from "@mui/material";
import {CardsActionsIconPack} from "./cardsActionsIconPack";


interface Data {
    question: string;
    answer: string;
    lastUpdated: string;
    grade: string;
    actions: string;

}
export const CardsList = () => {
    let cards = useSelector(selectorCards);
    const {id} = useParams()
    let dispatch = useAppDispatch();
    useEffect(() => {
        if(id) {
            dispatch(setUserCards(id));
        }
    }, []);

    let rows: any = [];

    console.log(cards._id)
    Object.values(cards).map((card: any) => {
        rows.push(createData(
            card.question, card.answer, card.updated, card.grade, <CardsActionsIconPack user_id={card.user_id}/>));
        return rows;
        //создание строки
        function createData(question: string, answer: string, lastUpdated: string, grade: string,actions:any): Data {
            return {
                question,
                answer,
                lastUpdated,
                grade,
                actions
            };
        }
    });
    const addNewCardHandler = () => {
       // dispatch(createNewCard(cards.cardsPack_id))
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
            id: "question",
            numeric: false,
            disablePadding: true,
            label: "Question",
        },
        {
            id: "answer",
            numeric: true,
            disablePadding: false,
            label: "Answer",
        },
        {
            id: "lastUpdated",
            numeric: true,
            disablePadding: false,
            label: "Last Updated",
        },
        {
            id: "grade",
            numeric: true,
            disablePadding: false,
            label: "Grade",
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
        const {order, orderBy, onRequestSort} = props;
        const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="none"></TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            className={s.headCell}
                            sx={{paddingRight: "36px", textAlign: "left"}}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                <span className={s.headCell}>{headCell.label}</span>
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
        const {numSelected} = props;
        return (
            <div>
                <Toolbar>
                    <Typography sx={{flex: "1 1 100%"}} color="inherit" variant="subtitle1" component="div">
                        Friends Pack
                    </Typography>

                    <Tooltip title="Clear filter">
                        <IconButton>
                            <FilterAltOffOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </div>
        );
    }

    function EnhancedTable() {
        //направление стрелочек фильтрации
        const [order, setOrder] = React.useState<Order>("asc");
        // @ts-ignore
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
        // Avoid a layout jump when reaching the last page with empty rows.
        const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
        if (Object.values(cards).length === 0) {
            return <div>This pack is empty</div>
        }


        return (
            <Box sx={{width: "100%"}}>
                <Paper sx={{width: "100%", mb: 2}}>
                    {/*в тулбаре будет фильтрация и поиск*/}
                    <EnhancedTableToolbar numSelected={selected.length}/>
                    {/*Таблица*/}
                    <TableContainer>
                        <Table sx={{minWidth: 750}} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
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
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                // @ts-ignore
                                                onClick={(event) => handleClick(event, row.name)}
                                                tabIndex={-1}
                                                key={row.question}
                                            >
                                                <TableCell align={"center"} padding={"none"}/>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    sx={{paddingRight: "36px", textAlign: "left"}}
                                                >
                                                    {row.answer}
                                                </TableCell>
                                                <TableCell align="left">{row.grade}</TableCell>
                                                <TableCell align="left">{row.lastUpdated}</TableCell>
                                                <TableCell align="left">
                                                    <Box
                                                        sx={{
                                                            width: 70,
                                                            display: 'flex',
                                                        }}
                                                    >
                                                        <Rating
                                                            name="text-feedback"
                                                            value={5}
                                                            precision={0.5}
                                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                        />
                                                        <span className={s.icons}>{row.actions}</span>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/*Пагинация*/}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={12}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        );
    }
    return (
        <div>
            <div className={s.wrapper}>
                <div className={s.title}>{"Card pack"}</div>
                <div className={s.button}>
                    <SuperButton name={'add card'} callback={addNewCardHandler}/>
                </div>
            </div>
            <div className={s.table}>
                <EnhancedTable />
            </div>
        </div>
    );
};
