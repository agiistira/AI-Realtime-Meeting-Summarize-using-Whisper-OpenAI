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

async function fetchResults() {
    const response = await fetch('/get_results');
    const data = await response.json();
    hideLoading();
    document.getElementById('status').innerText = 'Completed';
    document.getElementById('transcription').innerText = data.transcription;
    document.getElementById('summary').innerText = data.summary;
}

function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('status').innerText = 'Processing...';
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const transcription = document.getElementById('transcription').innerText;
    const summary = document.getElementById('summary').innerText;

    const pageWidth = 180; // PDF page width in mm (A4 size minus margins)
    const margin = 10; // Margin from left and right

    // Helper function to add text with wrapping and page breaks
    function addTextWithWrapping(doc, text, x, y, pageWidth, margin) {
        const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
        for (let i = 0; i < lines.length; i++) {
            if (y + 10 > 297 - margin) { // If text goes beyond page height, add a new page
                doc.addPage();
                y = margin;
            }
            doc.text(lines[i], x, y);
            y += 10; // Line height
        }
    }

    // Add transcription
    let y = margin;
    doc.text("Transcription:", margin, y);
    y += 10;
    addTextWithWrapping(doc, transcription, margin, y, pageWidth, margin);

    // Add a new page for summary if needed
    doc.addPage();
    y = margin;
    doc.text("Summary:", margin, y);
    y += 10;
    addTextWithWrapping(doc, summary, margin, y, pageWidth, margin);

    doc.save('transcription_summary.pdf');
}

function resetTranscriptionAndSummary() {
    document.getElementById('transcription').innerText = '';
    document.getElementById('summary').innerText = '';
    document.getElementById('status').innerText = '';
    document.getElementById('audioFile').value = ''; // Clear the file input

    // Clear the cache and reload the page
    caches.keys().then(function(names) {
        for (let name of names) caches.delete(name);
    });
    window.location.reload(true);
}
