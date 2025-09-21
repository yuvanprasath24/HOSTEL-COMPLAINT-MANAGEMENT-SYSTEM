document.addEventListener('DOMContentLoaded', () => {
  const selectionScreen = document.getElementById('selectionScreen');
  const loginForm = document.getElementById('loginForm');
  const studentLoginBtn = document.getElementById('studentLoginBtn');
  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const parentLoginBtn = document.getElementById('parentLoginBtn');
  const submitLogin = document.getElementById('submitLogin');
  const backBtn = document.getElementById('backBtn');
  const errorMessage = document.getElementById('errorMessage');
  const form = document.getElementById('actualLoginForm');
  const loginHeading = document.getElementById('loginHeading');
  const userIdField = document.getElementById('userId');

  let currentUserType = null;

  // ✅ Replace with your valid emails and password
  const validStudentEmails = ['student1@example.com', 'student2@example.com'];
  const validAdminEmails = ['admin1@example.com', 'admin2@example.com'];
  const testPassword = 'test123';

  studentLoginBtn.addEventListener('click', () => {
    currentUserType = 'student';
    loginHeading.textContent = 'Student Login';
    userIdField.placeholder = 'Student ID';
    userIdField.classList.remove('hidden');
    showLogin('bg-blue-600', 'hover:bg-blue-700');
  });

  adminLoginBtn.addEventListener('click', () => {
    currentUserType = 'admin';
    loginHeading.textContent = 'Admin Login';
    userIdField.placeholder = 'Admin ID';
    userIdField.classList.remove('hidden');
    showLogin('bg-green-600', 'hover:bg-green-700');
  });

  parentLoginBtn.addEventListener('click', () => {
    currentUserType = 'parent';
    loginHeading.textContent = 'Parent Login';
    userIdField.placeholder = 'Student ID';
    userIdField.classList.remove('hidden');
    showLogin('bg-purple-600', 'hover:bg-purple-700');
  });

  backBtn.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    selectionScreen.classList.remove('hidden');
    errorMessage.classList.remove('show');
    form.reset();
  });

  // form.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   const email = document.getElementById('email').value.trim();
  //   const password = document.getElementById('password').value;
  //   const userId = userIdField.value.trim();

  //   if (!email || !password || !userId) {
  //     showError('All fields are required');
  //     return;
  //   }
  //   const studentId = "23bit123"; 
  //   if (currentUserType === 'student' && validStudentEmails.includes(email) && password === testPassword) {
  //     window.location.href = `/studentDashBoard/student.html?studentId=${studentId}`;
  //   } else if (currentUserType === 'admin' && validAdminEmails.includes(email) && password === testPassword) {
  //     window.location.href = "/adminDashBoard/admin.html";
  //   } else if (currentUserType === 'parent' && validStudentEmails.includes(email) && password === testPassword) {
  //     window.location.href = `/parentsDashBoard/parents.html?studentId=${studentId}`;
  //   } else {
  //     showError('Invalid credentials');
  //   }
  // });

  //login form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const userId = userIdField.value.trim();

  if (!email || !password || !userId) {
    showError('All fields are required');
    return;
  }

  // const payload = {
  //   id: userId,
  //   email: email,
  //   password: password
  // };

    let payload = {};
  if (currentUserType === "student" || currentUserType === "parent") {
    payload = {
      studentId: userId,
      studentEmail: email,
      studentPassword: password
    };
  } else if (currentUserType === "admin") {
    payload = {
      id: userId,
      email: email,
      password: password
    };
  }


  let endpoint = "";
  if (currentUserType === "student" || currentUserType === "parent") {
    endpoint = "http://localhost:8080/student/studentVerify";
  } else if (currentUserType === "admin") {
    endpoint = "http://localhost:8080/admin/adminLoginVerify";
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.text(); // backend returns int (0 or 1)

    if (result === "1") {
      // ✅ Redirect based on role
      if (currentUserType === 'student') {
        window.location.href = `/studentDashBoard/student.html?studentId=${userId}`;
      } else if (currentUserType === 'admin') {
        window.location.href = "/adminDashBoard/admin.html";
      } else if (currentUserType === 'parent') {
        window.location.href = `/parentsDashBoard/parents.html?studentId=${userId}`;
      }
    } else {
      showError("Invalid credentials");
    }

  } catch (err) {
    console.error("Login error:", err);
    showError("Login failed. Please try again.");
  }
});


  function showLogin(bgClass, hoverClass) {
    selectionScreen.classList.add('hidden');
    loginForm.classList.remove('hidden');
    submitLogin.className = `w-full text-white px-4 py-2 rounded-xl shadow ${bgClass} ${hoverClass}`;
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => errorMessage.classList.remove('show'), 3000);
  }
});
