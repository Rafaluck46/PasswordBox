// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
var table = document.querySelector('table');
var input = document.querySelector('#searchInput');
if (input) {
  input.addEventListener('input', function (event) {

    [...table.rows].forEach(x => {
      debugger;
      x.classList.remove('invisible-search');
      x.classList.add('visible-search');
    });

    var rows = table.querySelectorAll('tr');
    var indexName = 0;
    var idexPassword = 0;
    indexName = [...rows[0].cells].find(x => x.textContent == "Nome").cellIndex;
    indexPassword = [...rows[0].cells].find(x => x.textContent == "Senha").cellIndex;

    rows.forEach(row => {

      debugger;
      if (row.rowIndex == 0) return;
      let rowcellName = row.cells[indexName].textContent.toLocaleLowerCase();
      let rowCellPass = row.cells[indexPassword].textContent.toLocaleLowerCase();
      if (rowcellName.includes(event.target.value.toLocaleLowerCase()) || rowCellPass.includes(event.target.value.toLocaleLowerCase())) {
        row.classList.add('visible-search');
      } else {
        row.classList.add('invisible-search');
      }
    });

  });
}

document.querySelector('#input-drop').addEventListener('dragenter', function (event) {
  event.preventDefault();
  var element = document.querySelector('.container.white.p-3.shadow');
});

document.querySelector('#input-drop').addEventListener('dragover', function (event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
})

document.querySelector('#input-drop').addEventListener('drop', function (event) {
  event.preventDefault();
  debugger;
  var data = event.dataTransfer.files;
  debugger;
  fetch('/api/Upload',{
    method:'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: data[0]
  })
  alert(data);
});

document.querySelector('#input-drop').addEventListener('dragleave', function (event) {
  event.preventDefault();
})