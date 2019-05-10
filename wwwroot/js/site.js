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
    indexName = [...rows[0].cells].find(x => x.textContent == "Login").cellIndex;
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

var areaDrop = document.querySelector('#input-drop');
if (areaDrop) {

  areaDrop.addEventListener('dragenter', function (event) {
    event.preventDefault();
    var element = document.querySelector('.container.white.p-3.shadow');
  });

  areaDrop.addEventListener('dragover', function (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  })

  areaDrop.addEventListener('drop', function (event) {
    event.preventDefault();
    var file = event.dataTransfer.files[0];
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.addEventListener('loadend', function (event) {

      try {
        let lines = event.target.result.split('\n');
        var array = new Array();
        lines.forEach(x => {
          var string = x.split(' ');
          var json = {
            id: 0,
            login: string[0].split(':')[1].trim(),
            pwd: string[1].split(':')[1].trim(),
            descricao: string[2].split(':')[1].trim(),
          }
          array.push(json);
        });
      } catch{
        alert('Erro ao ler arquivo.');
        return;
      }

      fetch('/api/Upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(array)
      }).then((value) => {
        window.location.href = "/";
      }).catch((err) => {
        alert(err);
      })

    });

  });

  areaDrop.addEventListener('dragleave', function (event) {
    event.preventDefault();
  });
}