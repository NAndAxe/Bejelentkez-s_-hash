async function registration_request() {
    let email = document.getElementById("r_email").value
    let password1 = document.getElementById("r_password1").value
    let password2 = document.getElementById("r_password2").value

    let registrationData = {
        email: email,
        password: password1
    };
    if (password1 == password2) {
        const response = await fetch(
            "http://localhost:8080/registration", { method: "POST", headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(registrationData) }
        );
        const data = await response.json();
        console.log(data)
    }
}

async function loginRequest() {
    const email = document.getElementById("l_email").value;
    const password = document.getElementById("l_password").value;
    const statusDiv = document.getElementById("loginStatus");

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        statusDiv.style.color = "green";
        statusDiv.textContent = "Sikeres bejelentkezés!: " + data.id;
    } catch (error) {
        console.error("Login error:", error);
    }

}