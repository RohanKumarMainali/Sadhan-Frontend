import { useTable } from 'react-table'
import { useState, useEffect, useMemo } from 'react'
import { useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table' // new
import { DOTS, useCustomPagination } from './useCustomPagination'
import { Button, PageButton } from './Button'
import { GrFormSearch } from 'react-icons/gr'

// Define a UI for filtering

function Table({ columns, data }: any) {
  // useTable hook creates a instance of react-table
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,

    // pagination , instead of rows we use page here
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize

    // Get the state from the instance
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 }
    },
    useGlobalFilter,
    usePagination
  )

  const { pageIndex, pageSize, globalFilter } = state
  useEffect(() => {
    // props.dispatch({ type: actions.resetPage })
    console.log('Updating ' +globalFilter)
  }, [globalFilter])

  const paginationRange = useCustomPagination({
    totalPageCount: pageCount,
    currentPage: pageIndex
  })
  console.log(paginationRange)


  // Render the UI for your table and the styles
  return (
    <div className="mt-2 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <input
              type="text"
              value={globalFilter || ''}
              onChange={e => setGlobalFilter(e.target.value)}
            />

            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-10">
                {headerGroups.map((headerGroup: any) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-6 py-5 text-left text-20 font-medium text-gray-400 uppercase rounded-sm tracking-wider"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {page.map((row: any, i: number) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell: any) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-10 whitespace-nowrap"
                          >
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="py-3 flex items-center text-center justify-center pt-10">
        <div className="flex-1 flex justify-between md:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div
          className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          aria-label="Pagination"
        >
          <div
            className="relative z-0 inline-flex items-center ml-auto mr-auto rounded-md shadow-sm space-x-10"
            aria-label="Pagination"
          >
            {paginationRange?.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                return <PageButton key={index}>...</PageButton>
              }

              if (pageNumber - 1 === pageIndex) {
                return (
                  <PageButton
                    key={index}
                    className=" active:bg-gray-500 active:border-gray-300"
                    onClick={() => gotoPage(pageNumber - 1)}
                  >
                    {pageNumber}
                  </PageButton>
                )
              }

              return (
                <PageButton
                  key={index}
                  className="active:bg-gray-500 active:border-gray-300"
                  onClick={() => gotoPage(pageNumber - 1)}
                >
                  {pageNumber}
                </PageButton>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
