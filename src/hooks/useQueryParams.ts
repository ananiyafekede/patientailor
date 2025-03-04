
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  searchFields?: string;
  [key: string]: any;
}

export function useQueryParams(initialParams: QueryOptions = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Set initial params on first render
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    
    // Only set initial params if they don't already exist in URL
    if (Object.keys(currentParams).length === 0 && Object.keys(initialParams).length > 0) {
      setQueryParams(initialParams);
    }
  }, []);

  // Get current query params as an object
  const getQueryParams = (): Record<string, any> => {
    const params: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      // Convert numeric strings to numbers
      if (!isNaN(Number(value)) && value !== '') {
        params[key] = Number(value);
      } else {
        params[key] = value;
      }
    });
    return params;
  };

  // Set query params (adds or updates)
  const setQueryParams = (params: Record<string, any>) => {
    const currentParams = getQueryParams();
    const newParams = { ...currentParams, ...params };
    
    // Remove any null or undefined values
    Object.keys(newParams).forEach(key => {
      if (newParams[key] === null || newParams[key] === undefined || newParams[key] === '') {
        delete newParams[key];
      }
    });
    
    setSearchParams(newParams);
  };

  // Reset all query params
  const resetQueryParams = () => {
    setSearchParams({});
  };

  return {
    queryParams: getQueryParams(),
    setQueryParams,
    resetQueryParams
  };
}
