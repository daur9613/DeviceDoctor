import * as React from "react";
import PropTypes from "prop-types";
import Blank from "./adminpages/Blank";
import Category from "./adminpages/Category/index";
import User from "./adminpages/User/index";
import Application from "./adminpages/Application/index";
import Helper from "./adminpages/Helper/index";
import Rating from "./adminpages/Rating/index";
import Service from "./adminpages/Service/index";
import { useMediaQuery, Tabs, Tab, Box } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{ width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function AdminLayout() {
  const [value, setValue] = React.useState(0);
  const isMobile = !useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: 700,
      }}
    >
      <Tabs
        orientation={isMobile ? "horizontal" : "vertical"}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        scrollButtons="auto"
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Статистика" {...a11yProps(0)} />
        <Tab label="Пользователи" {...a11yProps(1)} />
        <Tab label="Категории" {...a11yProps(2)} />
        <Tab label="Услуги" {...a11yProps(3)} />
        <Tab label="Заявки" {...a11yProps(4)} />
        <Tab label="Поддержка" {...a11yProps(5)} />
        <Tab label="Отзывы" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Blank
          tabchange={(e) => {
            TabChange(4);
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <User />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Category />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Service />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Application />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Helper />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Rating />
      </TabPanel>
    </Box>
  );
}
