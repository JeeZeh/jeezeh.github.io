function calculateAvg() {
    var table = document.getElementById("table-results");
    var unsubmitted = 0;
    for (var i = 1, row; row = table.rows[i]; i++) {
        var rowTotal = 0;
        var entries = 0;
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (j > 1 && col.innerText !== "%" && col.innerText !== ' %' && col.className === "table-result") {
                if (col.innerText.length > 0) {
                    if (!isNaN(parseInt(col.innerText)) && !hasLetters(col.innerText)) {
                        if(parseInt(col.innerText) > 100)
                            col.innerHTML = "<span class=\"entry\" contenteditable=\"true\" placeholder=\"-\">100</span><span class=\"percent-padding\"></span>%";
                        if(parseInt(col.innerText) < 0)
                            col.innerHTML = "<span class=\"entry\" contenteditable=\"true\" placeholder=\"-\">0</span><span class=\"percent-padding\"></span>%";
                        rowTotal = rowTotal + parseFloat(col.innerText.slice(0, -1));
                        entries += 1;
                    }
                    else{
                        col.innerHTML = "<span class=\"entry\" contenteditable=\"true\" placeholder=\"-\"></span><span class=\"percent-padding\"></span>%";
                        unsubmitted += 1;
                    }
                }
            }
            else if (col.className === "table-result" && (col.innerText === "%" || col.innerText === "" || col.innerText === " "))
                unsubmitted += 1;
            if ((col.innerText === "-%" || col.innerText === '%') && col.className === "table-result") {
                col.style.backgroundColor = "#fff7c7";
            }
            else if (col.className === "table-result") {
                if (i % 2 === 0)
                    col.style.backgroundColor = "#f9f9f9";
                else {
                    col.style.backgroundColor = "#fefefe";
                }
            }

            if (col.className === "table-final-grade") {
                var mean = 0;
                mean = Math.round(rowTotal / 5);
                col.innerText = mean.toString() + "%";
                if (mean < 40) {
                    col.style.backgroundColor = "#de8a82";
                    col.style.color = "white";
                }
                else {
                    if (i % 2 === 0)
                        col.style.backgroundColor = "#f9f9f9";
                    else {
                        col.style.backgroundColor = "#fefefe";
                    }
                    col.style.color = "black";
                }
            }
        }
    }
    document.getElementById("submitted-assignments").innerText = unsubmitted.toString();
}

function fillCSV() {
    var output = "";
    var table = document.getElementById("table-results");
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (col.innerText === "%")
                output += "-";
            else
                output += col.innerText;

            if (j !== row.cells.length - 1)
                output += ",";
        }
        if (i !== table.rows.length - 1)
            output += "\n";
    }
    document.getElementById("csv-box").value = output;
}

function hasLetters(str){
    return str.match(/[a-z]/i);
}
