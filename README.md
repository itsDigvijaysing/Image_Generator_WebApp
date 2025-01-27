# Image Generator WebApp

![User Interface](/UI.png)

This repository hosts a **React** frontend and a **Django** backend that uses **Stable Diffusion** to generate images from text prompts. The user inputs a prompt in the React app, which sends a request to the Django backend. The backend runs the Stable Diffusion model and returns the generated image (encoded in base64) to the frontend.

---

## 1. Prerequisites

1. **Python 3.9+** (or compatible version)
2. **Node.js 16+** and **npm** (or Yarn) for React
3. **GPU with CUDA** (recommended) for faster inference with Stable Diffusion  
   - Alternatively, CPU mode will work but might be very slow.
4. **Conda or virtualenv** (optional but recommended for Python dependency management)

---

## 2. Folder Structure

```
Image_Generator_WebApp/
├─ my_django_backend/
│   ├─ my_django_project/
│   │   ├─ settings.py
│   │   ├─ urls.py
│   │   └─ ...
│   ├─ image_api/
│   │   ├─ views.py
│   │   ├─ urls.py
│   │   ├─ ai_model.py
│   │   └─ ...
│   └─ manage.py
├─ my_react_frontend/
│   ├─ src/
│   │   ├─ App.js
│   │   ├─ App.css
│   │   └─ ...
│   ├─ package.json
│   └─ ...
└─ README.md
```

- **my_django_backend**: Houses the Django project and app (`image_api`).  
- **my_react_frontend**: Houses the React code.

---

## 3. Backend Setup (Django)

1. **Create and activate a Python virtual environment** (optional but recommended):
   ```bash
   conda create -n sd_env python=3.9
   conda activate sd_env
   ```
   or
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

2. **Install Python dependencies**:
   ```bash
   cd my_django_backend
   pip install -r requirements.txt
   ```
   If you don’t have a `requirements.txt`, install dependencies manually:
   ```bash
   pip install django torch diffusers transformers xformers
   ```
   Make sure you have CUDA installed if you want GPU acceleration.

3. **Run migrations** (needed for Django’s admin, sessions, etc.):
   ```bash
   python manage.py migrate
   ```

4. **Start the Django server**:
   ```bash
   python manage.py runserver
   ```
   By default, it runs on [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

## 4. Frontend Setup (React)

1. **Install dependencies**:
   ```bash
   cd ../my_react_frontend
   npm install
   ```
   If you haven’t created this app yet, you can do:
   ```bash
   npx create-react-app my_react_frontend
   ```

2. **Start the React development server**:
   ```bash
   npm start
   ```
   By default, it runs on [http://localhost:3000/](http://localhost:3000/).

## 5. Usage

1. **Start the Django backend**:
   ```bash
   cd my_django_backend
   python manage.py runserver
   ```
2. **Start the React frontend**:
   ```bash
   cd ../my_react_frontend
   npm start
   ```
3. Open `http://localhost:3000/` in your browser.  
4. Enter a prompt (e.g., *“A sunset over a mountain range in watercolor style”*) and click **Generate**.  
5. The generated image appears along with a download link.

---

## 6. Troubleshooting

1. **CUDA Out of Memory**:  
   - Use smaller batch size (already 1 by default).  
   - Reduce resolution or `num_inference_steps`.  
   - Use half precision (`torch_dtype=torch.float16`) and xFormers.  
2. **CSRF Errors**:  
   - Use `@csrf_exempt` for quick prototyping, or set up **CORS** + CSRF tokens properly.  
3. **404 on `/api/generate-image/`**:  
   - Check `urls.py` in `my_django_project` and `image_api`.

---

## 7. Future Improvements

- **Authentication**: Integrate token-based auth if needed.  
- **Image Storage**: Save images to disk or cloud (S3, etc.) instead of returning base64.  
- **Advanced Prompt Options**: Let users tweak resolution, `num_inference_steps`, or guidance scale.  
- **Async/Queue**: For heavier loads, use Celery or RQ to run long inference tasks asynchronously.  
- **Styling & UI**: Further enhance the frontend with component libraries like Material UI or Bootstrap.

---

## 8. License

Choose a license for your project—e.g., **MIT** or **Apache-2.0**—and mention it here.

**Happy Generating!**