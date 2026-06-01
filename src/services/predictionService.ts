import { apiRequest } from './apiClient';
import type { PredictionApiResponse, PredictionFormValues, PredictionResult, RiskLevel } from '../types/prediction';

const recommendationByRiskLevel: Record<RiskLevel, string> = {
  'High Risk': 'Lakukan konfirmasi ulang atau tawarkan strategi retensi untuk menjaga booking.',
  'Medium Risk': 'Pantau perubahan booking dan kondisi reservasi sebelum tanggal kedatangan.',
  'Low Risk': 'Lanjutkan proses konfirmasi standar.',
};

export async function requestPrediction(payload: PredictionFormValues): Promise<PredictionResult> {
  const response = await apiRequest<PredictionApiResponse>('/predict', {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  return {
    predictionStatus: response.prediction === 'Cancelled' ? 'Dibatalkan' : 'Tidak Dibatalkan',
    probability: response.probability,
    recommendation: recommendationByRiskLevel[response.risk_level],
    riskLevel: response.risk_level,
  };
}
