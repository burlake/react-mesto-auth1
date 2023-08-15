# Проект: <a href="https://burlake.github.io/mesto-react/" target="_blank">Место</a>🌍<h1>
## Проектная работа для курса "Яндекс Практикум".</h2>
### Используемые технологии:<h3>
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> </p>
<p align="left"> <a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> 
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
</p>



Что можно увидеть на сайте: 
- [x] классы по БЭМ
- [x] позиционирование
- [x] работа с текстом в HTML и CSS
- [x] работа с изображнениями и прозрачностью фона
- [x] flex-верстка
- [x] grid-верстка и выравнивание элементов
- [x] адаптивность и медиазапросы
- [x] работа в Figma
- [x] оформление README
- [X] Работа с JS
    - [x] сборка карточек в массив и работа с ними через JS
    - [x] открытие/закрытие попапов  по клику на "крестик", overlay и escape, а также обновление данныех на странице
    - [x] добавление карточек через попап, их удаление и Like карточки
    - [x] открытие попапа с картинкой по клику на изображение
    - [x] разработана валидацию всех форм и улучшение UX при работе с попапами для валидации
    - [x] первые попытки работы с JS
    - [x] настроены экспорты и импорты файлов
- [X] код переработан в соответствии с ООП и созданы классы Card, FormValidator, UserInfo.js , Section.js , Popup.js , PopupWithForm.js , PicturePopup.js в директории components
- [X] работа с Webpack

### РАБОТА ПЕРЕПИСЫВАЕТСЯ НА React
Пока переписала следуюшее части:
- [X] создала новый репозиторий mesto-react
- [м] открыла его с помощью react через терминал
- [X] конвертировала HTML размету в JSX что было интересно и не очень сложно
- [X] добавила CSS стили, с чем пришлось чуть повозиться, в целом не очень сложно
- [X] настроила работу попапов - работа однотипная, но с "0" конечно проблемно, а потом как по маслу пошло, даже решила выйти за рамки задания и сделать попап для карзины
- [X] портировала модуль API - шикарно - практически полнное копирование предыдущей работы, но с  Promise.all повозилась
- [X] подтянула данные пользователя используя стейт currentUser 
- [X] рализовала добавление лайка и дизлайков и удаления добавленой позьзователем карточки 
- [X] добавила возможность изменеия данных пользователя, а именно данные профайла с именем и профессией, аватара и загрузку карточек с названием
- [X] дополнительно предприняла попытку сделала валидацию форм, но с косяком конечно получилось (теоретически ошибку нашла, но практически не исправила:))
- [X] на будущее можно добавить красивый значек загрузки данных
- [X] написала авторизацию пользователя на сайте
На проект ушло много времени, особенно JS 🙈.