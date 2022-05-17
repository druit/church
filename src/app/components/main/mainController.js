app.controller('mainController', ['$scope', '$timeout', 'Upload', '$sce', 'mapService', function($scope, $timeout, Upload, $sce, mapService) {

    $scope.sex = "male";
    $scope.office = "vevaiwsi";
    $scope.pathFile = "assets/word_office/alagmeno.docx";
    $scope.firstname = "";
    $scope.lastname = "";
    $scope.secondname = "";
    $scope.yearMarried = "";
    $scope.SelectedFile;
    $scope.index = 0;
    $scope.dataLength = 0;
    var findPerson;
    var findPersons = new Array();

    $scope.SelectFile = function(file) {
        $scope.SelectedFile = file;
        // console.log(file)
    };

    $scope.UploadFiles = function() {
        // if ($scope.SelectedFiles && $scope.SelectedFiles.length) {
        //     Upload.upload({
        //         url: '/',
        //         data: { files: $scope.SelectedFiles }
        //     }).then(function (response) {
        //         $timeout(function () {
        //             $scope.Test = response.data;
        //             $scope.Result = $sce.trustAsHtml($scope.Test);
        //         });
        //     }, function (response) {
        //         if (response.status > 0) {
        //             var errorMsg = response.status + ': ' + response.data;
        //             alert(errorMsg);
        //         }
        //     });
        // }
        // loadFile(files);
        $scope.gettext();
    };

    function loadFile(url, callback) {
        PizZipUtils.getBinaryContent(url, callback);
    }

    $scope.gettext = function() {
        loadFile(
            $scope.pathFile,
            function(error, content) {
                if (error) {
                    throw error;
                }
                var zip = new PizZip(content);
                var doc = new window.docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                // render the document
                // (replace all occurences of {first_name} by John, {last_name} by Doe)
                if (findPerson) {
                    doc.render({
                        age_1: findPerson.age_1,
                        age_2: findPerson.age_2,
                        book_number: findPerson.book_number,
                        bridesmaid: findPerson.bridesmaid,
                        currentYear: findPerson.currentYear,
                        date: findPerson.date,
                        date_married: findPerson.date_married,
                        firstname_1: findPerson.firstname_1,
                        firstname_2: findPerson.firstname_2,
                        id_number: findPerson.id_number,
                        lastname_1: findPerson.lastname_1,
                        lastname_2: findPerson.lastname_2,
                        month_married: findPerson.month_married,
                        place: findPerson.place,
                        responsible: findPerson.responsible,
                        secondname_1: findPerson.secondname_1,
                        secondname_2: findPerson.secondname_2,
                        type_1: findPerson.type_1,
                        type_2: findPerson.type_2,
                        year_married: findPerson.year_married,
                    });

                    var out = doc.getZip().generate({
                        type: "blob",
                        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    });
                    // Output the document using Data-URI
                    saveAs(out, "ΒΕΒΑΙΩΣΗ.docx");
                } else {
                    window.alert("Παρακαλώ επιλέξτε EXCEL Αρχείο");
                }
            }
        );
        // loadFile(file, function (err, content) {
        //     console.log(content)
        //     var doc = new DocxGen(content);
        //     doc.setData({
        //         "number": "Hipp"
        //     }
        //     ); //set the templateVariables
        //     doc.render(); //apply them (replace all occurences of {first_name} by Hipp, ...)
        //     var out = doc.getZip().generate({ type: "blob" }); //Output the document using Data-URI
        //     saveAs(out, "output.docx");
        // })
    }

    $scope.changeOffice = function(office) {
        // console.log("AA", office)
        if (office == "vevaiwsi") {
            $scope.pathFile = "assets/word_office/alagmeno.docx";
        } else {
            //to do
        }
    }


    $scope.search = function(sex, name) {
        if (typeof(FileReader) != "undefined" && $scope.SelectedFile) {
            var reader = new FileReader();
            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function(e) {
                    $scope.ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString($scope.SelectedFile);
            } else {
                //For IE Browser.
                reader.onload = function(e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    $scope.ProcessExcel(data);
                };
                reader.readAsArrayBuffer($scope.SelectedFile);
            }
        } else {
            window.alert("Παρακαλώ επιλέξτε EXCEL Αρχείο");
            // window.alert("This browser does not support HTML5.");
        }
    };


    // get data EXCEL
    $scope.ProcessExcel = function(data) {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        // console.log(workbook)
        //Fetch the name of First Sheet.
        var sheets = _.map(workbook.SheetNames, function(book, i) {
            return workbook.SheetNames[i];
        });
        //Read all rows from First Sheet into an JSON array.
        var excelRows = [];
        sheets.forEach(sheet => {
            if (XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]).length > 0)
                excelRows.push(XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]))
        });
        var cells = excelRows.map(function(cell) {
            return mapService.getOnlyData(cell);
        })
        var madeOne = [];
        cells.forEach(function(cell) {
            cell.map(function(obj) {
                madeOne.push(obj);
            });
        });
        var mapObj = madeOne.map(function(obj) {
            return mapService.getPerson(obj);
        });

        console.log(mapObj);
        if ($scope.firstname !== "" && $scope.lastname !== "" && $scope.secondname !== "" && $scope.yearMarried !== "") {
            findPersons = [];
            var firstTime = true;
            mapObj.map(function(data) {
                if ((data.firstname_1 == $scope.firstname || data.firstname_2 == $scope.firstname) && (data.lastname_1 == $scope.lastname || data.lastname_2 == $scope.lastname) && ($scope.secondname == data.secondname_full_1 || $scope.secondname == data.secondname_full_2) && $scope.yearMarried == data.year_married) {
                    if (firstTime) {
                        findPerson = data;
                        $scope.displayFindPerson = data;
                        console.log(findPerson);
                        $scope.index = 0;
                        firstTime = false;
                    }
                    findPersons.push(data);
                    $scope.dataLength++;
                }
            });
            console.log(findPersons)
        } else {
            window.alert("Συμπληρώστε τα πεδία σωστά");
        }


        //Display the data from Excel file in Table.
        $scope.$apply(function() {
            $scope.Customers = mapObj;
            $scope.IsVisible = true;
        });
    };

    $scope.previous = function() {
        if ($scope.index == 0) return;
        $scope.index--;
        $scope.displayFindPerson = findPerson = findPersons[$scope.index];

    };

    $scope.next = function() {
        if ($scope.index == $scope.dataLength - 1) return;
        $scope.index++;
        $scope.displayFindPerson = findPerson = findPersons[$scope.index];
    }

}]);