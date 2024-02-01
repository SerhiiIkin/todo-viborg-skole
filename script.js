const output = document.querySelector(".accordion__content");
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

const renderList = () => {
    output.innerHTML = "";
    todoArray.forEach((item) => {
        output.innerHTML += `
        <details data-index="${item.id}">
            <summary>
                ${item.title}
                <span><span/>
            </summary>
            <div class="items__container">
                <input type="checkbox"cheked=${item.completed} >
                <p class="listItem animate__animated"> ${item.description}</p>
                <button className="removeBtn"> <i class="bi bi-trash item__remove"></i> </button>
            </div>
        </details>
        `;
    });

    const removeBtns = document.querySelectorAll(".item__remove");

    removeBtns.forEach((item) =>
        item.addEventListener("click", onBtnRemoveCLick)
    );

    const inputsCheckbox = document.querySelectorAll(
        ".accordion__content input[type=checkbox]"
    );

    inputsCheckbox.forEach((input) =>
        input.addEventListener("change", onInputChange)
    );
};

renderList();

form.addEventListener("submit", submitHander);

function submitHander(event) {
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

function onBtnRemoveCLick(e) {
    const itemContainer = e.target.closest("details");
    const index = parseInt(itemContainer.getAttribute("data-index"));

    todoArray = todoArray.filter((todo, i) => todo.id != index);
    renderList();
}

function onInputChange(e) {
    const itemContainer = e.target.closest("details");
    const listItem = itemContainer.querySelector(".listItem");
    listItem.classList.toggle("done");
}

const details = document.querySelectorAll("details");

details.forEach((detail) => {
    detail.addEventListener("click", (e) => {
        if (e.target.localName === "summary" || e.target.localName === "span") {
            const itemContainer = e.target.closest("details");
            const span = itemContainer.querySelector("span");
            span.classList.toggle("active");
        }
    });
});
