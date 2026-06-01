export type PredictionFormValues = {
  lead_time: number;
  deposit_type: string;
  market_segment: string;
  customer_type: string;
  previous_cancellations: number;
  booking_changes: number;
  total_of_special_requests: number;
  adr: number;
  stays_in_weekend_nights: number;
  stays_in_week_nights: number;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type RiskLevel = 'High Risk' | 'Medium Risk' | 'Low Risk';

export type PredictionResult = {
  predictionStatus: string;
  probability: number;
  recommendation: string;
  riskLevel: RiskLevel;
};

export type PredictionApiResponse = {
  prediction: string;
  probability: number;
  risk_level: RiskLevel;
};
