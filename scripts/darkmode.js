  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const btn = document.querySelector("#dark-status");
  const currentTheme = localStorage.getItem("theme") || prefersDarkScheme;

  if (currentTheme == "dark") {
    document.body.classList.add("dark-theme");
  }

  btn.addEventListener("click", function() {
    document.body.classList.toggle("dark-theme");
    let theme = "light";
    if (document.body.classList.contains("dark-theme")) {
      theme = "dark";
    }
    localStorage.setItem("theme", theme);
  });