import Paper from "@mui/material/Paper";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Country } from "../../common/types/Country";
import { usePagination } from "../../common/hooks/usePagination";
import {
  columnKeys,
  columnLabelMapping,
  ROWS_PER_PAGE_DEFAULT,
  ROWS_PER_PAGE_OPTIONS,
  tableCellPropsMapping,
} from "./country-list-view-config";
import selectors from "../../__test__/selectors/countryList.selectors";

type CountryListProps = {
  countries?: Country[];
};

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  const {
    currentPage,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    paginatedData,
  } = usePagination<Country>({
    data: countries,
    initialRowsPerPage: ROWS_PER_PAGE_DEFAULT,
  });

  return (
    <>
      {paginatedData?.length && (
        <>
          <TableContainer component={Paper} className="table-container">
            <Table data-testid={selectors.TABLE} stickyHeader>
              <TableHead>
                <TableRow>
                  {columnKeys.map((key: keyof Country) => (
                    <TableCell
                      key={key}
                      width={tableCellPropsMapping.get(key)?.width}
                      data-testid={selectors.TABLE_HEADER_CELL}
                    >
                      {columnLabelMapping.get(key) || key}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((country) => (
                  <TableRow
                    key={country.code}
                    data-testid={selectors.TABLE_ROW}
                  >
                    {columnKeys.map((key: keyof Country) => (
                      <TableCell
                        key={`${country.code}-${key}}`}
                        width={tableCellPropsMapping.get(key)?.width}
                        data-testid={selectors.TABLE_CELL}
                      >
                        {country[key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={countries?.length || 0}
            page={currentPage}
            onPageChange={handlePageChange}
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            data-testid={selectors.PAGINATOR}
            className="paginator"
          />
        </>
      )}
    </>
  );
};

export default CountryList;
