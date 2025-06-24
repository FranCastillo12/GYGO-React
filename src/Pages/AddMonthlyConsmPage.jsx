import { useParams } from "react-router-dom";
import { AddMonthlyConsumForm } from "../components/AddMonthlyConsumForm";

export function AddMonthlyConsumPage() {
  const { consumptionId } = useParams();

  return (
    <AddMonthlyConsumForm consumptionId={parseInt(consumptionId)} />
  );
}
