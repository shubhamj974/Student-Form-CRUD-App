let cl = console.log

const formContainer = document.getElementById('form-Container'),
    StdInfoContainer = document.getElementById('StdInfoContainer'),
    editBtnForm = document.getElementById('editBtnForm'),
    addBtnForm = document.getElementById('addBtnForm'),
    InputFname = document.getElementById('fname'),
    InputLname = document.getElementById('lname'),
    InputEmail = document.getElementById('email'),
    InputContact = document.getElementById('contact')
    cancelForm = document.getElementById('cancelForm')

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


let stdArr = [];

function stduentTemp(arr) {
    let result = '';
    arr.forEach((std, i) => {
        result +=
            `
            <tr class="text-white" id="${std.id}">
                <td>${i + 1}</td>
                <td>${std.fname}</td>
                <td>${std.lname}</td>
                <td>${std.email}</td>
                <td>${std.contact}</td>
                <td><button type="submit" class="btn btn-primary text-white" onclick = "editBtnClick(this)"><i class="fas fa-user-edit"></i></button></td>
                <td><button type="submit" class="btn gradient text-white" onclick = "deleteBtnClick(this)"><i class="fas fa-trash"></i></button></td>
            </tr>
        `
    })
    StdInfoContainer.innerHTML = result
}

// if(localStorage.getItem('studentData')){
//     stdArr = JSON.parse(localStorage.getItem('studentData'));
// }
// stdArr = JSON.parse(localStorage.getItem('studentData')) || [];
stdArr = JSON.parse(localStorage.getItem('studentData')) ?? [];

stduentTemp(stdArr);

const onFormHandler = (e) => {
    e.preventDefault();
    let obj = {
        fname: InputFname.value,
        lname: InputLname.value,
        email: InputEmail.value,
        contact: InputContact.value,
        id: create_UUID()
    }
    e.target.reset();
    stdArr.push(obj);
    localStorage.setItem('studentData', JSON.stringify(stdArr))
    stduentTemp(stdArr);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Form Is Successfully Added',
        showConfirmButton: false,
        timer: 2000
    })

}

const editBtnClick = (e) => {
    let edit = e.closest('tr').getAttribute('id');
    localStorage.setItem('editItem', edit)
    let editForm = stdArr.find(ele => ele.id === edit)
    InputFname.value = editForm.fname
    InputLname.value = editForm.lname
    InputEmail.value = editForm.email
    InputContact.value = editForm.contact

    editBtnForm.classList.remove('d-none');
    addBtnForm.classList.add('d-none')

}
const OnClickHandler = (e) => {
    let editEle = localStorage.getItem('editItem');
    stdArr.forEach(ele => {
        if (ele.id === editEle) {
            ele.fname = InputFname.value
            ele.lname = InputLname.value
            ele.email = InputEmail.value
            ele.contact = InputContact.value
        }
    })

    localStorage.setItem('studentData', JSON.stringify(stdArr))
    stduentTemp(stdArr);
    formContainer.reset();
    editBtnForm.classList.add('d-none');
    addBtnForm.classList.remove('d-none');

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: ' Form Is Successfully Update',
        showConfirmButton: false,
        timer: 2000
    })
}

const deleteBtnClick = (e) => {
    // let deleteId = e.closest('tr').getAttribute('id');
    let deleteId = e.closest('tr').id;
    let delFindInd = stdArr.findIndex(std => std.id === deleteId);
    stdArr.splice(delFindInd, 1)
    localStorage.setItem('studentData', JSON.stringify(stdArr));
    stduentTemp(stdArr);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: ' Form Is Successfully Delete',
        showConfirmButton: false,
        timer: 2000
    })

}

const onclickCancel = (e) => {
    formContainer.reset();
}

formContainer.addEventListener('submit', onFormHandler);
editBtnForm.addEventListener('click', OnClickHandler);
cancelForm.addEventListener('click' , onclickCancel);
