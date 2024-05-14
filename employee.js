let employees = JSON.parse(localStorage.getItem('employees')) ||
    [
        {
            "id": 1,
            "name": "Nguyễn Văn An",
            "age": 25,
            "gender": "male"
        },
        {
            "id": 2,
            "name": "Trần Thị Bình",
            "age": 30,
            "gender": "female"
        },
        {
            "id": 3,
            "name": "Lê Hoàng Cước",
            "age": 40,
            "gender": "male"
        },
        {
            "id": 4,
            "name": "Phạm Thị Dịu",
            "age": 22,
            "gender": "female"
        },
        {
            "id": 5,
            "name": "Võ Thành An",
            "age": 28,
            "gender": "male"
        },
        {
            "id": 6,
            "name": "Đỗ Thị Diệu",
            "age": 35,
            "gender": "female"
        },
        {
            "id": 7,
            "name": "Nguyễn Văn Thành",
            "age": 50,
            "gender": "male"
        },
        {
            "id": 8,
            "name": "Hoàng Thị Hải",
            "age": 27,
            "gender": "female"
        },
        {
            "id": 9,
            "name": "Nguyễn Thành Nam",
            "age": 33,
            "gender": "male"
        },
        {
            "id": 10,
            "name": "Nguyễn Văn Kiên",
            "age": 26,
            "gender": "male"
        },
        {
            "id": 11,
            "name": "Nguyễn Ngọc Bách",
            "age": 17,
            "gender": "male"
        },
        {
            "id": 12,
            "name": "Nguyễn Thu Hiền",
            "age": 19,
            "gender": "female"
        }
    ];
localStorage.setItem('employees', JSON.stringify(employees));
const _id = document.querySelector('#empID')
const _name = document.querySelector('#empName')
const _age = document.querySelector('#empAge')
const empsList = document.querySelector('.empList')

// function showEmployee(arr){

// }
//showEmployee();

// const showEmployee1=(list==employees) =>{

// }

const showEmployee = (arr = employees) => {
    empsList.innerHTML = '';//xoa du lieu cu
    
    arr.map((emp) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
             <td>${emp.id}</td>
             <td>${emp.name}</td>
             <td>${emp.age}</td>
             <td>${emp.gender}</td>
             <td class="text-center">
             <button onclick="deleteEmp('${emp.id}')"  class="btn btn-danger" 
                     type="button"
                     ">Delete</button>
             </td>
           `;
        empsList.appendChild(tr);
        tr.addEventListener('click', (e) => {
            if (e.target.textContent !== 'Delete') {
                _id.value = emp.id;
                _name.value = emp.name;
                _age.value = emp.age;
                document.querySelector(`input[name='gender'][value='${emp.gender}']`).checked = true;
                _id.setAttribute('readOnly', 'true');
            }
        });
   });
}
showEmployee();
//kiem tra xem id co chua?
const getEmployeeById = (id) => {
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id.toString() === id.toString()) return employees[i]
    }
    return null;
}

// //Hàm xử lý thêm 1 sinh viên
const addEmp = (emp) => {
    employees.push(emp)
    showEmployee(employees)
    localStorage.setItem('employees', JSON.stringify(employees))
}
// //Hàm xử lý Xóa 1 sinh viên
const deleteEmp = (id) => {
    const confirmDelete = confirm('Bạn muốn xóa nhâm viên có id là ' + id + '?')
    if (confirmDelete) {
        employees = employees.filter(emp => emp.id.toString() !== id.toString());
        showEmployee(employees)
        localStorage.setItem('employees', JSON.stringify(employees))
    }
}
// //Hàm xử lý cập nhật 1 sinh viên
const updateEmp = (emp) => {
    const fineIndex = employees.findIndex(empTmp => empTmp.id.toString() ===
        emp.id.toString())
    employees[fineIndex] = emp
    showEmployee(employees)
    localStorage.setItem('employees', JSON.stringify(employees))
}

// //==============================================================
// //const btnSave = document.querySelector('.btn-save')
// // btnSave.addEventListener('click', () => {
// // })
const saveEmployee = () => {
    const id = _id.value;
    const name = _name.value;
    const age = _age.value;
    const employee = {
        id: id,
        name: name,
        age: age,
        gender: document.querySelector('input[name="gender"]:checked').value
    }
    if (id == "" || name == "" || age == "") {
        alert('Vui lòng nhập hết các ô bên dưới')
    }
    else if (getEmployeeById(id)) {
        alert('ID đã tồn tại, vui lòng chọn ID khác')
    }
    else {
        _id.value = _name.value = _age.value = ''
        addEmp(employee)
    }
}
const updateEmployee = () => {
    const update = _id.getAttribute('readOnly')
    if (update) {
        const employee = {
            id: _id.value,
            name: _name.value,
            age: _age.value,
            gender: document.querySelector('input[name="gender"]:checked').value
        }
        _id.value = _name.value = _age.value = ''
        _id.removeAttribute('readOnly')
        updateEmp(employee)
    }
    else {
        alert('Vui lòng click vào Employee để thực hiện update')
    }
}
const sortByName = () => {
    employees.sort((sA, sB) => {
        let a = sA.name.split(/\s+/).at(-1)+sA;
        //a = a[a.length - 1] + a;
        // console.log(a);
        let b = sB.name.split(/\s+/).at(-1)+sB;
        //b = b[b.length - 1] + b;
        return a.toLowerCase().localeCompare(b.toLowerCase());
    })
    showEmployee(employees)
    localStorage.setItem('employees', JSON.stringify(employees))
}

const sortByAge = () => {
    employees.sort((sA, sB) => sA.age - sB.age);
    showEmployee(employees)
    localStorage.setItem('employees', JSON.stringify(employees))
}

const sortByAge1 = () => {
    employees.sort((sA, sB) => sB.age - sA.age);
    showEmployee(employees)
    localStorage.setItem('employees', JSON.stringify(employees))
}
const searchByName = () => {
    const search = prompt('Nhập vào tìm kiếm');
    if (search) {
        const searchEmps = employees.filter(emp => emp.name.toLowerCase().includes(
            search.toLowerCase()))
        showEmployee(searchEmps)
    }
}