function checkRoom() {
  const room = parseInt(document.getElementById("roomInput").value);
  const result = document.getElementById("result");

  if (!room) {
    result.innerHTML = "⚠ Please enter a room number";
    return;
  }

  if (room < 100 || room > 200) {
    result.innerHTML = "⚠ Enter room between 100 and 200";
    return;
  }

  const teachers = ["Mr. Rahul","Ms. Anitha","Dr. Meena","Mrs. Devi","Mr. Joseph","Ms. Priya"];
  const subjects = ["Physics","Math","Biology","Chemistry","English","Computer"];
  const times = ["9:00 - 10:00","10:00 - 11:00","11:00 - 12:00","1:00 - 2:00","2:00 - 3:00"];

  if (room % 2 === 0) {
    result.innerHTML = `<span class="free">🟢 Room ${room} is FREE</span>`;
  } else {
    result.innerHTML = `
      <span class="occupied">🔴 Room ${room} is OCCUPIED</span>
      <div class="details">
        Subject: ${subjects[room % subjects.length]} <br>
        Teacher: ${teachers[room % teachers.length]} <br>
        Time: ${times[room % times.length]}
      </div>
    `;
  }
}

/* ===== CLASSROOM DIRECTORY ===== */

document.addEventListener("DOMContentLoaded", () => {

  const teachers = ["Mr. Rahul","Ms. Anitha","Dr. Meena","Mrs. Devi","Mr. Joseph","Ms. Priya"];
  const subjects = ["Physics","Math","Biology","Chemistry","English","Computer"];

  const directory = document.getElementById("directory");

  for (let floor = 1; floor <= 3; floor++) {

    const title = document.createElement("div");
    title.className = "floor-title";
    title.innerText = "Floor " + floor;
    directory.appendChild(title);

    for (let room = 100 + (floor-1)*10; room < 110 + (floor-1)*10; room++) {

      const card = document.createElement("div");
      card.className = "room-card";

      card.innerHTML = `
        <div>
          <strong>Room ${room}</strong><br>
          ${subjects[room % subjects.length]}
        </div>
        <div>${teachers[room % teachers.length]}</div>
      `;

      directory.appendChild(card);
    }
  }

});
const teachers = ["Mr. Rahul","Ms. Anitha","Dr. Meena","Mrs. Devi","Mr. Joseph","Ms. Priya"];
const subjects = ["Physics","Math","Biology","Chemistry","English","Computer"];

function findRoom() {
  const room = parseInt(document.getElementById("roomInput").value);
  const result = document.getElementById("result");

  if (!room || room < 100 || room > 200) {
    result.innerHTML = "⚠ Enter room between 100 and 200";
    return;
  }

  const floor = Math.floor((room - 100) / 10) + 1;

  if (room % 2 === 0) {
    result.innerHTML = `
      <span class="free">🟢 Room ${room} is FREE</span>
      <div class="details">Located on Floor ${floor}</div>
    `;
  } else {
    result.innerHTML = `
      <span class="occupied">🔴 Room ${room} is OCCUPIED</span>
      <div class="details">
        Floor: ${floor}<br>
        Subject: ${subjects[room % subjects.length]}<br>
        Teacher: ${teachers[room % teachers.length]}
      </div>
    `;
  }
}

/* GENERATE DIRECTORY */

document.addEventListener("DOMContentLoaded", () => {

  const directory = document.getElementById("directory");

  if (!directory) return;

  for (let floor = 1; floor <= 5; floor++) {

    const title = document.createElement("div");
    title.className = "floor-title";
    title.innerText = "Floor " + floor;
    directory.appendChild(title);

    for (let room = 100 + (floor-1)*10; room < 110 + (floor-1)*10; room++) {

      const card = document.createElement("div");
      card.className = "room-card";

      card.innerHTML = `
        <div>
          <strong>Room ${room}</strong><br>
          ${subjects[room % subjects.length]}
        </div>
        <div>${teachers[room % teachers.length]}</div>
      `;

      directory.appendChild(card);
    }
  }

});
