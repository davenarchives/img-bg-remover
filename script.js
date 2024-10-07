const dropArea            = document.getElementById('drop-area');
const fileInput           = document.getElementById('fileElem');
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

  comparisonContainer.style.display = 'flex'; 

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
  .catch((error) => {
    console.error('Error:', error); 
    alert('Upload failed: ' + error.message);
  });
}

function enableDownload(imageUrl) {
  downloadBtn.href = imageUrl; 
  downloadBtn.classList.remove('hidden'); 
  resetBtn.classList.remove('hidden');
}

resetBtn.addEventListener('click', () => {
  originalImage.src = ''; 
  processedImage.src = ''; // Clear processed image
  comparisonContainer.style.display = 'none'; // Hide comparison section
  downloadBtn.classList.add('hidden'); // Hide download button
  resetBtn.classList.add('hidden'); // Hide reset button
});
