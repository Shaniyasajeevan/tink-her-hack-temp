// ========== DATA ==========
let schedules = JSON.parse(localStorage.getItem('roomSchedules')) || [
    { room: 'Lab A', start: '09:00', end: '10:30', day: 'Monday', subject: 'Python Programming', teacher: 'Dr. Smith' },
    { room: 'Lab A', start: '14:00', end: '15:30', day: 'Wednesday', subject: 'Data Structures', teacher: 'Prof. Johnson' },
    { room: 'Room 201', start: '10:00', end: '11:00', day: 'Tuesday', subject: 'Web Development', teacher: 'Ms. Williams' },
    { room: 'Room 201', start: '13:00', end: '14:00', day: 'Thursday', subject: 'Database Design', teacher: 'Mr. Brown' },
    { room: 'Lab B', start: '11:00', end: '12:30', day: 'Monday', subject: 'Machine Learning', teacher: 'Dr. Davis' },
    { room: 'Lab B', start: '15:00', end: '16:30', day: 'Friday', subject: 'AI Projects', teacher: 'Prof. Miller' },
    { room: 'Room 301', start: '09:30', end: '11:00', day: 'Wednesday', subject: 'Web Design', teacher: 'Ms. Taylor' },
    { room: 'Auditorium', start: '14:00', end: '17:00', day: 'Friday', subject: 'Guest Lecture: Cloud Computing', teacher: 'Dr. Anderson' }
];

// ========== UI ELEMENTS ==========
const btnStudent = document.getElementById('btnStudent');
const btnAdmin = document.getElementById('btnAdmin');
const studentSection = document.getElementById('studentSection');
const adminSection = document.getElementById('adminSection');
const currentTimeEl = document.getElementById('currentTime');
const currentDayEl = document.getElementById('currentDay');

const roomInput = document.getElementById('roomInput');
const subjectInput = document.getElementById('subjectInput');
const teacherInput = document.getElementById('teacherInput');
const startInput = document.getElementById('startInput');
const endInput = document.getElementById('endInput');
const dayInput = document.getElementById('dayInput');
const submitBtn = document.getElementById('submitBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const searchBox = document.getElementById('searchBox');

const studentRoomsDisplay = document.getElementById('studentRoomsDisplay');
const adminRoomsDisplay = document.getElementById('adminRoomsDisplay');
const schedulesList = document.getElementById('schedulesList');
const studentSchedulesList = document.getElementById('studentSchedulesList');

const noRoomsMsg = document.getElementById('noRoomsMsg');
const noSchedulesMsg = document.getElementById('noSchedulesMsg');
const noAdminRoomsMsg = document.getElementById('noAdminRoomsMsg');
const noStudentSchedulesMsg = document.getElementById('noStudentSchedulesMsg');

// ========== UTILITY FUNCTIONS ==========
function getTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function getDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
}

function timeToMins(time) {
    const [h, m] = time.split(':');
    return parseInt(h) * 60 + parseInt(m);
}

function isOccupied(room, time, day) {
    return schedules.some(s => 
        s.room === room && 
        s.day === day && 
        timeToMins(time) >= timeToMins(s.start) && 
        timeToMins(time) < timeToMins(s.end)
    );
}

function getRooms() {
    const rooms = new Set(schedules.map(s => s.room));
    return Array.from(rooms).sort();
}

function getSchedule(room, day) {
    return schedules.find(s => s.room === room && s.day === day);
}

// ========== UPDATE TIME & DAY ==========
function updateTime() {
    currentTimeEl.textContent = getTime();
    currentDayEl.textContent = getDay();
}

setInterval(updateTime, 60000);
updateTime();

// ========== VIEW SWITCHING ==========
function showStudent() {
    btnStudent.classList.add('active');
    btnAdmin.classList.remove('active');
    studentSection.classList.add('active');
    adminSection.classList.remove('active');
}

function showAdmin() {
    btnAdmin.classList.add('active');
    btnStudent.classList.remove('active');
    adminSection.classList.add('active');
    studentSection.classList.remove('active');
}

btnStudent.addEventListener('click', showStudent);
btnAdmin.addEventListener('click', showAdmin);

