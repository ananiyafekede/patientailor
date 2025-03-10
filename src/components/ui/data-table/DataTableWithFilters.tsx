
import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { Pagination } from "@/types";
import { Spinner } from "@/components/ui/spinner";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: Array<{ label: string; value: string }>;
  render?: (item: any) => React.ReactNode;
}

interface PreparedColumn extends Omit<Column, 'sortable'> {
  sortable?: boolean;
  // The sortable property can also be an object with these properties
  isSorted?: boolean;
  isSortedDesc?: boolean;
  onSort?: () => void;
}

interface Action {
  label: string;
  onClick: (item: any) => void;
  icon?: React.ReactNode;
  condition?: (item: any) => boolean;
  render?: (item: any) => React.ReactNode;
}

interface DataTableWithFiltersProps {
  title?: string;
  data: any[];
  columns: Column[];
  actions?: Action[];
  isLoading?: boolean;
  showSearch?: boolean;
  searchFields?: string[];
  pagination?: Pagination;
  onQueryChange?: (params: Record<string, any>) => void;
}

export function DataTableWithFilters({
  title,
  data,
  columns,
  actions,
  isLoading = false,
  showSearch = true,
  searchFields = [],
  pagination,
  onQueryChange,
}: DataTableWithFiltersProps) {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});
  
  // Reset state when dependencies change to prevent infinite renders
  useEffect(() => {
    if (pagination?.page) {
      setCurrentPage(pagination.page);
    }
  }, [pagination?.page]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // Don't update query on every keystroke, could add debounce here
  }, []);

  const handleSort = useCallback((field: string) => {
    let newDirection: "asc" | "desc" = "asc";
    
    if (sortField === field) {
      newDirection = sortDirection === "asc" ? "desc" : "asc";
    }
    
    setSortField(field);
    setSortDirection(newDirection);
    
    if (onQueryChange) {
      onQueryChange({
        ...filters,
        sort: field,
        order: newDirection,
        page: currentPage,
        search: searchValue || undefined,
      });
    }
  }, [sortField, sortDirection, filters, currentPage, searchValue, onQueryChange]);

  const handleFilter = useCallback((field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    
    if (onQueryChange) {
      onQueryChange({
        ...newFilters,
        sort: sortField || undefined,
        order: sortDirection,
        page: 1, // Reset to first page on filter change
        search: searchValue || undefined,
      });
    }
  }, [filters, sortField, sortDirection, searchValue, onQueryChange]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    
    if (onQueryChange) {
      onQueryChange({
        ...filters,
        sort: sortField || undefined,
        order: sortDirection,
        page,
        search: searchValue || undefined,
      });
    }
  }, [filters, sortField, sortDirection, searchValue, onQueryChange]);

  const preparedColumns: PreparedColumn[] = columns.map((column) => ({
    ...column,
    isSorted: sortField === column.key,
    isSortedDesc: sortDirection === "desc",
    onSort: column.sortable ? () => handleSort(column.key) : undefined,
  }));

  const renderPagination = () => {
    if (!pagination) return null;
    
    const { page = 1, limit = 10, total = 0, totalPages = 1 } = pagination;
    
    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {Math.min((page - 1) * limit + 1, total)} to{" "}
          {Math.min(page * limit, total)} of {total} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const applySearch = useCallback(() => {
    if (onQueryChange) {
      onQueryChange({
        ...filters,
        sort: sortField || undefined,
        order: sortDirection,
        page: 1, // Reset to first page on search
        search: searchValue || undefined,
      });
    }
  }, [filters, sortField, sortDirection, searchValue, onQueryChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        
        {showSearch && searchFields.length > 0 && (
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearch}
              className="max-w-sm"
            />
            <Button 
              variant="secondary"
              size="sm"
              onClick={applySearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {preparedColumns.map((column) => (
                <TableHead key={column.key}>
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=sorted]:text-primary"
                        onClick={column.onSort}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    )}
                    {column.filterable && column.filterOptions && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="-ml-3 h-8">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {column.filterOptions.map((option) => (
                            <DropdownMenuItem
                              key={option.value}
                              onClick={() => handleFilter(column.key, option.value)}
                            >
                              {option.label}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuItem
                            onClick={() => {
                              const newFilters = { ...filters };
                              delete newFilters[column.key];
                              setFilters(newFilters);
                              
                              if (onQueryChange) {
                                onQueryChange({
                                  ...newFilters,
                                  sort: sortField || undefined,
                                  order: sortDirection,
                                  page: 1,
                                  search: searchValue || undefined,
                                });
                              }
                            }}
                          >
                            Clear filter
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </TableHead>
              ))}
              {actions && actions.length > 0 && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="h-24 text-center"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={item.id || index}>
                  {preparedColumns.map((column) => (
                    <TableCell key={`${item.id || index}-${column.key}`}>
                      {column.render
                        ? column.render(item)
                        : item[column.key] || "N/A"}
                    </TableCell>
                  ))}
                  
                  {actions && actions.length > 0 && (
                    <TableCell>
                      <div className="flex items-center justify-end space-x-2">
                        {actions.map((action, actionIndex) => {
                          if (action.render) {
                            return (
                              <div key={`action-${actionIndex}`}>
                                {action.render(item)}
                              </div>
                            );
                          }
                          
                          if (action.condition && !action.condition(item)) {
                            return null;
                          }
                          
                          return (
                            <Button
                              key={`action-${actionIndex}`}
                              variant="ghost"
                              size="sm"
                              onClick={() => action.onClick(item)}
                            >
                              {action.icon}
                              <span className="sr-only">{action.label}</span>
                            </Button>
                          );
                        })}
                        
                        {actions.length > 2 && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {actions
                                .filter(
                                  (action) =>
                                    !action.condition || action.condition(item)
                                )
                                .map((action, actionIndex) => (
                                  <DropdownMenuItem
                                    key={`dropdown-action-${actionIndex}`}
                                    onClick={() => action.onClick(item)}
                                  >
                                    {action.icon}
                                    <span className="ml-2">{action.label}</span>
                                  </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {renderPagination()}
    </div>
  );
}
