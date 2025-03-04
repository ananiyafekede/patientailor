/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
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

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: { label: string; value: string }[];
}

interface Action {
  label: string;
  icon: React.ReactNode;
  onClick: (item: any) => void;
}

export interface Pagination {
  total: number;
  limit: number;
  page: number;
  totalPages: number;
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
  pagination,
  searchFields = ["name"],
  onQueryChange,
}: DataTableWithFiltersProps) => {
  const { queryParams, setQueryParams, resetQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });

  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

  // Notify parent component when query params change
  useEffect(() => {
    if (onQueryChange) {
      onQueryChange(queryParams);
    }
  }, [queryParams, onQueryChange]);

  // Handle search input change
  const handleSearch = (value: string) => {
    setQueryParams({
      search: value || undefined,
      searchFields: value ? searchFields.join(",") : undefined,
      page: 1, // Reset to first page on new search
    });
  };

  // Handle sort change
  const handleSort = (key: string) => {
    const currentSort = queryParams.sort;
    let newSort;

    if (currentSort === key) {
      newSort = `-${key}`; // Descending
    } else if (currentSort === `-${key}`) {
      newSort = undefined; // Remove sort
    } else {
      newSort = key; // Ascending
    }

    setQueryParams({ sort: newSort });
  };

  // Handle filter change
  const handleFilter = (key: string, value: string) => {
    setQueryParams({ [key]: value, page: 1 });

    if (value) {
      setActiveFilters((prev) => ({ ...prev, [key]: value }));
    } else {
      const newFilters = { ...activeFilters };
      delete newFilters[key];
      setActiveFilters(newFilters);
    }
  };

  // Remove a specific filter
  const removeFilter = (key: string) => {
    const params: Record<string, any> = { page: 1 };
    params[key] = undefined;
    setQueryParams(params);

    const newFilters = { ...activeFilters };
    delete newFilters[key];
    setActiveFilters(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    resetQueryParams();
    setActiveFilters({});
    setQueryParams({ page: 1, limit: 10 });
  };

  // Pagination handling
  const handlePageChange = (newPage: number) => {
    setQueryParams({ page: newPage });
  };

  const handleLimitChange = (newLimit: string) => {
    setQueryParams({ limit: parseInt(newLimit), page: 1 });
  };

  // Prepare columns with sort handlers
  const tableColumns = columns.map((column) => ({
    ...column,
    sortable: column.sortable
      ? {
          isSorted: queryParams.sort === column.key,
          isSortedDesc: queryParams.sort === `-${column.key}`,
          onSort: () => handleSort(column.key),
        }
      : undefined,
  }));

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
              value={queryParams.search || ""}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
            {queryParams.search && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => handleSearch("")}
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
            <PopoverContent className="w-80">
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
                        value={queryParams[column.key] || ""}
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
                    Object.keys(activeFilters).length === 0 &&
                    !queryParams.search
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
      {(Object.keys(activeFilters).length > 0 || queryParams.search) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>
          {queryParams.search && (
            <Badge variant="outline" className="flex items-center gap-1">
              Search: {queryParams.search}
              <button onClick={() => handleSearch("")}>
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
              <button onClick={() => removeFilter(key)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {(Object.keys(activeFilters).length > 0 || queryParams.search) && (
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
        columns={tableColumns}
        actions={actions}
        searchable={false} // Disable built-in search as we're using our custom one
      />

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
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
