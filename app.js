let selectedEquipment = "";
let rating = 0;

const cards = document.querySelectorAll(".card");
const stars = document.querySelectorAll(".stars span");
const submit = document.getElementById("submit");
const reviewText = document.getElementById("review");
const imageInput = document.getElementById("images");

// Track selected equipment
cards.forEach(card => {
  card.onclick = () => {
    cards.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedEquipment = card.dataset.eq;
  };
});

// Track star rating
stars.forEach(star => {
  star.onclick = () => {
    rating = Number(star.dataset.star);
    stars.forEach(s => s.classList.remove("active"));
    for (let i = 0; i < rating; i++) stars[i].classList.add("active");
  };
});

// Submit review
submit.onclick = () => {
  const text = reviewText.value.trim();
  const files = imageInput.files;
  const username = localStorage.getItem("currentUser") || "Anonymous";

  if (!selectedEquipment || !rating) {
    alert("Please select equipment and rating!");
    return;
  }

  // Read images if any
  const readerPromises = [...files].map(f => new Promise(res => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.readAsDataURL(f);
  }));

  Promise.all(readerPromises).then(images => {
    const review = {
      user: username,
      equipment: selectedEquipment,
      rating,
      text,
      images: images || [],
      date: new Date().toLocaleString()
    };

    const data = JSON.parse(localStorage.getItem("reviews") || "[]");
    data.push(review);
    localStorage.setItem("reviews", JSON.stringify(data));

    alert("Review saved successfully!");

    // Reset form
    cards.forEach(c => c.classList.remove("selected"));
    stars.forEach(s => s.classList.remove("active"));
    reviewText.value = "";
    imageInput.value = "";
    selectedEquipment = "";
    rating = 0;
  });
};