// ========== DISPLAY STUDENT ROOMS ==========
function showStudentRooms() {
    const rooms = getRooms();
    const curTime = getTime();
    const curDay = getDay();

    studentRoomsDisplay.innerHTML = '';

    if (rooms.length === 0) {
        noRoomsMsg.style.display = 'block';
        return;
    }

    noRoomsMsg.style.display = 'none';

    // Separate occupied and free rooms
    const occupied = [];
    const free = [];

    rooms.forEach(room => {
        const isOcc = isOccupied(room, curTime, curDay);
        const sched = getSchedule(room, curDay);
        const timeStr = sched ? `${sched.start} - ${sched.end}` : 'No class today';
        const roomData = { room, occupied: isOcc, timeStr, sched };
        
        if (isOcc) {
            occupied.push(roomData);
        } else {
            free.push(roomData);
        }
    });

    // Display occupied first
    if (occupied.length > 0) {
        const occupiedHeader = document.createElement('div');
        occupiedHeader.className = 'category-header occupied-header';
        occupiedHeader.innerHTML = '🔴 OCCUPIED CLASSES';
        studentRoomsDisplay.appendChild(occupiedHeader);

        occupied.forEach(item => {
            const card = document.createElement('div');
            card.className = 'room-card occupied';
            card.innerHTML = `
                <div class="room-title">${item.room}</div>
                <div class="status">🔴 IN USE</div>
                ${item.sched ? `
                    <div class="subject-display"><strong>📚 ${item.sched.subject}</strong></div>
                    <div class="teacher-display">👨‍🏫 ${item.sched.teacher}</div>
                ` : ''}
                <div class="time">${item.timeStr}</div>
            `;
            studentRoomsDisplay.appendChild(card);
        });
    }

    // Display free classes
    if (free.length > 0) {
        const freeHeader = document.createElement('div');
        freeHeader.className = 'category-header free-header';
        freeHeader.innerHTML = '🟢 AVAILABLE ROOMS';
        studentRoomsDisplay.appendChild(freeHeader);

        free.forEach(item => {
            const card = document.createElement('div');
            card.className = 'room-card free';
            card.innerHTML = `
                <div class="room-title">${item.room}</div>
                <div class="status">🟢 FREE</div>
                <div class="time">${item.timeStr}</div>
            `;
            studentRoomsDisplay.appendChild(card);
        });
    }
}

// ========== DISPLAY ADMIN ROOMS ==========
function showAdminRooms() {
    const rooms = getRooms();
    const curTime = getTime();
    const curDay = getDay();

    adminRoomsDisplay.innerHTML = '';

    if (rooms.length === 0) {
        noAdminRoomsMsg.style.display = 'block';
        return;
    }

    noAdminRoomsMsg.style.display = 'none';

    rooms.forEach(room => {
        const occupied = isOccupied(room, curTime, curDay);
        const sched = getSchedule(room, curDay);
        const timeStr = sched ? `${sched.start} - ${sched.end}` : 'No class today';
        const subjectStr = occupied && sched ? sched.subject : '';

        const card = document.createElement('div');
        card.className = `room-card ${occupied ? 'occupied' : 'free'}`;
        card.innerHTML = `
            <div class="room-title">${room}</div>
            <div class="status">${occupied ? '🔴 OCCUPIED' : '🟢 FREE'}</div>
            ${occupied && sched ? `<div class="subject"><strong>${sched.subject}</strong></div>` : ''}
            <div class="time">${timeStr}</div>
        `;
        adminRoomsDisplay.appendChild(card);
    });
}

// ========== DISPLAY SCHEDULES LIST ==========
function showSchedules() {
    schedulesList.innerHTML = '';

    if (schedules.length === 0) {
        noSchedulesMsg.style.display = 'block';
        return;
    }

    noSchedulesMsg.style.display = 'none';

    schedules.forEach((sched, idx) => {
        const item = document.createElement('div');
        item.className = 'schedule-item';
        item.innerHTML = `
            <div class="schedule-info">
                <span class="room-name">${sched.room}</span>
                <span class="subject-tag">${sched.subject}</span>
                <span class="teacher-tag">👨‍🏫 ${sched.teacher}</span>
                <span class="time-info">${sched.start} - ${sched.end}</span>
                <span class="day-info">${sched.day}</span>
            </div>
            <button class="btn-delete" onclick="deleteSchedule(${idx})">Remove</button>
        `;
        schedulesList.appendChild(item);
    });
}

