export class View {
	constructor(api) {
		this.app = document.getElementById('app');
		this.api = api;

		// Заголвок
		this.title = this.createElement('h1', 'title');
		this.title.textContent = 'Поиск пользователей GitHub';

		// Поле поиска
		this.searchLine = this.createElement('div', 'search-line');
		this.searchInput = this.createElement('input', 'search-input');
		this.searchCounter = this.createElement('span', 'counter');
		this.searchLine.append(this.searchInput);
		this.searchLine.append(this.searchCounter);


		// Список пользователей
		this.usersWrapper = this.createElement('div', 'users-wrapper');
		this.usersList = this.createElement('ul', 'users');
		this.usersWrapper.append(this.usersList);

		// Основной блок
		this.mainContent = this.createElement('div', 'main');


		this.loadMoreBtn = this.createElement('buttom', 'btn');
		this.loadMoreBtn.textContent = 'Загрузить ещё';
		this.loadMoreBtn.style.display = 'none';
		this.usersWrapper.append(this.loadMoreBtn);

		this.app.append(this.title);
		this.app.append(this.searchLine);
		this.mainContent.append(this.usersWrapper);
		this.app.append(this.mainContent);
	}
	// Функция для создания элемента с классом
	createElement(elemetTag, elementClass) {
		const element = document.createElement(elemetTag);
		if (elementClass) {
			element.classList.add(elementClass);
		}
		return element;
	}

	toogleLoadMoreBtn(show) {
		this.loadMoreBtn.style.display = show ? 'block' : none;
	}

	setCounterMessage(message) {
		this.searchCounter.textContent = message;
	}


	// Создаем каждого найденного пользователя
	createUser(userData) {
		const user = this.createElement('li', 'user-prev');
		user.addEventListener('click', () => this.showUser(userData));
		user.innerHTML = `<img class="user-prev-photo" src="${userData.avatar_url}" alt="${userData.login}_photo">
                          <span class="user-prev-name">${userData.login}</span>`;
		this.usersList.append(user);
	}

	// Показываем данные выбранного пользователя
	showUser(userData) {
		const user = this.createElement('div', 'user');
		// const popupContainer = this.createElement('div', 'popup-container');
		// const popupInner = this.createElement('div', 'inner-container');
		// const popupHeader = this.createElement('div', 'header');
		// const popupContent = this.createElement('div', 'content');

		const userHtml = this.mainContent.querySelector('.user');
		const name = userData.login;
		this.api.loadUserData(name)
			.then(data => {
				const [following, followers, repos] = data;
				const followingHTML = this.getUserListHTML(following, 'Following');
				const followersHTML = this.getUserListHTML(followers, 'Followers');
				const reposHTML = this.getUserListHTML(repos, 'Repos');
				user.innerHTML = `<img src="${userData.avatar_url}">
                                  <h2 class="user-name">${name}</h2>
                                     ${followingHTML}
                                     ${followersHTML}
                                     ${reposHTML}`;
				if (userHtml) {
					userHtml.remove();
				}
				this.mainContent.append(user);
			});
	}

	// Получаем html списка в данных пользователя
	getUserListHTML(data, title) {
		return data.length ? `<div class="user-block">
                                  <h3 class="user-block-title">${title}</h3>
                                  <ul class="user-list">${this.templateItem(data)}</ul>
                              </div>`
			: '';
	}

	// Строим каждый элемент списка
	templateItem(data) {
		let userItem = '';
		data.forEach(user => {
			userItem += `<li class="user-list-item">
                            <a href="${user.html_url}" class="user-list-link">${user.login ? user.login : user.name}</a>
                          </li>`;
		});
		return userItem
	}

	// 	showPopup() {
	// 	popupContainer.style.visibility = "visible";
	// 	popupContainer.style.opacity = "1";
	// }

	// 	hidePopup() {
	// 	popupContainer.style.visibility = "hidden";
	// 	popupContainer.style.opacity = "0";
	// }

	// 	triggerBtn.onclick = (e) => {
	// 		showPopup();
	// 	}
	// 	popupContainer.onclick = (e) => {

	// 	if (e.target.attributes.getNamedItem("data-js") && e.target.attributes.getNamedItem("data-js").value == "popup") {
	// 		hidePopup();
	// 	}

	// };



	// Очистка найденных пользователей
	clearUsers() {
		this.usersList.innerHTML = '';
	}

}
