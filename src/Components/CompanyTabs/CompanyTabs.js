import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ChooseRole from "../../Pages/CompanyTabsSteps/Tab1";
import AddBankAccount from "../../Pages/CompanyTabsSteps/Tab2";
import AddDematAccount from "../../Pages/CompanyTabsSteps/Tab3";
import NSDLActiveAccount from "../../Pages/CompanyTabsSteps/Tab4";
import PANVerification from "../../Pages/CompanyTabsSteps/Tab5";
import AadharLinked from "../../Pages/CompanyTabsSteps/Tab6";
import "./CompanyTab.css"; 
import { Breadcrumbs } from "@material-ui/core";
import { apiCall } from "../../Utils/Network";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [details, setDetails] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const response = await apiCall("useronboarding/accountonboarding", "GET");
    let responseJSON = await response.json();
    setDetails(responseJSON);
  }

  return (
    <div className="trade-tabs-right company-details-tabs">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="#2E384D"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="About" {...a11yProps(0) }  />
            <Tab label="Ownership" {...a11yProps(1)} />
            <Tab label="Financials" {...a11yProps(2)} />
            <Tab label="Summary & Risks" {...a11yProps(3)} />
            <Tab label="Recent News" {...a11yProps(4)} />
            <Tab label="Additional Information" {...a11yProps(5)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ChooseRole details={details} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <AddBankAccount details={details} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <AddDematAccount details={details} />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <NSDLActiveAccount details={details} />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <PANVerification details={details} />
          </TabPanel>
          <TabPanel value={value} index={5} dir={theme.direction}>
            <AadharLinked details={details} />
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}
