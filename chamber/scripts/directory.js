document.addEventListener('DOMContentLoaded', () => {
  const directoryContainer = document.querySelector('.directory-main .list');
  const gridViewButton = document.getElementById('grid');
  const listViewButton = document.getElementById('list');
  let membersData = [];

  const fetchMembers = async () => {
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      membersData = data;
      displayMembers(membersData);
    } catch (error) {
      console.error('Error fetching the members:', error);
    }
  };

  const displayMembers = (members, viewType = 'grid') => {
    directoryContainer.innerHTML = '';
    members.forEach((member) => {
      const memberElement = document.createElement('div');
      memberElement.classList.add(viewType === 'grid' ? 'member-card' : 'member-list-item');
      if (viewType === 'grid') {
        memberElement.innerHTML = `
          <img src="${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}">Visit</a>
          <p>Membership Level: ${member.membershipLevel}</p>
          <p>${member.description}</p>
        `;
      } else {
        memberElement.innerHTML = `
          <h3>${member.name}</h3>
          <p>${member.phone}</p>
          <a href="${member.website}">Visit</a>
        `;
      }
      directoryContainer.appendChild(memberElement);
    });
  };

  gridViewButton.addEventListener('click', () => {
    displayMembers(membersData, 'grid');
  });

  listViewButton.addEventListener('click', () => {
    displayMembers(membersData, 'list');
  });

  fetchMembers();
});
