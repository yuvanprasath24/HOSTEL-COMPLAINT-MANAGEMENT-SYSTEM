// 🔼 At the very top of student.js
const params = new URLSearchParams(window.location.search);
const studentId = params.get("studentId");

// This studentId will now be accessible globally in this file


let complaints = [];

function showSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  // Only one visible section — just hide all, then show the one needed
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  section.classList.remove("hidden");

  // Fetch complaints if user clicks "View Complaints"
  if (sectionId === "viewSection") {
    fetchStudentComplaints();
  }
}



//registers complaints
// async function submitComplaint(e) {
//   e.preventDefault();

//   const studentId = document.getElementById('studentid').value;
//   const type = document.getElementById('type').value;
//   const subject = document.getElementById('subject').value;
//   const blockNo = document.getElementById('blockNo').value;
//   const roomNo = document.getElementById('roomNo').value;
//   const description = document.getElementById('description').value;
//   const imageInput = document.getElementById('image');
//   const imageFile = imageInput.files[0];

//   const formData = new FormData();
//   formData.append("complaintType", type);
//   formData.append("studentId", studentId);
//   formData.append("complaintSubject", subject);
//   formData.append("complaintDescription", description);
//   formData.append("complaintStatus", "Pending"); // Default status
//   formData.append("complaintRoomNumber", roomNo);
//   formData.append("complaintBlockNUmber", blockNo);
//   if (imageFile) {
//     formData.append("image", imageFile);
//   }

//   try {
//     const response = await fetch("http://localhost:8080/student/registerComplaint", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Complaint registration failed");
//     }

//     const result = await response.text();
//     alert(result);
//     document.querySelector('.complaint-form').reset();
//   } catch (error) {
//     console.error("Error:", error);
//     alert("Something went wrong while submitting the complaint.");
//   }
// }

//fetches student complaints
async function fetchStudentComplaints() {
  try {
    const response = await fetch(`http://localhost:8080/student/fetchByStudent/${studentId}`, {
      method: 'GET',
      credentials: 'include' // Required due to allowCredentials = true in Spring
    });

    if (!response.ok) {
      throw new Error("Failed to fetch complaints");
    }

    const data = await response.json();

    complaints = data.map(c => ({
      studentId: c.studentIdOnly,
      type: c.complaintType,
      subject: c.complaintSubject,
      blockNo: c.complaintBlockNUmber,
      roomNo: c.complaintRoomNumber,
      description: c.complaintDescription,
      status: c.complaintStatus,
      image: c.complaintImageUrl ? `http://localhost:8080/uploads/${c.complaintImageUrl}` : null
    }));

    updateComplaintsTable(); // Call your table updater function
  } catch (err) {
    console.error("Error fetching complaints:", err);
  }
}


//displays complaints in a table
function updateComplaintsTable() {
  const tbody = document.getElementById('complaintsTableBody');
  tbody.innerHTML = "";

  complaints.forEach((c, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${c.studentId}</td>
      <td>${c.type}</td>
      <td>${c.subject}</td>
      <td>${c.blockNo}</td>
      <td>${c.roomNo}</td>
      <td>
        <p>${c.description}</p>
         ${c.image ? `<img src="${c.image}" alt="Complaint Image" class="desc-img" />` : ""}
      </td>
      <td>${c.status}</td>
    `;

    tbody.appendChild(row);
  });
}


function logout() {
  window.location.href = "/index.html";
}

window.onload = () => {
  showSection("viewSection");
};