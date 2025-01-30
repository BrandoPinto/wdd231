document.addEventListener("DOMContentLoaded", () => {
  const directoryContainer = document.querySelector(".directory-main .list");
  const gridViewButton = document.getElementById("grid");
  const listViewButton = document.getElementById("list");
  let companiesData = [];

  const fetchCompanies = async () => {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error("Error fetching data.");
      const data = await response.json();
      companiesData = data;
      displayCompanies(companiesData);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const displayCompanies = (companies, viewType = "grid") => {
    directoryContainer.innerHTML = "";
    
    // Si la vista es lista, usamos un <ul> para el contenedor
    if (viewType === "list") {
      const ulElement = document.createElement("ul");
      ulElement.classList.add("company-list");
  
      companies.forEach((company) => {
        const liElement = document.createElement("li");
        liElement.classList.add("company-list-item");
        
        liElement.innerHTML = `
          <h3>${company.name}</h3>
          <p><strong>Address:</strong> ${company.address}</p>
          <p><strong>Phone:</strong> ${company.phone}</p>
          <a href="${company.website}" target="_blank">Visit Website</a>
          <p><strong>Membership Level:</strong> ${getMembershipLevel(company.membershipLevel)}</p>
        `;
        
        ulElement.appendChild(liElement);
      });
  
      directoryContainer.appendChild(ulElement);
    } else {
      // Código para la vista en grid, no cambia
      companies.forEach((company) => {
        const companyElement = document.createElement("div");
        companyElement.classList.add("company-card");
        companyElement.innerHTML = `
          <img src="${company.image}" alt="Logo of ${company.name}" loading="lazy">
          <h3>${company.name}</h3>
          <p><strong>Address:</strong> ${company.address}</p>
          <p><strong>Phone:</strong> ${company.phone}</p>
          <a href="${company.website}" target="_blank">Visit Website</a>
          <p><strong>Membership Level:</strong> ${getMembershipLevel(company.membershipLevel)}</p>
          <p>${company.description}</p>
        `;
        
        directoryContainer.appendChild(companyElement);
      });
    }
  };
  

  const getMembershipLevel = (level) => {
    switch (level) {
      case "1":
        return "Member";
      case "2":
        return "Silver";
      case "3":
        return "Gold";
      default:
        return "Unknown";
    }
  };

  gridViewButton.addEventListener("click", () => {
    displayCompanies(companiesData, "grid");
  });

  listViewButton.addEventListener("click", () => {
    displayCompanies(companiesData, "list");
  });

  fetchCompanies();
});
