var allUsers = [];

var users = localStorage.getItem('users');


if (users !== null) {
    allUsers = JSON.parse(users)
}

function signup() {
    var a = document.getElementById('email')
    var b = document.getElementById('pass')
    var user = {
        email: a.value,
        password: b.value
    }

    allUsers.push(user)
    localStorage.setItem('users', JSON.stringify(allUsers))
    location.href = './index.html'
}


function signin() {
    var a = document.getElementById('email')
    var b = document.getElementById('pass')
    let filterUser = allUsers.filter(data => data.email === a.value && data.password === b.value);

    if (filterUser.length) {
        location.href = './expense.html'

    } else {
        alert("email/password incorrect")
    }


}

function signout() {
    localStorage.clear()
    location.href = './index.html'
}

function sign() {
    location.href = './register.html'
}

const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");

var items = [];
expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = document.getElementById("expense-amount").value;
    const expenseCategory = document.getElementById("expense-category").value;

    var singleItem = {
        expenseName,
        expenseAmount,
        expenseCategory
    }
    items.push(singleItem)
    localStorage.setItem("allitems", JSON.stringify(items));

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${expenseName}</td>
            <td>${expenseAmount}</td>
            <td>${expenseCategory}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                <button class="btn btn-info btn-sm edit-btn">Edit</button>
               
            </td>
        `;

    expenseList.appendChild(row);
    expenseForm.reset();


    const deleteButton = row.querySelector(".delete-btn");
    const editButton = row.querySelector(".edit-btn");

    deleteButton.addEventListener("click", function () {
        row.remove();
    });
    editButton.addEventListener("click", function () {
        var newAmount = +prompt("Enter new amount:");
        if (!isNaN(newAmount)) {
            row.querySelector("td:nth-child(2)").textContent = newAmount;
            var index = items.findIndex(item => item.expenseName == expenseName);
            if (index !== -1) {
                items[index].expenseAmount = newAmount;
                localStorage.setItem("allitems", JSON.stringify(items));
            }
        } else {
            alert("Invalid input. Please enter a valid amount.");
        }
    });

    return row;
}
);


var getbody = document.getElementById("expense-list")

function deleteall() {
    getbody.innerHTML = " "
}


