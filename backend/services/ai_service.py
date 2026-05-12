import os

from dotenv import load_dotenv

from openai import OpenAI
load_dotenv()


client = OpenAI(

    api_key=os.getenv("GROQ_API_KEY"),

    base_url="https://api.groq.com/openai/v1"
)


def generate_onboarding_recommendations(role):

  prompt = f"""

        You are an enterprise onboarding assistant.

        Give concise onboarding recommendations
        for this employee role:

        {role}

        Format response in SHORT bullet points.

        Keep response under 8 lines.

        Do NOT use markdown symbols like ** or ##.

        Keep recommendations professional and readable.
        """

  response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )


  return response.choices[0].message.content