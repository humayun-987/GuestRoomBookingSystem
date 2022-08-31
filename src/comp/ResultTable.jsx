import { useState } from "react";
import { useMemo } from "react";
import DataTable from "react-data-table-component";
import { MDBInput } from "mdb-react-ui-kit";
import Checkbox from "@mui/material/Checkbox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { Box, Card, Tabs, Tab } from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import result from '../Phase1_Result.json'
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
const PoolA = result["POOL A"];
const PoolB = result["POOL B"];
const PoolC = result["POOL C"];

const columns = [
  {
    name: "Name",
    selector: (row) => row.Name,
    sortable: true,
    reorder: true,
  },
  {
    name: "Registration ID",
    selector: (row) => row["Registration ID"],
    sortable: true,
    reorder: true,
  },
  {
    name: "School Name",
    selector: (row) => row["School Name"],
    sortable: true,
    reorder: true,
  },
  {
    name: "Total Marks",
    selector: (row) => row["Total Marks"],
    sortable: true,
    reorder: true,
  },
  {
    name: "Overall Rank",
    selector: (row) => row["Overall Rank"],
    sortable: true,
    reorder: true,
  },
];

const PoolD = [
  {
    id: 1,
    Name: "Beetlejuice",
    "Overall Rank": "1988",
  },
  {
    id: 2,
    Name: "Ghostbusters",
    "Overall Rank": "1984",
  },
];
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function ResultTable() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  function applyFilter(item) {
    return item.Name && item.Name.toLowerCase().includes(filterText.toLowerCase())
  }

  const filteredItemsA = PoolA.filter(applyFilter);

  const filteredItemsB = PoolB.filter(applyFilter);

  const filteredItemsC = PoolC.filter(applyFilter);
  // console.log(data)
  // console.log(PoolA);
  // console.log(filteredItems);
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <>
      <div className="my-5">
        <Card style={{ height: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
              >
                <Tab label="Pool A" sx={{ padding: 4 }} {...a11yProps(0)} />
                <Tab label="Pool B" sx={{ padding: 4 }} {...a11yProps(1)} />
                <Tab label="Pool C" sx={{ padding: 4 }} {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <DataTable
                title="Pool A"
                columns={columns}
                data={filteredItemsA}
                defaultSortFieldId={4}
                defaultSortAsc={false}
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeaderComponent={subHeaderComponentMemo}
                subHeader
                highlightOnHover
                defaultSortField="Overall Rank"
                sortIcon={<ArrowDownward />}
                selectableRowsComponent={Checkbox}
                pagination
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <DataTable
                title="Pool B"
                columns={columns}
                data={filteredItemsB}
                defaultSortFieldId={4}
                defaultSortAsc={false}
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeaderComponent={subHeaderComponentMemo}
                subHeader
                highlightOnHover
                defaultSortField="Overall Rank"
                sortIcon={<ArrowDownward />}
                selectableRowsComponent={Checkbox}
                pagination
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <DataTable
                title="Pool C"
                columns={columns}
                data={filteredItemsC}
                defaultSortFieldId={4}
                defaultSortAsc={false}
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeaderComponent={subHeaderComponentMemo}
                subHeader
                highlightOnHover
                defaultSortField="Overall Rank"
                sortIcon={<ArrowDownward />}
                selectableRowsComponent={Checkbox}
                pagination
              />
            </TabPanel>
          </Box>
        </Card>
      </div>
    </>
  );
}
export default ResultTable;
