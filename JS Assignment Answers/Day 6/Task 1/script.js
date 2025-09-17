const employees = [
  {
    name: "Airi Satou",
    position: "Accountant",
    office: "Tokyo",
    age: 33,
    startDate: "2008/11/28",
  },
  {
    name: "Angelica Ramos",
    position: "Chief Executive Officer (CEO)",
    office: "London",
    age: 47,
    startDate: "2009/10/09",
  },
  {
    name: "Ashton Cox",
    position: "Junior Technical Author",
    office: "San Francisco",
    age: 66,
    startDate: "2009/01/12",
  },
  {
    name: "Bradley Greer",
    position: "Software Engineer",
    office: "London",
    age: 41,
    startDate: "2012/10/13",
  },
  {
    name: "Brenden Wagner",
    position: "Software Engineer",
    office: "San Francisco",
    age: 28,
    startDate: "2011/06/07",
  },
  {
    name: "Brielle Williamson",
    position: "Integration Specialist",
    office: "New York",
    age: 61,
    startDate: "2012/12/02",
  },
  {
    name: "Bruno Nash",
    position: "Software Engineer",
    office: "London",
    age: 38,
    startDate: "2011/05/03",
  },
  {
    name: "Caesar Vance",
    position: "Pre-Sales Support",
    office: "New York",
    age: 21,
    startDate: "2011/12/12",
  },
  {
    name: "Cara Stevens",
    position: "Sales Assistant",
    office: "New York",
    age: 46,
    startDate: "2011/12/06",
  },
  {
    name: "Cedric Kelly",
    position: "Senior Javascript Developer",
    office: "Edinburgh",
    age: 22,
    startDate: "2012/03/29",
  },
];

const tableBody = document.querySelector("#employee-table tbody");
const headers = document.querySelectorAll("#employee-table th");
let sortKey = null;
let ascending = true;

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((e) => {
    const row = `<tr>
      <td>${e.name}</td>
      <td>${e.position}</td>
      <td>${e.office}</td>
      <td>${e.age}</td>
      <td>${e.startDate}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

function sortTable(key) {
  if (sortKey === key) {
    ascending = !ascending;
  } else {
    sortKey = key;
    ascending = true;
  }
  employees.sort((a, b) => {
    let valA = a[key];
    let valB = b[key];
    if (key === "age") {
      valA = Number(valA);
      valB = Number(valB);
    } else if (key === "startDate") {
      valA = new Date(valA);
      valB = new Date(valB);
    } else {
      valA = valA.toString().toLowerCase();
      valB = valB.toString().toLowerCase();
    }
    if (valA < valB) return ascending ? -1 : 1;
    if (valA > valB) return ascending ? 1 : -1;
    return 0;
  });
  renderTable(employees);
}

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const key = header.dataset.sort;
    if (key) sortTable(key);
  });
});

window.onload = () => renderTable(employees);