// ========== DISPLAY SCHEDULES FOR STUDENT VIEW ==========
function showStudentSchedules() {
    studentSchedulesList.innerHTML = '';

    if (schedules.length === 0) {
        noStudentSchedulesMsg.style.display = 'block';
        return;
    }

    noStudentSchedulesMsg.style.display = 'none';

    schedules.forEach((sched) => {
        const item = document.createElement('div');
        item.className = 'schedule-item';
        item.innerHTML = `
            <div class="schedule-info">
                <span class="room-name">${sched.room}</span>
                <span class="subject-tag">${sched.subject}</span>
                <span class="teacher-tag">👨‍🏫 ${sched.teacher}</span>
                <span class="time-info">${sched.start} - ${sched.end}</span>
                <span class="day-info">${sched.day}</span>
            </div>
        `;
        studentSchedulesList.appendChild(item);
    });
}

// ========== DELETE FUNCTION ==========
function deleteSchedule(idx) {
    schedules.splice(idx, 1);
    saveData();
    refresh();
}

// ========== ADD SCHEDULE ==========
submitBtn.addEventListener('click', () => {
    const room = roomInput.value.trim();
    const subject = subjectInput.value.trim();
    const teacher = teacherInput.value.trim();
    const start = startInput.value;
    const end = endInput.value;
    const day = dayInput.value;

    if (!room || !subject || !teacher || !start || !end) {
        alert('⚠️ Please fill all fields');
        return;
    }

    if (timeToMins(start) >= timeToMins(end)) {
        alert('⚠️ Start time must be before end time');
        return;
    }

    schedules.push({ room, subject, teacher, start, end, day });
    saveData();
    refresh();

    roomInput.value = '';
    subjectInput.value = '';
    teacherInput.value = '';
    startInput.value = '';
    endInput.value = '';
    dayInput.value = 'Monday';
});

// ========== CLEAR ALL ==========
deleteAllBtn.addEventListener('click', () => {
    if (confirm('🗑️ Delete ALL data? This cannot be undone!')) {
        schedules = [];
        saveData();
        refresh();
    }
});

// ========== SEARCH ==========
searchBox.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const rooms = getRooms();
    const curTime = getTime();
    const curDay = getDay();

    if (!term) {
        // Show all if search is empty
        showStudentRooms();
        return;
    }

    // Filter rooms by search term
    const filteredRooms = rooms.filter(room => room.toLowerCase().includes(term));

    studentRoomsDisplay.innerHTML = '';

    // Separate filtered occupied and free rooms
    const occupied = [];
    const free = [];

    filteredRooms.forEach(room => {
        const isOcc = isOccupied(room, curTime, curDay);
        const sched = getSchedule(room, curDay);
        const timeStr = sched ? `${sched.start} - ${sched.end}` : 'No class today';
        const roomData = { room, occupied: isOcc, timeStr, sched };
        
        if (isOcc) {
            occupied.push(roomData);
        } else {
            free.push(roomData);
        }
    });

    // Display filtered occupied first
    if (occupied.length > 0) {
        const occupiedHeader = document.createElement('div');
        occupiedHeader.className = 'category-header occupied-header';
        occupiedHeader.innerHTML = '🔴 OCCUPIED CLASSES';
        studentRoomsDisplay.appendChild(occupiedHeader);

        occupied.forEach(item => {
            const card = document.createElement('div');
            card.className = 'room-card occupied';
            card.innerHTML = `
                <div class="room-title">${item.room}</div>
                <div class="status">🔴 IN USE</div>
                ${item.sched ? `
                    <div class="subject-display"><strong>📚 ${item.sched.subject}</strong></div>
                    <div class="teacher-display">👨‍🏫 ${item.sched.teacher}</div>
                ` : ''}
                <div class="time">${item.timeStr}</div>
            `;
            studentRoomsDisplay.appendChild(card);
        });
    }

    // Display filtered free classes
    if (free.length > 0) {
        const freeHeader = document.createElement('div');
        freeHeader.className = 'category-header free-header';
        freeHeader.innerHTML = '🟢 AVAILABLE ROOMS';
        studentRoomsDisplay.appendChild(freeHeader);

        free.forEach(item => {
            const card = document.createElement('div');
            card.className = 'room-card free';
            card.innerHTML = `
                <div class="room-title">${item.room}</div>
                <div class="status">🟢 FREE</div>
                <div class="time">${item.timeStr}</div>
            `;
            studentRoomsDisplay.appendChild(card);
        });
    }

    if (occupied.length === 0 && free.length === 0) {
        const noMatch = document.createElement('div');
        noMatch.className = 'empty-state';
        noMatch.textContent = '❌ No rooms match your search';
        studentRoomsDisplay.appendChild(noMatch);
    }
});

