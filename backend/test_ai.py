from services.ai_service import (
    generate_onboarding_recommendations
)


role = "Software Engineer"


response = generate_onboarding_recommendations(role)

print(response)