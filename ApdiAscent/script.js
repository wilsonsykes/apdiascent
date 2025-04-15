// ============ CONFIG ============
const PDF_LOG_URL = './data/pdf-log.json';
const GENERATE_PDFS_WEBHOOK = 'https://your-n8n-webhook-url/generate-pdfs';
const SEND_ALL_WEBHOOK = 'https://your-n8n-webhook-url/send-all';

// ============ DOM Elements ============
const generateBtn = document.getElementById('generateBtn');
const sendAllBtn = document.getElementById('sendAllBtn');
const promptBox = document.getElementById('prompt');
const pdfTableBody = document.querySelector('#pdfTable tbody');

// ============ Functions ============
function showPrompt(message, color = 'green') {
  promptBox.textContent = message;
  promptBox.style.color = color;
  setTimeout(() => (promptBox.textContent = ''), 4000);
}

async function loadPDFList() {
  try {
    const response = await fetch(PDF_LOG_URL);
    const data = await response.json();

    pdfTableBody.innerHTML = '';
    data.reverse().forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.employee_name}</td>
        <td><a href="${item.file_url}" target="_blank">Download</a></td>
        <td>${item.generated_date}</td>
      `;
      pdfTableBody.appendChild(row);
    });
  } catch (error) {
    showPrompt('Failed to load PDF list.', 'red');
    console.error('Error loading pdf-log.json:', error);
  }
}

async function handleGenerate() {
  try {
    showPrompt('Generating PDFs...');
    const response = await fetch(GENERATE_PDFS_WEBHOOK, { method: 'POST' });
    const result = await response.json();

    if (result.success) {
      showPrompt('PDFs generated successfully!');
      loadPDFList();
    } else {
      showPrompt('PDF generation failed.', 'red');
    }
  } catch (err) {
    showPrompt('Error during generation.', 'red');
    console.error(err);
  }
}

async function handleSendAll() {
  try {
    showPrompt('Sending to Messenger...');
    const response = await fetch(SEND_ALL_WEBHOOK, { method: 'POST' });
    const result = await response.json();

    if (result.success) {
      showPrompt('All PDFs sent successfully!');
    } else {
      showPrompt('Some messages failed to send.', 'red');
    }
  } catch (err) {
    showPrompt('Error sending to Messenger.', 'red');
    console.error(err);
  }
}

// ============ Init ============
generateBtn.addEventListener('click', handleGenerate);
sendAllBtn.addEventListener('click', handleSendAll);
window.addEventListener('DOMContentLoaded', loadPDFList);
