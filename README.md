<h1 align="center"> AI Realtime Meeting Summarization </h1>
<p align="center"> Main repository of AMD Pervasive AI Developer Contest @ Infinite Learning of AI Realtime Meeting Summarization. </p>

<div align="center">
    <!-- Your badges here -->
    <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54">
    <img src="https://img.shields.io/badge/jupyter-%23FA0F00.svg?style=for-the-badge&logo=jupyter&logoColor=white">
    <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white">
    <img src="https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white">
    <img src="https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white">
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
</div>

### Teams

- Maulana Malik [(sasaam)](https://github.com/sasaam)
- Wahyudi 

### Project flow
This is how the project will run, in a simple term :

<img src="static/images/flow.png"> 

### Project Requirements

- These are requirements for the backend project : 
```
openai-whisper
Flask
PyAudio
pydub
transformers
fpdf
```

- Make new virtual environment with the name 'venv' : 

```
python -m venv venv
```

- Activate it with : 

```
./venv/Scripts/activate
```

- Install requirements

```
pip install -r requirements.txt
```

- Run the server :
```
http://localhost:5000/
```


### Model used

- OpenAI Whisper as Automatic Speech Recognition
- facebook/bart-large-cnn open LLM for Summarize the transcription