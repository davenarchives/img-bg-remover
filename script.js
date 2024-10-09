const dropArea            = document.getElementById('drop-area');
const fileInput           = document.getElementById('fileElem');
const imageUrlInput       = document.getElementById('imageUrlInput');
const output              = document.getElementById('output');
const downloadBtn         = document.getElementById('downloadBtn');
const chooseFileBtn       = document.getElementById('choose-file-btn');
const originalImage       = document.getElementById('originalImage');
const processedImage      = document.getElementById('processedImage');
const resetBtn            = document.getElementById('resetBtn');
const comparisonContainer = document.getElementById('comparison');

chooseFileBtn.addEventListener('click', () => {
  fileInput.click();
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
});

dropArea.addEventListener('drop', handleDrop, false);

fileInput.addEventListener('change', (e) => {
  handleFiles(e.target.files);
});

imageUrlInput.addEventListener('paste', (e) => {
  const pastedUrl = e.clipboardData.getData('text');
  if (pastedUrl) {
    fetchImageFromUrl(pastedUrl);
  }
});

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;
  handleFiles(files);
}

function handleFiles(files) {
  [...files].forEach(uploadFile);
}

function uploadFile(file) {
  const formData = new FormData();
  formData.append('image_file', file);

  const originalURL = URL.createObjectURL(file);
  originalImage.src = originalURL;

  showOutput();

  fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': 'UartFkyZmYmZfJvykz6e5AAG',
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${err.message}`);
      });
    }
    return response.blob();
  })
  .then(blob => {
    const imgURL = URL.createObjectURL(blob);
    processedImage.src = imgURL;
    enableDownload(imgURL);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Upload failed: ' + error.message);
  });
}

function fetchImageFromUrl(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch image from URL.');
      }
      return response.blob();
    })
    .then(blob => {
      const originalURL = URL.createObjectURL(blob);
      originalImage.src = originalURL;

      showOutput();

      return uploadFileFromBlob(blob);
    })
    .catch(error => {
      console.error('Error fetching image from URL:', error);
      alert('Failed to fetch image from URL.');
    });
}

function uploadFileFromBlob(blob) {
  const formData = new FormData();
  formData.append('image_file', blob);

  fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': 'UartFkyZmYmZfJvykz6e5AAG',
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${err.message}`);
      });
    }
    return response.blob();
  })
  .then(blob => {
    const imgURL = URL.createObjectURL(blob);
    processedImage.src = imgURL;
    enableDownload(imgURL);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Upload failed: ' + error.message);
  });
}

function showOutput() {
  comparisonContainer.style.display = 'flex';
  output.classList.remove('hidden');
}

function enableDownload(imageUrl) {
  downloadBtn.href = imageUrl;
  downloadBtn.classList.remove('hidden');
  resetBtn.classList.remove('hidden');
}

resetBtn.addEventListener('click', () => {
  originalImage.src = '';
  processedImage.src = '';
  comparisonContainer.style.display = 'none';
  downloadBtn.classList.add('hidden');
  resetBtn.classList.add('hidden');
  output.classList.add('hidden');
});
