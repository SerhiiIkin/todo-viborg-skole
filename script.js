const btn = document.querySelector(".todo__btn");
const form = document.querySelector(".data-writte-wrapper");
const input = form.querySelector("input[name=name]");
const textarea = form.querySelector("textarea[name=description]");
const checkbox = form.querySelector("input");

let todoArray = [
    {
        id: 1,
        title: "Hunden",
        description: "Gå tur med hunden",
        completed: false,
    },
    {
        id: 2,
        title: "Hjemme arbejde",
        description: "Vaske vinduer",
        completed: false,
    },
    {
        id: 3,
        title: "Hjemme arbejde",
        description: "Vaske tøj",
        completed: false,
    },
    {
        id: 4,
        title: "Snak",
        description: "Ringe til farmor",
        completed: false,
    },
];

let favoriteTodo = [];

function templateTodo(item) {
    return `
    <div class="flex gap-10">
        <button type="button" class="btn-favorite">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
        </button>
        <details class="w-full" data-index="${item.id}">
            <summary>
                ${item.title}
                <span><span/>
            </summary>
            <div class="items__container">
                <input type="checkbox"cheked=${item.completed} >
                <p class="listItem animate__animated"> ${item.description}</p>
                <button class="removeBtn"> <i class="bi bi-trash item__remove"></i> </button>
            </div>
        </details>
    </div>
    `;
}

function renderList() {
    const output = document.querySelector(".accordion__content");
    const isFavorite = false;

    output.replaceChildren();

    todoArray.forEach((item) => {
        output.insertAdjacentHTML("beforeend", templateTodo(item));
    });

    const inputsCheckboxes = output.querySelectorAll("input[type=checkbox]");
    const btnsFavorite = output.querySelectorAll(".btn-favorite");
    const removeBtns = output.querySelectorAll(".item__remove");
    const details = output.querySelectorAll("details");

    btnsFavorite.forEach((btn) => {
        btn.classList.remove("favorite");
        btn.addEventListener("click", (e) => onFavoriteBtnClick(e, isFavorite));
    });

    removeBtns.forEach((btn) =>
        btn.addEventListener("click", (e) => onBtnRemoveCLick(e, isFavorite))
    );

    inputsCheckboxes.forEach((input) =>
        input.addEventListener("change", onInputChange)
    );

    details.forEach((detail) => {
        detail.addEventListener("click", (e) => {
            if (
                e.target.localName === "summary" ||
                e.target.localName === "span"
            ) {
                const itemContainer = e.target.closest("details");
                const span = itemContainer.querySelector("span");
                span.classList.toggle("active");
            }
        });
    });
}

function renderFavoriteTodos() {
    const isFavorite = true;
    const favoriteTodoContainer = document.querySelector(".favorite-todo");

    favoriteTodoContainer.replaceChildren();
    favoriteTodo.forEach((todo) => {
        favoriteTodoContainer.insertAdjacentHTML(
            "beforeend",
            templateTodo(todo)
        );
    });

    const inputsCheckboxes = favoriteTodoContainer.querySelectorAll("input[type=checkbox]");
    const btnsFavorite = favoriteTodoContainer.querySelectorAll(".btn-favorite");
    const removeBtns = favoriteTodoContainer.querySelectorAll(".item__remove");
    const details = favoriteTodoContainer.querySelectorAll("details");

    btnsFavorite.forEach((btn) => {
        btn.classList.add("favorite");
        btn.addEventListener("click", (e) => onFavoriteBtnClick(e, isFavorite));
    });

    removeBtns.forEach((btn) =>
        btn.addEventListener("click", (e) => onBtnRemoveCLick(e, isFavorite))
    );

    inputsCheckboxes.forEach((input) =>
        input.addEventListener("change", onInputChange)
    );

    details.forEach((detail) => {
        detail.addEventListener("click", (e) => {
            if (
                e.target.localName === "summary" ||
                e.target.localName === "span"
            ) {
                const itemContainer = e.target.closest("details");
                const span = itemContainer.querySelector("span");
                span.classList.toggle("active");
            }
        });
    });
}

renderList();

form.addEventListener("submit", submitHandler);

function submitHandler(event) {
    event.preventDefault();
    if (!input.value || !textarea.value) return;
    const newTodo = {
        id: todoArray.length + 1,
        title: input.value,
        description: textarea.value,
        completed: checkbox.checked,
    };

    todoArray.push(newTodo);

    renderList();
    input.value = "";
    textarea.value = "";
    checkbox.checked = false;
}

function onFavoriteBtnClick(e, isFavorite) {
    const cardIndex = e.target.closest("div").querySelector("details")
        .dataset.index;

    if (isFavorite) {
        const selectedTodo = favoriteTodo.find(
            (todo) => todo.id === +cardIndex
        );
        favoriteTodo = favoriteTodo.filter((todo) => todo.id !== +cardIndex);
        todoArray.push(selectedTodo);
        renderList();
        renderFavoriteTodos();
    } else {
        const selectedTodo = todoArray.find((todo) => todo.id === +cardIndex);
        todoArray = todoArray.filter((todo) => todo.id !== +cardIndex);
        favoriteTodo.push(selectedTodo);
        renderList();
        renderFavoriteTodos();
    }
}

function onBtnRemoveCLick(e, isFavorite) {
    const itemContainer = e.target.closest("details");
    const index = parseInt(itemContainer.getAttribute("data-index"));
    if (isFavorite) {
        favoriteTodo = favoriteTodo.filter((todo) => todo.id !== index);
    } else {
        todoArray = todoArray.filter((todo) => todo.id != index);
    }
    isFavorite ? renderFavoriteTodos() : renderList();
}

function onInputChange(e) {
    const itemContainer = e.target.closest("details");
    const listItem = itemContainer.querySelector(".listItem");
    listItem.classList.toggle("done");
}
