
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";
import { useEffect, useCallback } from "react";

interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  searchFields?: string;
  _tab?: string;
  _appointment_view?: string;
  [key: string]: any;
}

export function useQueryParams(initialParams: QueryOptions = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to get current query params as an object
  const getQueryParams = useCallback((): Record<string, any> => {
    const params: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      // Convert numeric values
      params[key] =
        !isNaN(Number(value)) && value !== "" ? Number(value) : value;
    });
    return params;
  }, [searchParams]);

  // Function to update query params
  const setQueryParams = useCallback(
    (params: Record<string, any>) => {
      const currentParams = getQueryParams();
      const newParams = { ...currentParams, ...params };

      // Remove empty values
      Object.keys(newParams).forEach((key) => {
        if (!newParams[key] && newParams[key] !== 0) {
          delete newParams[key];
        }
      });

      setSearchParams(new URLSearchParams(newParams as Record<string, string>));
    },
    [getQueryParams, setSearchParams]
  );

  // Function to reset all query params
  const resetQueryParams = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  // Set initial params on first render if missing in URL
  useEffect(() => {
    if (!searchParams.toString()) {
      setQueryParams(initialParams);
    }
  }, [setQueryParams, searchParams, initialParams]);

  // Function to get query params excluding UI-specific params for backend requests
  const getFilteredQueryParams = useCallback(() => {
    const filteredParams = { ...getQueryParams() };
    // Exclude UI-specific params from backend queries
    delete filteredParams._tab;
    delete filteredParams._appointment_view;
    return filteredParams;
  }, [getQueryParams]);

  return {
    queryParams: getQueryParams(),
    setQueryParams,
    resetQueryParams,
    getFilteredQueryParams,
  };
}
