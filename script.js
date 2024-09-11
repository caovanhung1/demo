document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn form gửi đi theo cách mặc định

    // Lấy giá trị từ các ô nhập liệu
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Lấy dữ liệu từ Google Sheets
    fetch('https://spreadsheets.google.com/feeds/list/1m7R63nNyo8l-zw0gznOgQ1ty3mWL4WdJmbZwfwgqGJI/od6/public/values?alt=json')
      .then(response => response.json())
      .then(data => {
        const entries = data.feed.entry;
        let isAuthenticated = false;

        // Kiểm tra từng bản ghi để xác thực thông tin đăng nhập
        entries.forEach(entry => {
          const sheetUsername = entry.gsx$username.$t; // Truy cập cột username
          const sheetPassword = entry.gsx$password.$t; // Truy cập cột password
          
          if (username === sheetUsername && password === sheetPassword) {
            isAuthenticated = true;
          }
        });

        if (isAuthenticated) {
          // Chuyển hướng đến Websiteinterface.html nếu thông tin đăng nhập đúng
          window.location.href = 'Websiteinterface.html';
        } else {
          alert('Username hoặc password không đúng');
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        alert('Lỗi kết nối tới máy chủ. Vui lòng thử lại sau.');
      });
  });
});
