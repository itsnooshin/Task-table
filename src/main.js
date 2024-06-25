$(function () {
  let currentPage = 1;
  let totalItems = 0;
  let totalPages = 0;
  let eachPage = 10;
  let errorMessage = "";
  let data = [];

  function renderTable(page) {
    let start = (page - 1) * eachPage;
    let end = start + eachPage;
    let DataPagination = data.slice(start, end);

    let tab = "";
    DataPagination.forEach((user) => {
      tab += `
        <tr>
          <td class="td border-0 tablenum">${user.id}</td>
          <td class="td border-0">${user.fullName}</td>
          <td class="td border-0">${user.position}</td>
          <td class="td border-0">${user.birthYear}</td>
          <td class="td border-0">${user.trainingChannel}</td>
          <td class="td border-0">
            <div class="tablestate">
              <div>${user.reviewStatus}</div>
            </div>
          </td>
          <td class="tabledetail border-0">
            <div class="tabledetailimg">
              <a href="FunctionalFormadd.html" class="tdimg">
                <img src="./public/images/showicon.svg" alt="showicon.svg" />
              </a>
              <a href="FunctionalFormadd.html" class="tdimg">
                <img src="./public/images/edit.svg" alt="edit.svg" />
              </a>
              <div data-toggle="modal" data-target="#my-modal" class="tdimg">
                <img src="./public/images/delete.svg" alt="delete.svg" />
              </div>
            </div>
          </td>
        </tr>
      `;
    });

    $("#tableBody").html(tab);

    if (currentPage === 1) {
      $("#prevPage").addClass("disabled");
    } else {
      $("#prevPage").removeClass("disabled");
    }

    if (currentPage === totalPages) {
      $("#nextPage").addClass("disabled");
    } else {
      $("#nextPage").removeClass("disabled");
    }

    $("#selectOptions").change(function () {
      eachPage = parseInt($(this).val());
      currentPage = 1;
      totalPages = Math.ceil(totalItems / eachPage);
      renderTable(currentPage);
    });
  }

  function fetchData() {
    $.ajax({
      type: "GET",
      url: "https://mocki.io/v1/85334191-f26c-4a8f-a04b-98451d38fc1b",
      success: function (response) {
        data = response;
        totalItems = data.length;
        totalPages = Math.ceil(totalItems / eachPage);
        $("#totalCount").html(totalItems);
        renderTable(currentPage);
      },
      error: function (error) {
        errorMessage = `Error Fetching Data:${error}`;
      },
    });
  }

  $("#nextPage").click(function (e) {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderTable(currentPage);
    }
  });

  $("#prevPage").click(function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderTable(currentPage);
    }
  });

  //   add search input
  $("#searchInput").on("keyup", function (e) {
    let character = $(this).val().toLowerCase();
    $("#tableBody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(character) > -1);
    });
  });

  fetchData();
});
