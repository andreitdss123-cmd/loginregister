document.addEventListener('DOMContentLoaded', () => {

    // 🔹 Firebase config (PUNE AICI DATELE TALE)
    const firebaseConfig = {
        apiKey: "AIzaSyAKaiFcuHXOklLSv87s_oByUeSZJY6MAzE",
        authDomain: "loginregister-a5da9.firebaseapp.com",
        projectId: "loginregister-a5da9",
        storageBucket: "loginregister-a5da9.firebasestorage.app",
        messagingSenderId: "871660633604",
        appId: "1:871660633604:web:3a274b49d85290f4a2ff51"
    };

    // 🔹 Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // 🔹 Elemente
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const googleLoginBtn = document.getElementById('googleLoginBtn');

    // 🔹 REGISTER
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            auth.createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const user = userCredential.user;

                    // 🔥 EMAIL VERIFICATION CU REDIRECT
                    user.sendEmailVerification({
                        url: 'https://andreitdss123-cmd.github.io/loginregister/home.html'
                    })
                    .then(() => {
                        alert("Cont creat! Verifică email-ul (inclusiv spam).");
                    });

                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    // 🔹 LOGIN
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            auth.signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const user = userCredential.user;

                    if (user.emailVerified) {
                        window.location.href = 'home.html';
                    } else {
                        alert('Verifică email-ul înainte să te loghezi!');
                    }
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    // 🔹 GOOGLE LOGIN
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();

            auth.signInWithPopup(provider)
                .then(result => {
                    window.location.href = 'home.html';
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

});