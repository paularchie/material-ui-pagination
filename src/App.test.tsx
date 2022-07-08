import React from "react";
import { act, screen, within } from "@testing-library/react";
import App from "./App";
import getRenderedComponent from "./__test__/utils/MockApolloProvider";
import { COUNTRIES_QUERY_RESPONSE } from "./__test__/mocks/api-responses/countriesQueryResponse.mock";
import { COUNTRIES_QUERY } from "./common/graphql/queries/countries";
import { columnKeys } from "./components/CountryList/country-list-view-config";
import { Country } from "./common/types/Country";
import userEvent from "@testing-library/user-event";
import { waitForResponse } from "./__test__/utils/testUtils";
import selectors from "./__test__/selectors/countryList.selectors";

test("renders component", async () => {
  const { container } = await renderView();

  expect(container).toBeInTheDocument();
});

test("renders table", async () => {
  await renderView();

  const table = screen.getByTestId(selectors.TABLE);

  expect(table).toBeInTheDocument();
});

test("renders the correct columns", async () => {
  await renderView();

  const columnHeaders = screen.getAllByTestId(selectors.TABLE_HEADER_CELL);

  // columns must be displayed in this order
  const labels = [
    "Country Flag",
    "Country Code",
    "Country Name",
    "Dialing Code",
  ];

  expect(columnHeaders.length).toEqual(4);

  columnHeaders.forEach((header, index) => {
    expect(header.textContent).toEqual(labels[index]);
  });
});

test("displays data on an initial page load", async () => {
  await renderView();

  // check the initial state of UI
  checkPaginationState({ rowsPerPage: 15, page: 0 });
});

test("updates data on pagination change", async () => {
  await renderView();

  // change rows per page
  const ROWS_PER_PAGE = 45;
  const paginator = screen.getByTestId(selectors.PAGINATOR);
  let rowsPerPageDropdownTrigger = within(paginator).getAllByRole("button")[0];

  userEvent.click(rowsPerPageDropdownTrigger); // expand dropdown

  const rowPerPageOption = within(screen.getByRole("listbox")).getByText(
    ROWS_PER_PAGE
  );
  userEvent.click(rowPerPageOption); // select rows per page option

  // verify the table has been updated reflecting the new pagination state
  checkPaginationState({ rowsPerPage: ROWS_PER_PAGE, page: 0 });

  // go to the next page of results
  const goToNextPageBtn = screen.getByLabelText("Go to next page");
  userEvent.click(goToNextPageBtn);

  // verify the table has been updated reflecting the new pagination state
  checkPaginationState({ rowsPerPage: ROWS_PER_PAGE, page: 1 });
});

function checkPaginationState({ page = 0, rowsPerPage = 15 }) {
  // check if the row count matches the rowsPerPage value
  const rows = screen.getAllByTestId(selectors.TABLE_ROW);
  expect(rows.length).toEqual(rowsPerPage);

  // verify that the data has been correctly paginated
  const offset = rowsPerPage * page;
  rows.forEach((row, rowIndex) => {
    const cells = within(row).getAllByTestId(selectors.TABLE_CELL);

    cells.forEach((cell, cellIndex) => {
      const field: keyof Country = columnKeys[cellIndex];
      const value = COUNTRIES_QUERY_RESPONSE[offset + rowIndex][field];

      expect(cell.textContent).toEqual(value);
    });
  });

  // verify that the pagination state is displayed correctly
  const paginationState = `${offset + 1}–${offset + rowsPerPage} of ${
    COUNTRIES_QUERY_RESPONSE.length
  }`;
  screen.getByText(paginationState);
}

async function renderView() {
  const view = getRenderedComponent(<App />, getMockResponse({}));
  await act(() => waitForResponse());

  return view;
}

function getMockResponse(data: Record<string, unknown>) {
  return [
    {
      request: {
        query: COUNTRIES_QUERY,
      },
      result: {
        data: {
          countries: COUNTRIES_QUERY_RESPONSE,
        },
      },
    },
  ];
}
