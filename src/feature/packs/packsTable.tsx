import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import { fetchPacksTC } from "./packsReducer";
import { useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { selectorPacks } from "./packsSelectors";
import { ActionsIconPack } from "../../common/utils/actionsIconPack";
import { PacksTableHead } from "./packsTableHead";
import { PacksTableBody } from "./packsTableBody";
import { PacksTablePagination } from "./packsTablePagination";
import { Paper } from "@mui/material";
import { selectAppStatus } from "../../app/appSelectors";
import Skeleton from "react-loading-skeleton";

export const PacksTable = () => {
  const dispatch = useAppDispatch();
  const packs = useSelector(selectorPacks);
  const statusApp = useSelector(selectAppStatus);
  useEffect(() => {
    dispatch(fetchPacksTC({}));
  }, []);

  function createData(
    name: string,
    cards: number,
    createdBy: string,
    lastUpdated: string,
    id: string,
    actions: any
  ): DataRows {
    return { name, cards, lastUpdated, createdBy, id, actions };
  }

  const rows = packs.cardPacks.map((pack) => {
    return createData(
      pack.name,
      pack.cardsCount,
      pack.user_name,
      pack.updated,
      pack._id,
      <ActionsIconPack user_id={pack.user_id} pack_id={pack._id} />
    );
  });

  return (
    <Paper>
      {statusApp === "loading" ? (
        <Skeleton height={"60px"} count={5} background-color="#f3f3f3" foreground-color="#ecebeb" />
      ) : (
        <div>
          <Table aria-labelledby="tableTitle" size={"medium"}>
            <PacksTableHead />
            <PacksTableBody rows={rows} />
          </Table>
          <PacksTablePagination />
        </div>
      )}
    </Paper>
  );
};

/////////// types //////////////
export type DataRows = {
  name: string;
  cards: number;
  createdBy: string;
  lastUpdated: string;
  id: string;
  actions: any;
};
