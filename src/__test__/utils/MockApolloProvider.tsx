import React, { ReactNode } from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { InMemoryCache } from "@apollo/client";
import { render } from "@testing-library/react";

const getRenderedComponent = (
  Component: ReactNode,
  mockResponses?: ReadonlyArray<MockedResponse>
) => {
  const cache = new InMemoryCache({});

  return render(
    <MockedProvider
      mocks={mockResponses}
      cache={cache}
      addTypename={true}
      defaultOptions={{
        watchQuery: {
          fetchPolicy: "cache-first",
        },
      }}
    >
      {Component}
    </MockedProvider>
  );
};

export default getRenderedComponent;
