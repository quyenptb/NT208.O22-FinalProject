const fs = require('fs');

// Đọc dữ liệu từ file JSON
function readJSONFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('user.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Sử dụng dữ liệu JSON trong một mảng JavaScript
async function useJSONData() {
    try {
        // Đọc dữ liệu từ file JSON và chuyển đổi thành mảng
        const my_array = await readJSONFile();

        // Sử dụng mảng jsonData ở đây
        console.log(my_array[0]);
    } catch (error) {
        console.error("Lỗi khi sử dụng dữ liệu JSON:", error);
    }
}

// Gọi hàm để chạy chương trình
useJSONData();
