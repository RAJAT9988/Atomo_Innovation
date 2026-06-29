(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const statusEl = document.getElementById("contact-status");
  const interest = document.getElementById("interest");
  const defaultInterest = form.dataset.defaultInterest || "general";
  if (interest) interest.value = defaultInterest;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    statusEl.classList.add("hidden");
    statusEl.classList.remove("bg-muted-light", "border-red-200", "bg-red-50", "text-red-800", "text-dark-text");

    const data = Object.fromEntries(new FormData(form).entries());
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json().catch(function () {
        return null;
      });
      if (!response.ok) throw new Error((payload && payload.error) || "Unable to send message.");
      statusEl.textContent = "Thank you — your message has been received. The Atomo team will respond shortly.";
      statusEl.classList.remove("hidden");
      statusEl.classList.add("bg-muted-light", "text-dark-text");
      form.reset();
      if (interest) interest.value = defaultInterest;
    } catch (error) {
      statusEl.textContent = error.message || "Something went wrong.";
      statusEl.classList.remove("hidden");
      statusEl.classList.add("border", "border-red-200", "bg-red-50", "text-red-800");
      statusEl.setAttribute("role", "alert");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send message";
    }
  });
})();
