import { useState } from "react";
import { useMemo } from "react";
import DataTable from "react-data-table-component";
import { MDBInput } from "mdb-react-ui-kit";
import Checkbox from '@mui/material/Checkbox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { Card } from "@mui/material";
const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<MDBInput
			id="search"
			type="text"
			placeholder="Filter By Name"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/> 
		{/* <MDBBtn type="button" onClick={onClear}>
			X
		</MDBBtn> */}
	</>
);
const columns = [
	{
		name: 'Title',
		selector: row => row.title,
		sortable: true,
		reorder: true,
	},
	{
		name: 'Year',
		selector: row => row.year,
		sortable: true,
		reorder: true,
	},
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  }
];

function ResultTable() {
    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] =useState(false);
    const filteredItems = data.filter(
		item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
	);
	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);
  return (
    <>
    <div className="my-5">
    <Card style={{ height: '100%' }}>
			<DataTable
				title="Results"
				columns={columns}
				data={filteredItems}
				defaultSortFieldId={1}
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeaderComponent={subHeaderComponentMemo}
        subHeader
				highlightOnHover
				defaultSortField="title"
				sortIcon={<ArrowDownward />}
				selectableRowsComponent={Checkbox}
				pagination
			/>
		</Card>
    </div>
    </>
  );
}
export default ResultTable;
