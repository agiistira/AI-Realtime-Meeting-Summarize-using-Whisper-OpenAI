async function startRecording() {
    const response = await fetch('/start_recording', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    document.getElementById('status').innerText = data.status;
}

async function stopRecording() {
    const response = await fetch('/stop_recording', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    document.getElementById('status').innerText = data.status;
    showLoading();

    setTimeout(fetchResults, 5000);
}

async function uploadAudio() {
    showLoading();
    const fileInput = document.getElementById('audioFile');
    const file = fileInput.files[0];

    if (!file) {
        document.getElementById('status').innerText = 'Please select an audio file first.';
        hideLoading();
        return;
    }

    document.getElementById('status').innerText = 'Uploading...';

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload_audio', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        document.getElementById('status').innerText = data.message;

        if (data.status === 'success') {
            document.getElementById('transcription').innerText = data.transcription;
            document.getElementById('summary').innerText = data.summary;
            document.getElementById('status').innerText = 'Processing completed successfully!';
        } else {
            document.getElementById('status').innerText = 'Error: ' + data.message;
        }

    } catch (error) {
        document.getElementById('status').innerText = 'Error during upload: ' + error.message;
    } finally {
        hideLoading();
    }
}

function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('status').innerText = 'Processing...';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function downloadPDF() {
    const transcription = document.getElementById('transcription').innerText;
    const summary = document.getElementById('summary').innerText;

    const formData = new FormData();
    formData.append('transcription', transcription);
    formData.append('summary', summary);

    fetch('/download_pdf', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'transcription_summary.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => alert('Error downloading PDF: ' + error.message));
}

function resetTranscriptionAndSummary() {
    document.getElementById('transcription').innerText = '';
    document.getElementById('summary').innerText = '';
    document.getElementById('status').innerText = 'Idle';
    document.getElementById('audioFile').value = ''; // Clear the file input
}