document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const clinicianId = document.getElementById('clinicianId').value;
  const role = document.getElementById('clinicianRole').value;

  // Derive clinician name from ID input
  let name = "Dr. Dagim";
  if (clinicianId.includes('.')) {
    const rawName = clinicianId.split('@')[0].replace('.', ' ');
    name = rawName.replace(/\b\w/g, l => l.toUpperCase());
  }

  // Store Session in LocalStorage
  const session = {
    name: name.includes("Dr") ? name : `Dr. ${name}`,
    role: role,
    isLoggedIn: true
  };

  localStorage.setItem('clinicianSession', JSON.stringify(session));

  // Redirect straight to screening wizard
  window.location.href = 'screening.html';
});