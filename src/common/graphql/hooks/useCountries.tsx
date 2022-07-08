import { useQuery } from "@apollo/client";
import { Country } from "../../types/Country";
import { COUNTRIES_QUERY } from "../queries/countries";

export const useCountries = () => {
  return useQuery<{ countries: Country[] }>(COUNTRIES_QUERY);
};
