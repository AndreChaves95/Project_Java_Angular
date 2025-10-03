// Im using interface here because I dont need any methods, just a data structure
// and interfaces are more lightweight than classes
// Also, I just need to retrieve data from the backend, not to create new instances of Profit
export interface ProfitDto {
  shipmentId: number;
  shipmentNumber: string;
  totalIncome: number;
  totalCost: number;
  profitValue: number;
}
