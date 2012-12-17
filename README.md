Factorial
=========

## Api

    var factorial = require('factorail');


Сначала нужно добавить факторы в систему

    factorial.factor('./some/path');            // подгружается указанный файл и из него извлекаются факторы
    factorial.factor(f1, f2, f3);               // факторы через запятую
    factorial.factor([f1, f2, f3]);             // массив факторов

Затем объявить формулу и указать, какие факторы она будет использовать

    factorial.formula('forname', [facname1, facname2, facname3])

Затем формулу можно использовать

    factorial.run('forname', data, conditions)
