import io
import base64
from PIL import Image
from django.http import JsonResponse
from .ai_model import pipe, device
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def generate_image(request):
    if request.method == "POST":
        # 1. Parse JSON from request body
        data = request.POST or request.body
        # If using JSON, you'd parse it with `json.loads(request.body)` in DRF or something similar.
        
        prompt = request.POST.get("prompt", "")
        if not prompt:
            return JsonResponse({"error": "No prompt provided."}, status=400)
        
        # 2. Generate the image
        result = pipe(prompt, num_inference_steps=50, guidance_scale=7.5)
        image = result.images[0]

        # 3. Convert image to base64
        buf = io.BytesIO()
        image.save(buf, format="PNG")
        byte_im = buf.getvalue()
        base64_img = base64.b64encode(byte_im).decode("utf-8")

        # 4. Return JSON response with base64 image
        return JsonResponse({"image": base64_img}, status=200)
    else:
        return JsonResponse({"error": "Only POST method allowed"}, status=405)
