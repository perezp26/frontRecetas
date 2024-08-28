export const ColumnasTableRecetas = () => [

    {
        accessorKey: 'fechaReceta', //simple recommended way to define a column
        header: 'Fecha',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 70,
    }, 
    {
        accessorKey: 'diagnostico', //simple recommended way to define a column
        header: 'Diagnostico',
        muiTableHeadCellProps: { sx: { color: '#4b5563' } }, //custom props
        size: 650,
    }, 

]