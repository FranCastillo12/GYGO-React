import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import { getAllPlans, subscribeToPlan } from "../../API/Subscription";
import { useAuth } from "../../context/AuthContext";

export default function SubscribePrompt() {
  const [plans, setPlans] = useState([]);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await getAllPlans();
        setPlans(fetchedPlans);
        console.log(fetchedPlans);
      } catch (error) {
        console.error("Error al cargar los planes:", error);
      }
    };

    fetchPlans();
  }, []);

const handleSubscribe = async (planId) => {
  try {
    const result = await subscribeToPlan(planId);
    if (result.approvalUrl) {
      window.location.href = result.approvalUrl; 
    } else {
      alert("Suscripción creada pero no se pudo obtener el link de aprobación.");
    }
  } catch (err) {
    alert("Hubo un error al suscribirse: " + err.message);
  }
};
  

 return (
    <DashboardLayout>
      <DashboardNavbar />
      <Typography variant="h4" gutterBottom>
        Elige un plan para suscribirte
      </Typography>

      <Grid container spacing={3} mt={1}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {plan.name}
                </Typography>
                <Typography color="text.secondary">
                  {plan.description || "Sin descripción"}
                </Typography>
                {/* Si quieres, aquí podrías mostrar otro dato relevante */}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary" sx={{color: "#ffffff"}}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  Suscribirse
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
}

