firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    const uid = user.uid;

    // Fetch user data from Firestore
    firebase.firestore().collection("users").doc(uid).get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();

          // Save to localStorage or sessionStorage if needed
          localStorage.setItem("userEmail", userData.email);
          localStorage.setItem("username", userData.username);

          // Redirect to profile page
          window.location.href = "profile.html";
        } else {
          alert("No user data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("Failed to load user profile.");
      });
  })
  .catch((error) => {
    alert("Login failed: " + error.message);
    console.error("Error:", error.code, error.message);
  });
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return firebase.firestore().collection("users").doc(user.uid).set({
      email: email,
      username: username,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  });

