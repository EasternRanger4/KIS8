async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username)

    const responce = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });
    const data = await responce.json();
    console.log(data);
}