// ========== SAVE & LOAD ==========
function saveData() {
    localStorage.setItem('roomSchedules', JSON.stringify(schedules));
}

function refresh() {
    showStudentRooms();
    showAdminRooms();
    showSchedules();
    showStudentSchedules();
}

// ========== INIT ==========
refresh();
setInterval(refresh, 60000);

// Helper Functions
function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

function getCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
}

function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function isRoomOccupied(room, currentTime, currentDay) {
    return timetables.some(schedule => {
        return schedule.room === room &&
               schedule.day === currentDay &&
               timeToMinutes(currentTime) >= timeToMinutes(schedule.startTime) &&
               timeToMinutes(currentTime) < timeToMinutes(schedule.endTime);
    });
}

function getNextSchedule(room, currentDay) {
    const relevantSchedules = timetables.filter(s => s.room === room && s.day === currentDay);
    return relevantSchedules[0];
}

function getAllRooms() {
    const rooms = new Set(timetables.map(s => s.room));
    return Array.from(rooms).sort();
}

// Update current time
function updateTime() {
    currentTimeEl.textContent = getCurrentTime();
}

// Render Student View
function renderStudentView() {
    const rooms = getAllRooms();
    const currentTime = getCurrentTime();
    const currentDay = getCurrentDay();

    studentRoomsContainer.innerHTML = '';

    if (rooms.length === 0) {
        emptyStudentMsg.classList.add('show');
        return;
    }

    emptyStudentMsg.classList.remove('show');

    rooms.forEach(room => {
        const isOccupied = isRoomOccupied(room, currentTime, currentDay);
        const scheduleInfo = getNextSchedule(room, currentDay);

        const roomCard = document.createElement('div');
        roomCard.className = `room-card ${isOccupied ? 'occupied' : 'free'}`;

        let timeInfo = isOccupied ? (scheduleInfo ? `${scheduleInfo.startTime} - ${scheduleInfo.endTime}` : 'In use') : 'No schedule';

        roomCard.innerHTML = `
            <div class="room-name">${room}</div>
            <div class="room-status">${isOccupied ? '🔴 Occupied' : '🟢 Free'}</div>
            <div class="room-time">${timeInfo}</div>
        `;

        studentRoomsContainer.appendChild(roomCard);
    });
}

// Render Admin View Rooms
function renderAdminRooms() {
    const rooms = getAllRooms();
    const currentTime = getCurrentTime();
    const currentDay = getCurrentDay();

    roomsContainer.innerHTML = '';

    if (rooms.length === 0) {
        emptyRoomsMsg.classList.add('show');
        return;
    }

    emptyRoomsMsg.classList.remove('show');

    rooms.forEach(room => {
        const isOccupied = isRoomOccupied(room, currentTime, currentDay);
        const scheduleInfo = getNextSchedule(room, currentDay);

        const roomCard = document.createElement('div');
        roomCard.className = `room-card ${isOccupied ? 'occupied' : 'free'}`;

        let timeInfo = isOccupied ? (scheduleInfo ? `${scheduleInfo.startTime} - ${scheduleInfo.endTime}` : 'In use') : 'No schedule';

        roomCard.innerHTML = `
            <div class="room-name">${room}</div>
            <div class="room-status">${isOccupied ? '🔴 Occupied' : '🟢 Free'}</div>
            <div class="room-time">${timeInfo}</div>
        `;

        roomsContainer.appendChild(roomCard);
    });
}

// Switch Views
studentViewBtn.addEventListener('click', () => {
    console.log('Student View clicked');
    studentViewBtn.classList.add('active');
    adminViewBtn.classList.remove('active');
    studentSection.classList.remove('hidden');
    adminSection.classList.add('hidden');
    renderStudentView();
});

adminViewBtn.addEventListener('click', () => {
    console.log('Admin View clicked');
    adminViewBtn.classList.add('active');
    studentViewBtn.classList.remove('active');
    studentSection.classList.add('hidden');
    adminSection.classList.remove('hidden');
    renderAdminRooms();
});

// Toggle Admin Panel
toggleAdminBtn.addEventListener('click', () => {
    adminPanel.classList.toggle('hidden');
    toggleAdminBtn.textContent = adminPanel.classList.contains('hidden') ? 'Show Admin' : 'Hide Admin';
});

