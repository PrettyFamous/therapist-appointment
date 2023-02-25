# Тестовое задание на стажировку в РЕЛЕКС

## Экран выбора роли

Возможность выбора оджной из двух ролей: пациент или администратор

## Форма записи на приём

Переход на экран осуществляется при выборе роли "пациент".
Проверка заполненности обязательных полей.
Валидация полей (телефон и email).
Email является необязательным полем.
При выборе заболевания "Другое", появляется дополнительное поле для описания заболевания (являестя обязательным для типа заболевания "другое").
Кнопка "Записаться" остаётся неактивнйо до момента успешног опрохождения всех проверок.

## Форма авторизации

Переход на экран осуществляется при выборе роли "администратор".
В поле логин допустимыми форматами строки являются телефон или email.
В моём стор-сервисе нет возможности генерации токенов, поэтому я сымитировал его получение (если логин и пароль соответствуют захардкоженым значениям, в localStorage кладется токен).

## Панель администратора

Все заявки сортируются по дате создания (от новых к старым)
Админимтратор может подтвердить или отклонить заявку.
После изменения статуса, заявка попадает в раздел "архивные".
Есть пагинация.
Сделал поиск, но, к сожалению, мой стор-сервис не позволяет фильтровать сразу по двум полям (по крайней мере в бесплатной версии), а поле status уже используется для фильтрации заявок по значению "NEW" и "ARCHIVE".
По нажатию на кнопку "выход" из localStorage удаляется токен, и происходит перенаправление на главную страницу.

## Другое

При попытке переместиться на несуществующий Route, посредством изменения URL, пользователю выведется экран "NotFound".
При попытке переместиться на панель администратора, посредством изменения URL, в случае отсутствия токена в localStorage, пользователю выведется экран "NotFound".
