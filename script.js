const countrySelect = document.getElementById("country-code");

fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    const countries = data
      .filter(c => c.idd && c.idd.root && c.idd.suffixes && c.idd.suffixes.length > 0)
      .map(c => ({
        name: c.name.common,
        dialCode: `${c.idd.root.replace("+", "")}${c.idd.suffixes[0]}`,
        emoji: c.flag || ""
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = `+${country.dialCode}`;
      option.textContent = `${country.emoji} +${country.dialCode} (${country.name})`;
      if (country.name === "India") {
        option.selected = true;
      }
      countrySelect.appendChild(option);
    });
  })
  .catch(err => {
    console.error("Failed to load countries:", err);
  });
