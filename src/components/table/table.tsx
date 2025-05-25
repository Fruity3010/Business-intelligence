'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FilterOption {
  value: string;
  label: string;
}

interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  filterable?: boolean;
  filterOptions?: FilterOption[];
}

interface ReusableTableProps {
  columns: TableColumn[];
  data: any[];
  title?: string;
  showFilterButton?: boolean;
  initialRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  footerContent?: React.ReactNode;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  title,
  showFilterButton = false,
  initialRowsPerPage = 10,
  rowsPerPageOptions = [5, 8],
  footerContent,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedFilterValues, setSelectedFilterValues] = useState<Map<string, Set<string>>>(new Map());
  const [modalFilterSelections, setModalFilterSelections] = useState<Map<string, Set<string>>>(new Map());
  const [filteredData, setFilteredData] = useState(data);
  const [expandedFilterPanel, setExpandedFilterPanel] = useState<string | false>(false);

  const applyFiltersToData = useCallback(() => {
    let currentFilteredData = data;
    selectedFilterValues.forEach((selectedOptions, columnId) => {
      if (selectedOptions.size > 0) {
        currentFilteredData = currentFilteredData.filter(row =>
          selectedOptions.has(String(row[columnId]))
        );
      }
    });
    setFilteredData(currentFilteredData);
    setPage(0);
  }, [data, selectedFilterValues]);

  useEffect(() => {
    applyFiltersToData();
  }, [applyFiltersToData]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterableColumns = columns.filter(col => col.filterable && col.filterOptions && col.filterOptions.length > 0);

  const handleOpenFilterModal = useCallback(() => {
    const initialModalSelections = new Map<string, Set<string>>();
    selectedFilterValues.forEach((values, key) => {
      initialModalSelections.set(key, new Set(values));
    });
    setModalFilterSelections(initialModalSelections);

    if (filterableColumns.length > 0) {
      setExpandedFilterPanel(filterableColumns[0].id);
    } else {
      setExpandedFilterPanel(false);
    }
    setOpenFilterModal(true);
  }, [selectedFilterValues, filterableColumns]);

  const handleCloseFilterModal = useCallback(() => {
    setOpenFilterModal(false);
    setExpandedFilterPanel(false);
  }, []);

  const handleApplyFilters = useCallback(() => {
    setSelectedFilterValues(new Map(modalFilterSelections));
    setOpenFilterModal(false);
    setExpandedFilterPanel(false);
  }, [modalFilterSelections]);

  const handleClearFiltersInModal = useCallback(() => {
    setModalFilterSelections(new Map());
    setExpandedFilterPanel(false); 
    setOpenFilterModal(false);
  }, []);

  const handleCheckboxChange = useCallback((columnId: string, value: string, isChecked: boolean) => {
    setModalFilterSelections(prev => {
      const newMap = new Map(prev);
      const currentSet = newMap.get(columnId) || new Set();

      if (isChecked) {
        currentSet.add(value);
      } else {
        currentSet.delete(value);
      }
      newMap.set(columnId, currentSet);
      return newMap;
    });
  }, []);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFilterPanel(isExpanded ? panel : false);
  };

  const handleChipDelete = useCallback((columnId: string, valueToRemove: string) => {
    setSelectedFilterValues(prev => {
      const newMap = new Map(prev);
      const currentSet = newMap.get(columnId);
      if (currentSet) {
        currentSet.delete(valueToRemove);
        if (currentSet.size === 0) {
          newMap.delete(columnId);
        } else {
          newMap.set(columnId, currentSet);
        }
      }
      return newMap;
    });
  }, []);

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const activeChips = Array.from(selectedFilterValues.entries()).flatMap(([columnId, values]) => {
    const column = columns.find(col => col.id === columnId);
    return Array.from(values).map(value => ({
      columnId,
      columnLabel: column?.label || columnId,
      value: value,
      label: `${column?.label || columnId}: ${value}`,
    }));
  });

  return (
    <Paper className="w-full h-full overflow-hidden rounded-lg " sx={{ boxShadow: "none"}}  elevation={0}>
      <Box className=" flex justify-between items-center bg-gray-50 border-b border-gray-200"
       sx={{padding: '20px'}}>
        {title && (
          <Typography variant="h6" className="text-gray-800 font-semibold">
            {title}
          </Typography>
        )}
        {showFilterButton && filterableColumns.length > 0 && (
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={handleOpenFilterModal}
            className=" hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm font-medium shadow-sm"
          >
            Filter
          </Button>
        )}
      </Box>

      {activeChips.length > 0 && (
        <Box className="flex flex-wrap bg-white border-b " gap='0.75rem' sx={{p: 2}}>
          <Typography variant="subtitle2" className="self-center">Active Filters:</Typography>
          {activeChips.map((chip) => (
            <Chip
              key={`${chip.columnId}-${chip.value}`}
              label={chip.label}
              onDelete={() => handleChipDelete(chip.columnId, chip.value)}
              deleteIcon={<CloseIcon />}
              sx={{backgroundColor: '#0B3D7E', color:'white'}}
            />
          ))}
          <Button onClick={() => setSelectedFilterValues(new Map())} size="small">
            Clear All
          </Button>
        </Box>
      )}

      <TableContainer className="max-h-[600px] overflow-y-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="bg-gray-100 font-semibold text-gray-700 border-b border-gray-200"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex} className="even:bg-gray-50">
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align} className="text-gray-700">
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-gray-500 py-8">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="bg-gray-50 border-t border-gray-200 p-2 text-gray-700"
      />

      {footerContent && (
        <Box className="p-4 bg-gray-50 border-t border-gray-200 text-gray-700">
          {footerContent}
        </Box>
      )}

      <Dialog open={openFilterModal} onClose={handleCloseFilterModal} fullWidth maxWidth="sm">
        <DialogTitle className="flex justify-between items-center pr-4">
          Filter Options
          <Button onClick={handleCloseFilterModal} size="small" sx={{ minWidth: 0, padding: '4px' }}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', height: '20rem', overflow: 'hidden' }}>
          <Box sx={{ width: '50%', overflowY: 'auto', pr: 2 }}>
            {filterableColumns.map((column) => (
              <Accordion
                key={column.id}
                expanded={expandedFilterPanel === column.id}
                onChange={handleAccordionChange(column.id)}
                disabled={!column.filterOptions || column.filterOptions.length === 0}
                sx={{
                  '&.Mui-expanded': {
                    margin: 'auto',
                  },
                  '&.Mui-disabled': {
                    opacity: 0.6,
                    cursor: 'not-allowed',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${column.id}-content`}
                  id={`${column.id}-header`}
                >
                  <Typography variant="subtitle1" className="font-semibold text-gray-800">
                    {column.label}
                  </Typography>
                </AccordionSummary>
              </Accordion>
            ))}
            {filterableColumns.length === 0 && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                No filterable columns defined.
              </Typography>
            )}
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 2, maxWidth: '50%'}}>
           
            {!expandedFilterPanel ? (
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%', 
                color: 'text.secondary'
              }}>
                <Typography variant="body1">Select a filter category .</Typography>
              </Box>
            ) : (
              filterableColumns.map((column) => (
                <AccordionDetails
                  key={`details-${column.id}`}
                  sx={{
                    display: expandedFilterPanel === column.id ? 'block' : 'none',
                    p: 0,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                    Select {column.label} options:
                  </Typography>
                  {column.filterOptions && column.filterOptions.length > 0 ? (
                    column.filterOptions.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        control={
                          <Checkbox
                            checked={modalFilterSelections.get(column.id)?.has(option.value) || false}
                            onChange={(e) => handleCheckboxChange(column.id, option.value, e.target.checked)}
                          />
                        }
                        label={option.label}
                        className="w-full mr-0 justify-between pr-4"
                        sx={{ width: '100%', m: 0 }}
                      />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.disabled">
                      No options available for {column.label}.
                    </Typography>
                  )}
                </AccordionDetails>
              ))
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearFiltersInModal}>Clear All</Button>
          <Button onClick={handleApplyFilters} variant="contained" className="bg-blue-600 hover:bg-blue-700 text-white">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ReusableTable;