// Add Timetable
addTimetableBtn.addEventListener('click', () => {
    const room = roomNameInput.value.trim();
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    const day = daySelect.value;

    if (!room || !startTime || !endTime) {
        alert('Please fill in all fields');
        return;
    }

    if (timeToMinutes(startTime) >= timeToMinutes(endTime)) {
        alert('Start time must be before end time');
        return;
    }

    timetables.push({ room, startTime, endTime, day });
    saveTimetables();

    roomNameInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';
    daySelect.value = 'Monday';

    renderTimetables();
    renderStudentView();
    renderAdminRooms();
});

// Render Timetables List
function renderTimetables() {
    timetableContainer.innerHTML = '';

    if (timetables.length === 0) {
        emptyTimetableMsg.classList.add('show');
        return;
    }

    emptyTimetableMsg.classList.remove('show');

    timetables.forEach((schedule, index) => {
        const item = document.createElement('div');
        item.className = 'timetable-item';
        item.innerHTML = `
            <div class="timetable-item-info">
                <div class="timetable-item-room">${schedule.room}</div>
                <div class="timetable-item-time">${schedule.startTime} - ${schedule.endTime}</div>
                <div class="timetable-item-day">${schedule.day}</div>
            </div>
            <button class="btn-remove" onclick="removeTimetable(${index})">Remove</button>
        `;
        timetableContainer.appendChild(item);
    });
}

// Remove Timetable
function removeTimetable(index) {
    timetables.splice(index, 1);
    saveTimetables();
    renderTimetables();
    renderStudentView();
    renderAdminRooms();
}

// Save to localStorage
function saveTimetables() {
    localStorage.setItem('timetables', JSON.stringify(timetables));
}

// Clear All
clearAllBtn.addEventListener('click', () => {
    if (confirm('Delete all timetables?')) {
        timetables = [];
        saveTimetables();
        renderTimetables();
        renderStudentView();
        renderAdminRooms();
    }
});

// Search
searchRoom.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = studentRoomsContainer.querySelectorAll('.room-card');
    cards.forEach(card => {
        const name = card.querySelector('.room-name').textContent.toLowerCase();
        card.style.display = name.includes(term) ? 'block' : 'none';
    });
});

// Initialize
function init() {
    updateTime();
    renderStudentView();
    renderAdminRooms();
    renderTimetables();

    setInterval(() => {
        updateTime();
        renderStudentView();
        renderAdminRooms();
    }, 60000);
}

init();

// Helper Functions
function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

function getCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
}

function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function isRoomOccupied(room, currentTime, currentDay) {
    return timetables.some(schedule => {
        return schedule.room === room &&
               schedule.day === currentDay &&
               timeToMinutes(currentTime) >= timeToMinutes(schedule.startTime) &&
               timeToMinutes(currentTime) < timeToMinutes(schedule.endTime);
    });
}

function getNextSchedule(room, currentDay) {
    const relevantSchedules = timetables.filter(s => s.room === room && s.day === currentDay);
    return relevantSchedules[0];
}

function getAllRooms() {
    const rooms = new Set(timetables.map(s => s.room));
    return Array.from(rooms).sort();
}

// Update current time
function updateTime() {
    currentTimeEl.textContent = getCurrentTime();
}

// Render rooms
function renderRooms() {
    const rooms = getAllRooms();
    const currentTime = getCurrentTime();
    const currentDay = getCurrentDay();

    roomsContainer.innerHTML = '';

    if (rooms.length === 0) {
        emptyRoomsMsg.classList.add('show');
        return;
    }

    emptyRoomsMsg.classList.remove('show');

    rooms.forEach(room => {
        const isOccupied = isRoomOccupied(room, currentTime, currentDay);
        const scheduleInfo = getNextSchedule(room, currentDay);

        const roomCard = document.createElement('div');
        roomCard.className = `room-card ${isOccupied ? 'occupied' : 'free'}`;

        let timeInfo = '';
        if (scheduleInfo) {
            timeInfo = `${scheduleInfo.startTime} - ${scheduleInfo.endTime}`;
        } else {
            timeInfo = 'No schedule';
        }

        roomCard.innerHTML = `
            <div class="room-name">${room}</div>
            <div class="room-status">${isOccupied ? '🔴 Occupied' : '🟢 Free'}</div>
            <div class="room-time">${timeInfo}</div>
        `;

        roomsContainer.appendChild(roomCard);
    });
}

