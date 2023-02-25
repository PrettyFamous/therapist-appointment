import { Box, Tabs, Tab, Button, Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

import TabPanel from "../../components/TabPanel";
import NotFound from "../NotFound";
import Appointments from "../../components/Appointments";

import "./AdminPanel.scss";

const AdminPanel: React.FC = () => {
  const [value, setValue] = useState(0);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return !localStorage.getItem("token") ? (
    <NotFound />
  ) : (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Активные заявки" {...a11yProps(0)} />
            <Tab label="Архив заявок" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Appointments isArchive={value} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Appointments isArchive={value} />
        </TabPanel>
      </Box>
      <Link to="/" className="admin-panel--button-out">
        <Button onClick={() => localStorage.clear()}>Выйти</Button>
      </Link>
    </>
  );
};

export default AdminPanel;
