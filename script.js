const rooms = {
  101: { status: "Free" },
  102: { status: "Occupied", teacher: "Ms. Anitha", subject: "Mathematics" },
  103: { status: "Free" },
  104: { status: "Occupied", teacher: "Mr. Rahul", subject: "Physics" },
  105: { status: "Free" },
  201: { status: "Occupied", teacher: "Mrs. Devi", subject: "Chemistry" }
};

function searchRoom() {
  const roomNumber = document.getElementById("roomInput").value;
  const result = document.getElementById("result");

  if (!rooms[roomNumber]) {
    result.innerHTML = "Room not found";
    return;
  }

  const room = rooms[roomNumber];

  if (room.status === "Free") {
    result.innerHTML = "🟢 Room " + roomNumber + " is FREE";
    result.style.color = "green";
  } else {
    result.innerHTML =
      "🔴 Room " + roomNumber + " is OCCUPIED<br>" +
      room.subject + " by " + room.teacher;
    result.style.color = "red";
  }
}

function adminLogin() {
  const pass = prompt("Enter admin password");

  if (pass === "admin123") {
    alert("Welcome Admin");
  } else {
    alert("Access denied");
  }
}
