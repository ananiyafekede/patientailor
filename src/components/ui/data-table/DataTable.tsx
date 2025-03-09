
import { useState, useMemo } from "react";
import {
  MoreVertical,
  SortAsc,
  SortDesc,
  Filter,
} from "lucide-react";
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
import { Spinner } from "@/components/ui/spinner";

interface Column {
  key: string;
  label: string;
  sortable?: boolean | {
    isSorted: boolean;
    isSortedDesc: boolean;
    onSort: () => void;
  };
  render?: (item: any) => React.ReactNode;
}

interface Action {
  label: string;
  icon: React.ReactNode;
  onClick: (item: any) => void;
  condition?: (item: any) => boolean;
  render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  actions?: Action[];
  title?: string;
  searchable?: boolean;
  isLoading?: boolean;
}

export const DataTable = ({
  data,
  columns,
  actions,
  title,
  searchable = true,
  isLoading = false,
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Render cell content - either use the render function or display the raw value
  const renderCell = (item: any, column: Column) => {
    if (column.render) {
      return column.render(item);
    }
    return item[column.key];
  };

  // Determine if an action should be shown for this item
  const shouldShowAction = (action: Action, item: any) => {
    return action.condition ? action.condition(item) : true;
  };

  // Handle sort click
  const handleSortClick = (column: Column) => {
    if (typeof column.sortable === 'object' && column.sortable.onSort) {
      column.sortable.onSort();
    }
  };

  return (
    <div className="w-full space-y-4 bg-white/50 backdrop-blur rounded-lg border p-4">
      {(title || searchable) && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {title && (
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {title}
            </h1>
          )}
          {searchable && (
            <div className="w-full md:w-auto">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          )}
        </div>
      )}

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={
                    column.sortable ? "cursor-pointer select-none" : ""
                  }
                  onClick={() => column.sortable && handleSortClick(column)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && typeof column.sortable === 'object' && (
                      <span className="text-muted-foreground">
                        {column.sortable.isSorted ? (
                          column.sortable.isSortedDesc ? (
                            <SortDesc className="h-4 w-4" />
                          ) : (
                            <SortAsc className="h-4 w-4" />
                          )
                        ) : (
                          <Filter className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
              {actions && <TableHead className="w-[100px]">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="h-24 text-center"
                >
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {renderCell(item, column)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {actions.map((action, actionIndex) => (
                          action.render ? (
                            <div key={actionIndex}>
                              {shouldShowAction(action, item) && action.render(item)}
                            </div>
                          ) : (
                            shouldShowAction(action, item) && (
                              <DropdownMenu key={actionIndex}>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {actions
                                    .filter(action => shouldShowAction(action, item))
                                    .map((action, idx) => (
                                    <DropdownMenuItem
                                      key={idx}
                                      onClick={() => action.onClick(item)}
                                    >
                                      <span className="flex items-center gap-2">
                                        {action.icon}
                                        {action.label}
                                      </span>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )
                          )
                        ))}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