// Toggle admin panel
toggleAdminBtn.addEventListener('click', () => {
    adminPanel.classList.toggle('hidden');
    toggleAdminBtn.textContent = adminPanel.classList.contains('hidden') ? 'Show Admin' : 'Hide Admin';
});

// Add timetable
addTimetableBtn.addEventListener('click', () => {
    const room = roomNameInput.value.trim();
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    const day = daySelect.value;

    if (!room || !startTime || !endTime) {
        alert('Please fill in all fields');
        return;
    }

    if (timeToMinutes(startTime) >= timeToMinutes(endTime)) {
        alert('Start time must be before end time');
        return;
    }

    const timetable = { room, startTime, endTime, day };
    timetables.push(timetable);
    saveTimetables();

    // Clear inputs
    roomNameInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';
    daySelect.value = 'Monday';

    renderTimetables();
    renderRooms();
});

// Render timetables list
function renderTimetables() {
    timetableContainer.innerHTML = '';

    if (timetables.length === 0) {
        emptyTimetableMsg.classList.add('show');
        return;
    }

    emptyTimetableMsg.classList.remove('show');

    timetables.forEach((schedule, index) => {
        const item = document.createElement('div');
        item.className = 'timetable-item';
        item.innerHTML = `
            <div class="timetable-item-info">
                <div class="timetable-item-room">${schedule.room}</div>
                <div class="timetable-item-time">${schedule.startTime} - ${schedule.endTime}</div>
                <div class="timetable-item-day">${schedule.day}</div>
            </div>
            <button class="btn-remove" onclick="removeTimetable(${index})">Remove</button>
        `;
        timetableContainer.appendChild(item);
    });
}

// Remove timetable
function removeTimetable(index) {
    timetables.splice(index, 1);
    saveTimetables();
    renderTimetables();
    renderRooms();
}

// Save timetables to localStorage
function saveTimetables() {
    localStorage.setItem('timetables', JSON.stringify(timetables));
}

// Clear all data
clearAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all timetables?')) {
        timetables = [];
        saveTimetables();
        renderTimetables();
        renderRooms();
    }
});

// Initialize
function init() {
    updateTime();
    renderStudentView();
    renderRooms();
    renderTimetables();

    // Update time every minute
    setInterval(updateTime, 60000);

    // Update rooms every minute
    setInterval(() => {
        renderStudentView();
        renderRooms();
    }, 60000);
}

// Switch between Student and Admin views
studentViewBtn.addEventListener('click', () => {
    studentViewBtn.classList.add('active');
    adminViewBtn.classList.remove('active');
    studentView.classList.remove('hidden');
    adminRooms.classList.add('hidden');
    adminSection.classList.add('hidden');
    toggleAdminBtn.style.display = 'none';
});

adminViewBtn.addEventListener('click', () => {
    adminViewBtn.classList.add('active');
    studentViewBtn.classList.remove('active');
    studentView.classList.add('hidden');
    adminRooms.classList.remove('hidden');
    adminSection.classList.remove('hidden');
    toggleAdminBtn.style.display = 'inline-block';
});

// Render Student View
function renderStudentView() {
    const rooms = getAllRooms();
    const currentTime = getCurrentTime();
    const currentDay = getCurrentDay();

    studentRoomsContainer.innerHTML = '';

    if (rooms.length === 0) {
        emptyStudentMsg.classList.add('show');
        return;
    }

    emptyStudentMsg.classList.remove('show');

    rooms.forEach(room => {
        const isOccupied = isRoomOccupied(room, currentTime, currentDay);
        const scheduleInfo = getNextSchedule(room, currentDay);

        const roomCard = document.createElement('div');
        roomCard.className = `room-card ${isOccupied ? 'occupied' : 'free'}`;

        let timeInfo = '';
        if (scheduleInfo) {
            timeInfo = `${scheduleInfo.startTime} - ${scheduleInfo.endTime}`;
        } else {
            timeInfo = 'No classes today';
        }

        roomCard.innerHTML = `
            <div class="room-name">${room}</div>
            <div class="room-status">${isOccupied ? '🔴 Occupied' : '🟢 Free'}</div>
            <div class="room-time">${timeInfo}</div>
        `;

        studentRoomsContainer.appendChild(roomCard);
    });
}

// Search rooms
searchRoom.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = studentRoomsContainer.querySelectorAll('.room-card');
    
    cards.forEach(card => {
        const roomName = card.querySelector('.room-name').textContent.toLowerCase();
        if (roomName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Start the app
init();