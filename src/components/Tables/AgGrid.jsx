import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const AgGrid = props =>{
    return <div className="ag-theme-alpine ag-style  grid-cols-12 "style={{  width: '1030px',
       height: '500px' }}>
        <AgGridReact
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
              }}
            groupDisplayType={"groupRows"}
            columnDefinitionDefaults={{
                enableRowGroup: false
              }}
            autoGroupColumnDef={props.autoGroupColumnDef}
            domLayout='autoHeight'
            pagination = {true}
            paginationPageSize = {10}
            rowData={props.rowData}
            columnDefs={props.columnDefs} 
            animateRows = {true}
            rowHeight={props.rowHeight}
            onCellClicked={(event) => {
              if(event.column.getColId()=='Action'){
               props.ActionClicked(event.data)
              }
            
            }}
            onGridReady={(params) => {
                params?.columnApi?.autoSizeColumns();
              }}
            >
           
        </AgGridReact>
    </div>
}

export default AgGrid;