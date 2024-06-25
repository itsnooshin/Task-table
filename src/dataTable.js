$(function () {
  $.ajax({
    type: "GET",
    url: "https://dummyjson.com/user",

    success: function (data) {
      console.log("success", data);
    },
  });
});
