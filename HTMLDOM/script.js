// ====== Theme Switcher (Light/Dark Mode) ======

document.addEventListener('DOMContentLoaded', () => {
    const lightModeBtn = document.getElementById('lightMode');
    const darkModeBtn = document.getElementById('darkMode');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    lightModeBtn.addEventListener('click', () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    });
    
    darkModeBtn.addEventListener('click', () => {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    });

    // ====== Timer Functionality ======
    const timerDisplay = document.getElementById('timer-display');
    const timerInput = document.getElementById('timerInput');
    const startButton = document.getElementById('startTimer');
    const pauseButton = document.getElementById('pauseTimer');
    const resetButton = document.getElementById('resetTimer');
    const timerContainer = document.getElementById('timer-container');
    let secondsLeft = 0;
    let timerRunning = false;
    let timerInterval = null;

    function showTime(seconds) 
    {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        let minutesDisplay = minutes < 10 ? '0' + minutes : minutes;
        let secondsDisplay = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
        timerDisplay.textContent = minutesDisplay + ':' + secondsDisplay;
    }

    function updateColor()
    {
        timerContainer.classList.remove('timer-green', 'timer-yellow', 'timer-red');
        if (secondsLeft > 10) {
            timerContainer.classList.add('timer-green');
        } else if (secondsLeft >= 5) {
            timerContainer.classList.add('timer-yellow');
        } else {
            timerContainer.classList.add('timer-red'); 
        }
    }

    function startTimer() 
    {
        if (!timerRunning) {
            let inputSeconds = Number(timerInput.value);
            if (inputSeconds <= 0 || !inputSeconds) {
                alert('Please enter a valid number of seconds');
                return;
            }
            secondsLeft = inputSeconds;
        }
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        timerInput.disabled = true;
        timerRunning = true;
        timerInterval = setInterval(function() {
            secondsLeft--;
            showTime(secondsLeft);
            updateColor();
            if (secondsLeft <= 0) {
                resetTimer();
                alert('Time is up!');
            }
        }, 1000);
    }
    function pauseTimer() {
        clearInterval(timerInterval);
        timerRunning = false;
        startButton.disabled = false;
        startButton.textContent = 'Resume';
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerRunning = false;
        secondsLeft = 0;
        showTime(0);
        timerContainer.classList.remove('timer-green', 'timer-yellow', 'timer-red');
        startButton.disabled = false;
        startButton.textContent = 'Start';
        pauseButton.disabled = true;
        resetButton.disabled = true;
        timerInput.disabled = false;
        timerInput.value = '';
    }
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    // List Operations
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItem');
    const itemList = document.getElementById('itemList');
    const sortListButton = document.getElementById('sortList');
    const removeDuplicatesButton = document.getElementById('removeDuplicates');
    const reverseListButton = document.getElementById('reverseList');

    function addItem() 
    {
        const text = itemInput.value.trim();
        if (!text) 
        {
            alert('Please enter a value in the input box');
            itemInput.focus();
            return;
        }
        const li = document.createElement('li');
        li.textContent = text;
        itemList.appendChild(li);
        itemInput.value = '';
    }

    function sortItems() 
    {
        const items = Array.from(itemList.children);
        items.sort((a, b) => a.textContent.localeCompare(b.textContent));
        itemList.innerHTML = '';
        items.forEach(item => itemList.appendChild(item));
    }

    function removeDuplicates() 
    {
        const items = Array.from(itemList.children);
        const uniqueTexts = new Set();
        items.forEach(item => 
        {
            if (!uniqueTexts.has(item.textContent)) 
            {
                uniqueTexts.add(item.textContent);
            } 
            else 
            {
                item.remove();
            }
        });
    }

    function reverseItems() 
    {
        const items = Array.from(itemList.children);
        itemList.innerHTML = '';
        items.reverse().forEach(item => itemList.appendChild(item));
    }

    addItemButton.addEventListener('click', addItem);
    itemInput.addEventListener('keypress', function(e) 
    {
        if (e.key === 'Enter') addItem();
    });
    sortListButton.addEventListener('click', sortItems);
    removeDuplicatesButton.addEventListener('click', removeDuplicates);
    reverseListButton.addEventListener('click', reverseItems);

    // Dynamic Table
    const nameInput = document.getElementById('nameInput');
    const ageInput = document.getElementById('ageInput');
    const cityInput = document.getElementById('cityInput');
    const addRowButton = document.getElementById('addRow');
    const tableBody = document.querySelector('#dataTable tbody');

    function addTableRow() 
    {
        const name = nameInput.value.trim();
        const age = ageInput.value.trim();
        const city = cityInput.value.trim();
        
        if (!name) 
        {
            alert('Please enter a name');
            nameInput.focus();
            return;
        }
        if (!age) 
        {
            alert('Please enter an age');
            ageInput.focus();
            return;
        }
        if (!city) 
        {
            alert('Please enter a city');
            cityInput.focus();
            return;
        }

        const ageNum = parseInt(age);
        if (isNaN(ageNum) || ageNum < 0 || ageNum > 150) 
        {
            alert('Please enter a valid age between 0 and 150');
            ageInput.value = '';
            ageInput.focus();
            return;
        }
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${name}</td>
            <td>${ageNum}</td>
            <td>${city}</td>
            <td>
                <button class="action-btn edit-btn">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
            </td>
        `;
        
        const editBtn = tr.querySelector('.edit-btn');
        const deleteBtn = tr.querySelector('.delete-btn');
        
        editBtn.addEventListener('click', function() 
        {
            const cells = tr.querySelectorAll('td');
            const newName = prompt('Enter new name:', cells[0].textContent);
            if (!newName || newName.trim() === '') {
                alert('Name cannot be empty');
                return;
            }
            
            const newAge = prompt('Enter new age:', cells[1].textContent);
            if (!newAge || newAge.trim() === '') {
                alert('Age cannot be empty');
                return;
            }
            
            const newCity = prompt('Enter new city:', cells[2].textContent);
            if (!newCity || newCity.trim() === '') {
                alert('City cannot be empty');
                return;
            }
            
            const newAgeNum = parseInt(newAge);
            if (isNaN(newAgeNum) || newAgeNum < 0 || newAgeNum > 150) 
            {
                alert('Please enter a valid age between 0 and 150');
                return;
            }
            
            cells[0].textContent = newName.trim();
            cells[1].textContent = newAgeNum;
            cells[2].textContent = newCity.trim();
        });
        
        deleteBtn.addEventListener('click', function() 
        {
            if (confirm('Are you sure you want to delete this row?')) 
            {
                tr.remove();
            }
        });
        
        tableBody.appendChild(tr);
        nameInput.value = '';
        ageInput.value = '';
        cityInput.value = '';
    }

    addRowButton.addEventListener('click', addTableRow);

    // Image Gallery
    const thumbnails = document.querySelectorAll('.thumbnail');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    thumbnails.forEach(function(thumbnail) 
    {
        thumbnail.addEventListener('click', function() 
        {
            const fullSizeUrl = thumbnail.src.replace('250/250', '1200/800');
            modalImg.src = fullSizeUrl;
            modal.classList.add('show');
        });
    });

    closeModal.addEventListener('click', function() 
    {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', function(e) 
    {
        if (e.target === modal) 
        {
            modal.classList.remove('show');
        }
    });
});