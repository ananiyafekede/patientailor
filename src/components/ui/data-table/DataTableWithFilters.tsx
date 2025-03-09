/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { DataTable } from "./DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/types";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: { label: string; value: string }[];
  render?: (item: any) => React.ReactNode;
}

interface PreparedColumn extends Column {
  sortable?: boolean | {
    isSorted: boolean;
    isSortedDesc: boolean;
    onSort: () => void;
  };
}

interface Action {
  label: string;
  icon: React.ReactNode;
  onClick: (item: any) => void;
  condition?: (item: any) => boolean;
  render?: (item: any) => React.ReactNode;
}

interface DataTableWithFiltersProps {
  data: any[];
  columns: Column[];
  actions?: Action[];
  title?: string;
  isLoading?: boolean;
  pagination?: Pagination;
  searchFields?: string[];
  onQueryChange?: (params: Record<string, any>) => void;
}

export const DataTableWithFilters = ({
  data,
  columns,
  actions,
  title,
  isLoading = false,
  pagination = { page: 1, limit: 10, total: 0, totalPages: 0 },
  searchFields = ["name"],
  onQueryChange,
}: DataTableWithFiltersProps) => {
  const { queryParams, setQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });

  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [searchValue, setSearchValue] = useState(queryParams.search || "");
  const [prevQueryParams, setPrevQueryParams] = useState(queryParams);

  // Initialize active filters from URL on component mount (only once)
  useEffect(() => {
    const filters: Record<string, any> = {};
    columns.forEach((column) => {
      if (column.filterable && queryParams[column.key]) {
        filters[column.key] = queryParams[column.key];
      }
    });
    setActiveFilters(filters);
    setSearchValue(queryParams.search || "");
  }, []); // Empty dependency array ensures this only runs once

  // Notify parent component when query params change, but prevent infinite loop
  useEffect(() => {
    // Check if queryParams actually changed to prevent infinite updates
    const hasChanged =
      JSON.stringify(queryParams) !== JSON.stringify(prevQueryParams);

    if (hasChanged && onQueryChange) {
      setPrevQueryParams({...queryParams});
      onQueryChange(queryParams);
    }
  }, [queryParams, onQueryChange, prevQueryParams]);

  // Handle search input change with debounce
  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
      const timer = setTimeout(() => {
        if (value !== queryParams.search) {
          setQueryParams({
            search: value || undefined,
            searchFields: value ? searchFields.join(",") : undefined,
            page: 1,
          });
        }
      }, 500);
      return () => clearTimeout(timer);
    },
    [queryParams.search, searchFields, setQueryParams]
  );

  // Handle sort change
  const handleSort = useCallback(
    (key: string) => {
      const currentSort = queryParams.sort;
      let newSort;

      if (currentSort === key) {
        newSort = `-${key}`;
      } else if (currentSort === `-${key}`) {
        newSort = undefined;
      } else {
        newSort = key;
      }

      // Only update if there's an actual change
      if (newSort !== currentSort) {
        setQueryParams({ sort: newSort, page: 1 });
      }
    },
    [queryParams.sort, setQueryParams]
  );

  // Handle filter change
  const handleFilter = useCallback(
    (key: string, value: string) => {
      // Only update if the value actually changed
      if (activeFilters[key] !== value) {
        if (value) {
          setActiveFilters((prev) => ({ ...prev, [key]: value }));
        } else {
          const newFilters = { ...activeFilters };
          delete newFilters[key];
          setActiveFilters(newFilters);
        }

        setQueryParams({ [key]: value || undefined, page: 1 });
      }
    },
    [activeFilters, setQueryParams]
  );

  // Remove a specific filter
  const removeFilter = useCallback(
    (key: string) => {
      if (activeFilters[key]) {
        const newFilters = { ...activeFilters };
        delete newFilters[key];
        setActiveFilters(newFilters);

        const params: Record<string, any> = { page: 1 };
        params[key] = undefined;
        setQueryParams(params);
      }
    },
    [activeFilters, setQueryParams]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    // Only perform this operation if there are filters to clear
    if (Object.keys(activeFilters).length > 0 || searchValue) {
      setActiveFilters({});
      setSearchValue("");

      // Keep only pagination and essential params
      const essentialParams = { page: 1, limit: queryParams.limit };
      setQueryParams(essentialParams);
    }
  }, [activeFilters, queryParams.limit, searchValue, setQueryParams]);

  // Pagination handling
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage !== queryParams.page) {
        setQueryParams({ page: newPage });
      }
    },
    [queryParams.page, setQueryParams]
  );

  const handleLimitChange = useCallback(
    (newLimit: string) => {
      const parsedLimit = parseInt(newLimit);
      if (parsedLimit !== queryParams.limit) {
        setQueryParams({ limit: parsedLimit, page: 1 });
      }
    },
    [queryParams.limit, setQueryParams]
  );

  // Prepare columns with sort handlers - memoize this to prevent recreating on every render
  const tableColumns = useMemo(() => {
    return columns.map((column) => {
      if (column.sortable) {
        const isSorted = queryParams.sort === column.key;
        const isSortedDesc = queryParams.sort === `-${column.key}`;

        return {
          ...column,
          sortable: {
            isSorted,
            isSortedDesc,
            onSort: () => handleSort(column.key),
          },
        };
      }
      return column;
    });
  }, [columns, queryParams.sort, handleSort]);

  return (
    <div className="w-full space-y-4 bg-white/50 backdrop-blur rounded-lg border p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {title && (
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </h1>
        )}

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
            {searchValue && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => handleSearch("")}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 pointer-events-auto">
              <div className="space-y-4">
                <h4 className="font-medium">Filters</h4>
                <Separator />

                {columns
                  .filter((col) => col.filterable)
                  .map((column) => (
                    <div key={column.key} className="space-y-2">
                      <label className="text-sm font-medium">
                        {column.label}
                      </label>
                      <Select
                        value={activeFilters[column.key] || ""}
                        onValueChange={(value) =>
                          handleFilter(column.key, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All</SelectItem>
                          {column.filterOptions?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}

                <Separator />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  disabled={
                    Object.keys(activeFilters).length === 0 && !searchValue
                  }
                >
                  Reset all filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active filters display */}
      {(Object.keys(activeFilters).length > 0 || searchValue) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>
          {searchValue && (
            <Badge variant="outline" className="flex items-center gap-1">
              Search: {searchValue}
              <button onClick={() => handleSearch("")} type="button">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {Object.entries(activeFilters).map(([key, value]) => (
            <Badge
              key={key}
              variant="outline"
              className="flex items-center gap-1"
            >
              {columns.find((col) => col.key === key)?.label}: {value}
              <button onClick={() => removeFilter(key)} type="button">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {(Object.keys(activeFilters).length > 0 || searchValue) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-7 px-2"
            >
              Clear all
            </Button>
          )}
        </div>
      )}

      <DataTable
        data={data}
        columns={tableColumns as Column[]}
        actions={actions}
        searchable={false} // Disable built-in search as we're using our custom one
      />

      {pagination && pagination.totalPages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
            <Select
              value={String(queryParams.limit || 10)}
              onValueChange={handleLimitChange}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>

            <span className="text-sm text-muted-foreground">
              {pagination.total > 0
                ? `${(pagination.page - 1) * pagination.limit + 1}-${Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )} of ${pagination.total}`
                : "No items"}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || isLoading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
