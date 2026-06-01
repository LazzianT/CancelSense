def get_risk_level(probability: float) -> str:
    if probability >= 0.7:
        return "High Risk"

    if probability >= 0.4:
        return "Medium Risk"

    return "Low Risk"
