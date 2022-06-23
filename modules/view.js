export class View {
	constructor() {
		this.app = document.getElementById('app');
		// Заголвок
		this.title = this.createElement('h1', 'title');
		this.title.textContent = 'GitHub Searche Users';

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
		this.main = this.createElement('div', 'main');
		this.main.append(this.usersWrapper);

		this.loadMoreBtn = this.createElement('buttom', 'btn');
		this.loadMoreBtn.textContent = 'Загрузить ещё';
		this.loadMoreBtn.style.display = 'none';
		this.usersWrapper.append(this.loadMoreBtn);

		this.app.append(this.title);
		this.app.append(this.searchLine);
		this.app.append(this.main);
	}
	// Функция для создания элемента с классом
	createElement(elemetTag, elementClass) {
		const element = document.createElement(elemetTag);
		if (elementClass) {
			element.classList.add(elementClass);
		}
		return element;
	}

	createUser(userData) {
		const userElement = this.createElement('li', 'user-prev');
		userElement.innerHTML = `<img class="user-prev-photo" src="${userData.avatar_url}" alt="${userData.login}">
															<span class="user-prev-name">${userData.login}</span>`;
		this.usersList.append(userElement);
	}
	toogleLoadMoreBtn(show) {
		this.loadMoreBtn.style.display = show ? 'block' : none;
	}
}
