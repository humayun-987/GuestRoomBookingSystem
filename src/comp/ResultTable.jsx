import { useState } from "react";
import { useMemo } from "react";
import DataTable from "react-data-table-component";
import { MDBInput } from "mdb-react-ui-kit";
import Checkbox from "@mui/material/Checkbox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { Box, Card, Tabs, Tab } from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
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
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    reorder: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
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
  const filteredItems = data.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  );
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
                <Tab label="Phase 1" sx={{ padding: 4 }} {...a11yProps(0)} />
                <Tab label="Phase 2" sx={{ padding: 4 }} {...a11yProps(1)} />
                <Tab label="Phase 3" sx={{ padding: 4 }} {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <DataTable
                title="Phase 1"
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              <DataTable
                title="Phase 2"
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
            </TabPanel>
            <TabPanel value={value} index={2}>
              <DataTable
                title="Phase 3"
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
            </TabPanel>
          </Box>
        </Card>
      </div>
    </>
  );
}
export default ResultTable;
