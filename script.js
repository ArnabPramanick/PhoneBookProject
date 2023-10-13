let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function getLastFourDigits(phone) {
    const last4Digits = phone.slice(-4);
    const maskedNumber = last4Digits.padStart(phone.length, "*");
    return maskedNumber;
}

function displayContacts() {
    let data = "";
    for (let i = 0; i < contacts.length; i++) {
        data += `<tr>
                <td>${i + 1}</td>
                <td>${contacts[i].name}</td>
                <td>${getLastFourDigits(contacts[i].phone)}</td>
                <td>
                <button type="submit" class='btn btn-danger' onclick='deleteContact(${i})'>Delete</button>
                <button type="submit" class='btn btn-success' onclick='viewContact(${i})'>Edit</button>
                </td>
            </tr>`;
    }
    document.getElementById("contacts").innerHTML = data;
}

function updateContact() {
    const id = document.getElementById("id1").value;
    const name = document.getElementById("name1").value;
    const phone = document.getElementById("phone1").value;
    const index = id - 1;

    if (name.trim() == "" || phone.trim() == "") {
        alert("Name and Phone fields are mandatory");
    } else if (id.trim() == "") {
        alert("Please Update Valid Credentials");
        document.getElementById("name1").value = "";
        document.getElementById("phone1").value = "";
    } else {
        contacts[index] = { name, phone };
        saveContacts();
        document.getElementById("id1").value = "";
        document.getElementById("name1").value = "";
        document.getElementById("phone1").value = "";
        alert("Contact updated Successfully");
        displayContacts();
    }
}

function viewContact(index) {
    document.getElementById("id1").value = index + 1;
    document.getElementById("name1").value = contacts[index].name;
    document.getElementById("phone1").value = contacts[index].phone;
}

function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    alert("Contact Deleted Successfully");
    displayContacts();
}

function addContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (name.trim() == "" || phone.trim() == "") {
        alert("Name and Phone fields are mandatory");
    } else {
        // Check for duplicate name or phone
        if (contacts.some((contact) => contact.phone === phone)) {
            alert("This contact already exists.");
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
        } else {
            contacts.push({ name, phone });
            saveContacts();
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
            displayContacts();
        }
    }
}

function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

displayContacts();
