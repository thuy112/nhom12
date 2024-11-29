document.querySelector('.search-bar input').addEventListener('keyup', (event) => {
    const query = event.target.value.toLowerCase();
    console.log(`Tìm kiếm: ${query}`);
    // Kết nối API tìm kiếm và hiển thị kết quả
});
async function fetchTruyenList() {
    try {
        const response = await fetch('https://api.example.com/truyen');
        const data = await response.json();
        const truyenListContainer = document.querySelector('.truyen-list');
        truyenListContainer.innerHTML = data.map(truyen => `
            <div class="truyen-card">
                <img src="${truyen.image}" alt="${truyen.title}">
                <h3>${truyen.title}</h3>
            </div>
        `).join('');
    } catch (error) {
        console.error('Lỗi khi tải danh sách truyện:', error);
    }
}

fetchTruyenList();
// scripts.js

// Hàm hiển thị nội dung theo tab
function showTab(tabId) {
    document.getElementById('device-tab').style.display = tabId === 'device' ? 'block' : 'none';
    document.getElementById('account-tab').style.display = tabId === 'account' ? 'block' : 'none';

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Thêm truyện vào lịch sử (cập nhật hoặc thêm mới)
function addToHistory(title, chapter) {
    const history = JSON.parse(localStorage.getItem('readingHistory')) || [];

    // Kiểm tra xem truyện đã tồn tại trong lịch sử chưa
    const existingStoryIndex = history.findIndex(story => story.title === title);
    if (existingStoryIndex !== -1) {
        history[existingStoryIndex].chapter = chapter; // Cập nhật chương
    } else {
        history.push({ title, chapter }); // Thêm truyện mới
    }

    // Lưu lịch sử vào localStorage
    localStorage.setItem('readingHistory', JSON.stringify(history));
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('readingHistory')) || [];
    const historyList = document.getElementById('device-history');

    // Kiểm tra nếu lịch sử trống
    if (history.length === 0) {
        historyList.innerHTML = '<li>Bạn chưa đọc truyện nào.</li>';
        return;
    }

    // Hiển thị danh sách truyện đã đọc
    historyList.innerHTML = '';
    history.forEach(story => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${story.title}</strong><br>
            Chương: <a href="chapter${story.chapter}.html">Chương ${story.chapter}</a>
        `;
        historyList.appendChild(listItem);
    });
}
if (!window.localStorage) {
    alert('Trình duyệt của bạn không hỗ trợ lưu trữ lịch sử!');
}


//các nút bấm ở ảnh
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const boxWidth = slider.querySelector('.box-product').offsetWidth; // Chiều rộng mỗi box
    const maxScroll = slider.scrollWidth - slider.clientWidth; // Tổng cuộn tối đa
    let scrollAmount = 0;

    // Xử lý sự kiện bấm nút Next
    nextBtn.addEventListener('click', () => {
        moveSlider('next');
    });

    // Xử lý sự kiện bấm nút Prev
    prevBtn.addEventListener('click', () => {
        moveSlider('prev');
    });

    // Xử lý sự kiện bàn phím
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            moveSlider('next');
        } else if (event.key === 'ArrowLeft') {
            moveSlider('prev');
        }
    });

    // Hàm di chuyển slider
    function moveSlider(direction) {
        if (direction === 'next') {
            // Cuộn sang phải từng box
            scrollAmount += boxWidth;
            if (scrollAmount > maxScroll) scrollAmount = maxScroll; // Không cuộn vượt quá
        } else if (direction === 'prev') {
            // Cuộn sang trái từng box
            scrollAmount -= boxWidth;
            if (scrollAmount < 0) scrollAmount = 0; // Không cuộn ngược quá đầu
        }
        slider.scrollLeft = scrollAmount; // Cuộn slider bằng scrollLeft
        toggleNavButtons();
    }

    // Ẩn hoặc hiện nút điều hướng
    function toggleNavButtons() {
        prevBtn.style.display = scrollAmount === 0 ? 'none' : 'block';
        nextBtn.style.display = scrollAmount >= maxScroll ? 'none' : 'block';
    }

    // Khởi tạo trạng thái ban đầu
    toggleNavButtons();
});

//Thể loại
// Lấy tất cả các mục trong dropdown
const genreLinks = document.querySelectorAll('.dropdown-content a');

// Thêm mô tả ngay sau từng mục
genreLinks.forEach(link => {
    const descriptionText = link.getAttribute('data-description');

    // Tạo phần tử mô tả
    const description = document.createElement('div');
    description.classList.add('description');
    description.textContent = descriptionText;

    // Chèn phần mô tả sau mỗi liên kết
    link.insertAdjacentElement('afterend', description);
});

// Hàm tính toán thời gian đã trôi qua của 1
function timeAgo(date) {
    const now = new Date();
    const timeDiff = now - new Date(date);  // Độ chênh lệch thời gian (milliseconds)

    const minutes = Math.floor(timeDiff / 60000); // Chuyển đổi sang phút
    if (minutes < 1) {
        return "Vừa xong";
    } else if (minutes < 60) {
        return minutes + " phút trước";
    } else if (minutes < 1440) { // less than 1 day
        const hours = Math.floor(minutes / 60);
        return hours + " giờ trước";
    } else {
        const days = Math.floor(minutes / 1440);
        return days + " ngày trước";
    }
}

// Cập nhật thời gian đăng
document.querySelectorAll('.time-posted').forEach(function(element) {
    const timePosted = element.getAttribute('data-time');
    element.innerText = timeAgo(timePosted);
});

// Cập nhật tự động sau mỗi phút
setInterval(function() {
    document.querySelectorAll('.time-posted').forEach(function(element) {
        const timePosted = element.getAttribute('data-time');
        element.innerText = timeAgo(timePosted);
    });
}, 60000);

//nhảy chương
    // Lấy URL hiện tại
    const currentUrl = window.location.pathname;

    // Lấy số chương hiện tại từ URL (giả sử chương trong tên file, ví dụ: chapter3.html)
    const currentChapterMatch = currentUrl.match(/chapter(\d+)\.html/);
    const totalChapters = 10; // Tổng số chương

    if (currentChapterMatch) {
        const currentChapter = parseInt(currentChapterMatch[1], 10); // Lấy số chương hiện tại

        // Xác định các liên kết chương trước và sau
        const prevChapter = currentChapter > 1 ? `chapter${currentChapter - 1}.html` : null;
        const nextChapter = currentChapter < totalChapters ? `chapter${currentChapter + 1}.html` : null;

        // Cập nhật liên kết cho nút
        const prevButton = document.getElementById("prev-chapter");
        const nextButton = document.getElementById("next-chapter");

        if (prevChapter) {
            prevButton.href = prevChapter;
        } else {
            prevButton.style.visibility = "hidden"; // Ẩn nút nếu không có chương trước
        }

        if (nextChapter) {
            nextButton.href = nextChapter;
        } else {
            nextButton.style.visibility = "hidden"; // Ẩn nút nếu không có chương sau
        }
    } else {
        console.error("Không xác định được số chương từ URL.");
    }

// Hàm tính toán thời gian đã trôi qua của chapter
function timeAgo(date) {
    const now = new Date();
    const timeDiff = now - new Date(date);  // Độ chênh lệch thời gian (milliseconds)

    const minutes = Math.floor(timeDiff / 60000); // Chuyển đổi sang phút
    if (minutes < 1) {
        return "Vừa xong";
    } else if (minutes < 60) {
        return minutes + " phút trước";
    } else if (minutes < 1440) { // less than 1 day
        const hours = Math.floor(minutes / 60);
        return hours + " giờ trước";
    } else {
        const days = Math.floor(minutes / 1440);
        return days + " ngày trước";
    }
}

// Cập nhật thời gian đăng cho tất cả các ô <td class="time-posted">
document.querySelectorAll('.time-posted').forEach(function(element) {
    const timePosted = element.getAttribute('data-time');
    element.innerText = timeAgo(timePosted);
});

// Cập nhật tự động sau mỗi phút
setInterval(function() {
    document.querySelectorAll('.time-posted').forEach(function(element) {
        const timePosted = element.getAttribute('data-time');
        element.innerText = timeAgo(timePosted);
    });
}, 60000);
