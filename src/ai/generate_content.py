import os
import json
from openai import OpenAI

# Set up OpenAI client (API key and base URL are pre-configured in the environment)
client = OpenAI()

# Define the JSON schema for the AI output
JSON_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string", "description": "The main title of the academic event or announcement."},
        "slogan": {"type": "string", "description": "A short, catchy slogan or subtitle that captures the essence of the event."},
        "location_date": {"type": "string", "description": "The location and date of the event (e.g., الجمهورية التركية | 20 - 24 نوفمبر 2code
import os
import json
from openai import OpenAI

# Set up OpenAI client (API key and base URL are pre-configured in the environment)
client = OpenAI()

# Define the JSON schema for the AI output
JSON_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string", "description": "The main title of the academic event or announcement."},
        "slogan": {"type": "string", "description": "A short, catchy slogan or subtitle that captures the essence of the event."},
        "location_date": {"type": "string", "description": "The location and date of the event (e.g., الجمهورية التركية | 20 - 24 نوفمبر 2025م)."},
        "main_axes": {
            "type": "array",
            "description": "A list of 5 key academic axes or themes of the event.",
            "items": {"type": "string"}
        },
        "benefits": {
            "type": "array",
            "description": "A list of 3 key benefits for participants.",
            "items": {"type": "string"}
        },
        "links": {
            "type": "array",
            "description": "A list of 4 essential links for the event (e.g., Official Page, Registration Link, Abstract Submission, Conference Guide).",
            "items": {
                "type": "object",
                "properties": {
                    "label": {"type": "string", "description": "Label for the link (e.g., الصفحة الرسمية)."},
                    "url": {"type": "string", "description": "Placeholder URL (e.g., https://almahfal.org/register)."}
                },
                "required": ["label", "url"]
            }
        },
        "contact": {"type": "string", "description": "A contact method or call to action (e.g., تواصل عبر واتساب)."}
    },
    "required": ["title", "slogan", "location_date", "main_axes", "benefits", "links", "contact"]
}

def generate_academic_content(user_prompt: str) -> dict:
    """
    Generates structured academic advertisement content in JSON format using the OpenAI API.
    """
    system_prompt = (
        "أنت خبير تسويق أكاديمي ومحلل محتوى. مهمتك هي تحويل طلب المستخدم إلى محتوى إعلاني "
        "مفصل وجذاب للمؤتمرات والفعاليات الأكاديمية. يجب أن يكون الإخراج بتنسيق JSON "
        "صارم يتوافق مع المخطط المحدد. يجب أن يكون المحتوى باللغة العربية الفصحى، "
        "موجز، ومحفز بصريًا، مع التركيز على الهوية البصرية الأكاديمية الراقية."
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"الرجاء توليد محتوى إعلاني أكاديمي بناءً على الوصف التالي: {user_prompt}"}
            ],
            response_format={"type": "json_object", "schema": JSON_SCHEMA}
        )
        
        # The response text is a JSON string
        json_content = response.choices[0].message.content
        return json.loads(json_content)

    except Exception as e:
        print(f"An error occurred during AI content generation: {e}")
        return {"error": str(e)}

if __name__ == '__main__':
    # Example usage (for testing purposes)
    test_prompt = "إعلان عن المؤتمر الدولي العشرين للذكاء الاصطناعي وتطبيقاته في العلوم الإنسانية، سيقام في دبي في شهر مارس 2026."
    content = generate_academic_content(test_prompt)
    print(json.dumps(content, indent=2, ensure_ascii=False))
