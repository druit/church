app.service('mapService', ["$timeout", "$translate", function($timeout, $translate) {

    return {
        getOnlyData: function(data) {
            var obj = [];
            data.forEach((cell, i) => {
                if (i > 2) {
                    obj.push(cell);
                }
            });
            return obj
        },
        getPerson: function(data) {
            var t = Object.keys(data);
            var currentDate = this.getDate(new Date);
            var secondNames = this.getSecondName(data[t[10]], data[t[16]]);
            var responsible = this.getResponsible(data[t[23]]);
            var bridesmaid = this.getBridesmaid(data[t[21]]);
            var month = this.getMonth(data[t[7]]);
            return {
                book_number: data[t[0]],
                date: currentDate,
                id_number: data[t[1]],
                firstname_1: data[t[9]],
                secondname_1: secondNames[0],
                secondname_full_1: data[t[10]],
                lastname_1: data[t[11]],
                age_1: data[t[12]],
                firstname_2: data[t[15]],
                secondname_full_2: data[t[16]],
                secondname_2: secondNames[1],
                lastname_2: data[t[17]],
                age_2: data[t[18]],
                type_1: data[t[13]],
                type_2: data[t[19]],
                date_married: data[t[8]] + "η",
                month_married: month,
                year_married: data[t[6]],
                responsible: responsible,
                bridesmaid: bridesmaid,
                bridesmaidfull: data[t[21]],
                place_1: data[t[14]],
                place_2: data[t[20]],
                place: data[t[22]],
                currentYear: (new Date).getFullYear()
            }
        },
        getDate: function(date) {
            console.log()
            var month = (date.getMonth() + 1);
            return date.getDate() + "/" + (month.toString().length == 1 ? '0' + month.toString() : (date.getMonth() + 1)) + "/" + date.getFullYear();
        },
        getSecondName: function(name1, name2) {
            var names = [];
            //1st
            if (name1[name1.length - 2] == "Ο") {
                names.push(name1.slice(0, (name1.length - 1)) + "Υ");
            } else if (name1[name1.length - 2] == "Η" && name1[name1.length - 1] == "Σ") {
                names.push(name1.slice(0, (name1.length - 1)))
            } else if (name1[name1.length - 2] == "Η") {
                names.push(name1);
            }
            // 2nd
            if (name2[name2.length - 2] == "Ο") {
                names.push(name2.slice(0, (name2.length - 1)) + "Υ");
            } else if (name2[name2.length - 2] == "Η" && name2[name2.length - 1] == "Σ") {
                names.push(name2.slice(0, (name2.length - 1)));
            } else if (name1[name1.length - 2] == "Η") {
                names.push(name2);
            }

            return names;
        },
        getMonth: function(month) {
            return month.slice(0, month.length - 1) + "Υ";
        },
        getResponsible: function(fullName) {
            console.log(fullName)
            var obj = fullName.split(' ');
            if (obj[0] != 'Π.') {
                fullName = fullName.replace('Π.', 'Π. ');
                obj = fullName.split(' ');
            }
            var firstname = obj[1];
            var lastname = obj[2];
            if (firstname[firstname.length - 2] == "Ο") {
                firstname = firstname.slice(0, firstname.length - 1) + "Υ";
            } else if (firstname[firstname.length - 2] == "Η" && firstname[firstname.length - 1] == "Σ") {
                firstname = firstname.slice(0, (firstname.length - 1))
            }

            if (lastname[lastname.length - 2] == "Ο") {
                lastname = lastname.slice(0, lastname.length - 1) + "Υ";
            } else if (lastname[lastname.length - 2] == "Η" && lastname[lastname.length - 1] == "Σ") {
                lastname = lastname.slice(0, (lastname.length - 1))
            }
            return obj[0] + " " + firstname + " " + lastname;
        },
        getBridesmaid: function(fullName) {
            var obj = fullName.split(' ');
            var firstname = obj[0];
            var lastname = obj[1];
            if (firstname[firstname.length - 2] == "Ο") {
                firstname = firstname.slice(0, firstname.length - 1) + "Υ";
            } else if (firstname[firstname.length - 2] == "Η" && firstname[firstname.length - 1] == "Σ") {
                firstname = firstname.slice(0, (firstname.length - 1))
            }

            if (lastname[lastname.length - 2] == "Ο") {
                lastname = lastname.slice(0, lastname.length - 1) + "Υ";
            } else if (lastname[lastname.length - 2] == ("Η") && lastname[lastname.length - 1] == "Σ") {
                lastname = lastname.slice(0, (lastname.length - 1));
            } else if (lastname[lastname.length - 2] == ("Α") && lastname[lastname.length - 1] == "Σ") {
                lastname = lastname.slice(0, (lastname.length - 1));
            }
            return firstname + " " + lastname;
        }

    }
}]);