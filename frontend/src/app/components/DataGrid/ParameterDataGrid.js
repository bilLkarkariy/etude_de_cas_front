import React from 'react';
import { Row } from 'react-data-grid';
import { createSelector } from 'reselect';
import moment from 'moment';
import { orderBy, cloneDeep } from 'lodash';
import Typography from '@material-ui/core/Typography';
import ReactDataGrid from 'react-data-grid';
import react_data_grid_addons from 'react-data-grid-addons';
import PropTypes from 'prop-types';

import DateTimeFormatter from '../Formatters/ColumnFormatterDateTime';

const {
     Toolbar,
     Data: { Selectors },
} = react_data_grid_addons;

class ParameterDataGrid extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               filters: {},
               sortColumn: null,
               sortDirection: null,
               expanded: {},
          };
     }

     rowGetter = i => {
          const rows = this.getRows();
          return rows[i];
     };

     rowsCount = () => {
          const rows = this.getRows();
          return rows.length;
     };

     hasDateFormatting = columnKey => {
          return Boolean(
               this.props.gridColumns.find(
                    column =>
                         column.key === columnKey &&
                         column.formatter === DateTimeFormatter,
               ),
          );
     };

     dateCompare = (rows, sortColumn, sortDirection) => {
          const compare = (a, b) => {
               if (a[sortColumn] === null || a[sortColumn] === undefined) {
                    return 1;
               } else if (
                    b[sortColumn] === null ||
                    b[sortColumn] === undefined
               ) {
                    return -1;
               }
               return moment(a[sortColumn]).isBefore(moment(b[sortColumn]))
                    ? 1
                    : -1;
          };
          return sortDirection === 'NONE'
               ? rows
               : sortDirection === 'ASC'
               ? cloneDeep(rows).sort(compare)
               : cloneDeep(rows).sort((a, b) => -1 * compare(a, b));
     };

     getInputRows = (_, props) => props.rows;
     getSortColumn = state => state.sortColumn;
     getSortDirection = state => state.sortDirection;
     getSortedRows = createSelector(
          [this.getInputRows, this.getSortColumn, this.getSortDirection],
          (rows, sortColumn, sortDirection) => {
               if (!sortDirection && !sortColumn) {
                    return rows;
               }
               if (this.hasDateFormatting(sortColumn)) {
                    return this.dateCompare(rows, sortColumn, sortDirection);
               }
               return sortDirection === 'NONE'
                    ? rows
                    : orderBy(rows, [sortColumn], [sortDirection]);
          },
     );

     getRows = () => {
          return Selectors.getRows({
               rows: this.getSortedRows(this.state, this.props),
               filters: this.state.filters,
               sortColumn: this.state.sortColumn,
               sortDirection: this.state.sortDirection,
               expanded: this.state.expanded,
          });
     };

     handleFilterChange = filter => {
          let newFilters = Object.assign({}, this.state.filters);
          if (filter.filterTerm) {
               newFilters[filter.column.key] = filter;
          } else {
               delete newFilters[filter.column.key];
          }
          this.setState({ filters: newFilters });
     };

     onClearFilters = () => {
          this.setState({ filters: {} });
     };

     handleGridSort = (sortColumn, sortDirection) => {
          this.setState({
               sortColumn: sortColumn,
               sortDirection: sortDirection,
          });
     };

     onRowClick = (rowIdx, row, column) => {
          if (row !== undefined) {
               return this.props.onRowClick(
                    row[this.props.keyIndexName],
                    column['key'],
               );
          }
     };

     render() {
          return (
               <Typography component={'span'}>
                    <ReactDataGrid
                         columns={this.props.gridColumns}
                         rowGetter={this.rowGetter}
                         rowsCount={this.rowsCount()}
                         minHeight={this.props.height}
                         toolbar={<Toolbar enableFilter={true} />}
                         onAddFilter={this.handleFilterChange}
                         onClearFilters={this.onClearFilters}
                         onGridSort={this.handleGridSort}
                         onRowClick={this.onRowClick}
                         rowHeight={40}
                         rowRenderer={this.props.rowFormatter}
                    />
               </Typography>
          );
     }
}

ParameterDataGrid.propTypes = {
     gridColumns: PropTypes.array.isRequired,
     height: PropTypes.number.isRequired,
     onRowClick: PropTypes.func.isRequired,
     rowFormatter: PropTypes.func,
     rows: PropTypes.array.isRequired,
     keyIndexName: PropTypes.string.isRequired,
};

ParameterDataGrid.defaultProps = {
     rowFormatter: class RowFormatterEmpty extends React.Component {
          render() {
               return (
                    <div>
                         <Row ref={node => (this.row = node)} {...this.props} />
                    </div>
               );
          }
     },
     height: window.innerHeight * 0.9 - 100,
};

export default ParameterDataGrid;
