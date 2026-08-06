// State Tracker
let currentStep = 1;

// Auto-generate Patient ID on load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('patientId').value = 'PT-' + Math.floor(1000 + Math.random() * 9000);
});

// Navigation Buttons
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', () => {
  if (currentStep < 3) {
    navigateStep(currentStep + 1);
  } else {
    // Collect Data & Save to LocalStorage for result.html
    submitScreening();
  }
});

backBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    navigateStep(currentStep - 1);
  }
});

function navigateStep(targetStep) {
  // Hide current step
  document.getElementById(`step${currentStep}`).classList.remove('active');
  document.getElementById(`indicator${currentStep}`).classList.remove('active');

  // Update index
  currentStep = targetStep;

  // Show target step
  document.getElementById(`step${currentStep}`).classList.add('active');
  document.getElementById(`indicator${currentStep}`).classList.add('active');

  // Update Action Bar UI
  backBtn.style.visibility = currentStep > 1 ? 'visible' : 'hidden';

  if (currentStep === 3) {
    populateReviewData();
    nextBtn.innerText = 'Run AI Risk Assessment';
  } else {
    nextBtn.innerText = 'Next: Clinical Data';
  }
}

function populateReviewData() {
  document.getElementById('revId').innerText = document.getElementById('patientId').value;
  document.getElementById('revAgeSex').innerText = `${document.getElementById('age').value || 'N/A'} yrs / ${document.getElementById('sex').value}`;
  document.getElementById('revBP').innerText = `${document.getElementById('systolicBP').value || '--'}/${document.getElementById('diastolicBP').value || '--'} mmHg`;
  document.getElementById('revMurmur').innerText = document.getElementById('heartMurmur').value;
  document.getElementById('revRheumatic').innerText = document.getElementById('previousRheumaticFever').value;
  document.getElementById('revSoreThroat').innerText = document.getElementById('recurrentSoreThroat').value;
}

function submitScreening() {
  const patientData = {
    patientId: document.getElementById('patientId').value,
    age: document.getElementById('age').value,
    sex: document.getElementById('sex').value,
    residence: document.getElementById('residence').value,
    systolicBP: document.getElementById('systolicBP').value,
    diastolicBP: document.getElementById('diastolicBP').value,
    heartRate: document.getElementById('heartRate').value,
    heartMurmur: document.getElementById('heartMurmur').value,
    previousRheumaticFever: document.getElementById('previousRheumaticFever').value,
    recurrentSoreThroat: document.getElementById('recurrentSoreThroat').value
  };

  // Save in Browser Memory and navigate to Result page
  localStorage.setItem('latestPatient', JSON.stringify(patientData));
  window.location.href = 'result.html';
}