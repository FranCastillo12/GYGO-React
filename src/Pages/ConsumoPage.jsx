import { useEffect, useState } from "react";
import { AppBar, Tabs, Tab, Container, Box } from "@mui/material";
import CurrentConsumption from "../components/EmissionsConsumption/CurrentConsumption";
import AnnualConsumption from "../components/EmissionsConsumption/AnnualConsumption";
import ConsumptionHistory from "../components/EmissionsConsumption/ConsumptionHistory";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export function DashboardConsumo() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 10 }}>
          <Tabs
            value={tabIndex}
            onChange={(e, newValue) => setTabIndex(newValue)}
            centered
            textColor="inherit"
            aria-label="Tabs separados"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "green", // ← Color verde
              },
            }}
          >
            <Tab value={0} label="Consumo Actual" />
            <Tab value={1} label="Consumo Anual" />
            <Tab value={2} label="Historial" />
          </Tabs>
        </Box>
      </Container>

      <Container sx={{ mt: 2 }}>
        <TabPanel value={tabIndex} index={0}>
          <CurrentConsumption />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <AnnualConsumption />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <ConsumptionHistory />
        </TabPanel>
      </Container>
    </>
  );
}
