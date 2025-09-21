// Sample complaints data with Student ID
let complaints = [
  // {
  //   id: 1,
  //   studentId: "S101",
  //   type: "Wi-Fi / Internet Connectivity Problems",
  //   subject: "Slow Internet",
  //   block: "B-Block",
  //   room: "204",
  //   description: "Internet disconnects frequently.",
  //   image: "https://via.placeholder.com/250x150",
  //   status: "Pending"
  // },
  // {
  //   id: 2,
  //   studentId: "S102",
  //   type: "Hostel Maintenance",
  //   subject: "Broken Fan",
  //   block: "A-Block",
  //   room: "101",
  //   description: "Ceiling fan not working.",
  //   image: "https://via.placeholder.com/250x150",
  //   status: "On Process"
  // },
  // {
  //   id: 3,
  //   studentId: "S103",
  //   type: "Library",
  //   subject: "Book Unavailable",
  //   block: "C-Block",
  //   room: "305",
  //   description: "Requested book not available.",
  //   image: "https://via.placeholder.com/250x150",
  //   status: "Completed"
  // }
];

// Render complaints to respective sections
async function fetchStudentComplaints() {
  try {
    const response = await fetch(`http://localhost:8080/admin/fetchByStatus/Pending`, {
      method: 'GET',
      credentials: 'include' // Required due to allowCredentials = true in Spring
    });

    if (!response.ok) {
      throw new Error("Failed to fetch complaints");
    }

    const data = await response.json();

  complaints = data.map(c => ({
    complaintId: c.complaintId,
    studentId: c.studentIdOnly,
    type: c.complaintType,
    subject: c.complaintSubject || c.subject || "No subject",
    block: c.blockNo || c.complaintBlockNUmber || c.block || "N/A",
    room: c.complaintRoomNumber,
    description: c.complaintDescription,
    status: c.complaintStatus,
    image: c.complaintImageUrl ? `http://localhost:8080/uploads/${c.complaintImageUrl}` : null
  }));

    console.log("Fetched complaints:", complaints);
    renderComplaints(); // Call your table updater function
  } catch (err) {
    console.error("Error fetching complaints:", err);
  }
}

async function updateComplaintStatus(complaintId, newStatus) {
  try {
    const response = await fetch(`http://localhost:8080/admin/updateStatus/${complaintId}/${newStatus}`, {
      method: 'PUT',
      credentials: 'include'
    });

    if (!response.ok) throw new Error("Failed to update status");

    console.log(`Status updated to ${newStatus}`);
  } catch (err) {
    console.error("Error:", err);
  }
}


function renderComplaints() {
  const pending = document.getElementById("pending-complaints");
  const process = document.getElementById("process-complaints");
  const completed = document.getElementById("completed-complaints");

  // Clear old data
  pending.innerHTML = "";
  process.innerHTML = "";
  completed.innerHTML = "";

  complaints.forEach((c, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${index + 1}</td> <!-- ✅ This is the fix -->
    <td>${c.studentId}</td>
    <td>${c.type}</td>
    <td>${c.subject}</td>
    <td>${c.block || c.blockNo}</td>
    <td>${c.room || c.roomNo}</td>
    <td>
      ${c.description}
      ${c.image ? `<br><img src="${c.image}" alt="Complaint Image" width="100">` : ""}
    </td>
    <td>${c.status}</td>
    ${getActionButtons(index, c.status)}
  `;


    if (c.status === "Pending") {
      pending.appendChild(row);
    } else if (c.status === "On Process") {
      process.appendChild(row);
    } else if (c.status === "Completed") {
      completed.appendChild(row);
    }
  });
}


// Return buttons based on status
function getActionButtons(index, status) {
  if (status === "Pending") {
    return `
      <td>
        <button onclick="markAsProcessing(${index})">Mark as Processing</button>
        <button onclick="markAsCompleted(${index})">Mark as Completed</button>
      </td>
    `;
  } else if (status === "On Process") {
    return `
      <td>
        <button onclick="markAsCompleted(${index})">Mark as Completed</button>
      </td>
    `;
  } else {
    return `<td></td>`; // No buttons for Completed
  }
}

// Status change handlers
async function markAsProcessing(index) {
  const complaint = complaints[index];
  complaint.status = "On Process";
  await updateComplaintStatus(complaint.complaintId, "On Process");
  renderComplaints();
  showSection("#onProcess");
}

async function markAsCompleted(index) {
  const complaint = complaints[index];
  complaint.status = "Completed";
  await updateComplaintStatus(complaint.complaintId, "Completed");
  renderComplaints();
  showSection("#completed");
}
// Show/hide sections
function showSection(id) {
  document.querySelectorAll("section").forEach(section => {
    section.style.display = "none";
  });
  const target = document.querySelector(id);
  if (target) target.style.display = "block";
}

// Sidebar nav link behavior
document.querySelectorAll(".sidebar a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    showSection(targetId);
  });
});

// Password toggle
document.querySelectorAll(".show-password").forEach(button => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling;
    const icon = button.querySelector("i");
    input.type = input.type === "password" ? "text" : "password";
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
});

// Register form
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = document.getElementById("studentId").value.trim();
  const email = document.getElementById("studentEmail").value.trim();
  const password = document.getElementById("studentPassword").value.trim();

  const student = {
    id: id,
    studentEmail: email,
    studentPassword: password
  };

  try {
    const response = await fetch("http://localhost:8080/admin/studentRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.text(); // or use .json() if your backend returns JSON
    alert(`✅ Student ${id} registered successfully!`);
    this.reset();

  } catch (error) {
    console.error("❌ Error registering student:", error);
    alert("Failed to register student. Please try again.");
  }
});


// Logout
document.getElementById("logoutLink").addEventListener("click", e => {
  e.preventDefault();
  window.location.href = "/index.html";
});

// On page load
window.addEventListener("DOMContentLoaded", () => {
  fetchStudentComplaints();  // ✅ fetches and renders real complaints
  showSection("#complain");
});


