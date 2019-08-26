var image_delete = 0;
class CashTracker {

    constructor() {
        this.income = 0;
        this.expenses = 0;
        this.total = 0;
        this.expensesPercentage = 0;
        this.updateElement();
    }

    updateElement() {
        document.getElementById("total").innerHTML = this.total;
        document.getElementById("incomeTotal").innerHTML = this.income;
        document.getElementById("expensesTotal").innerHTML = this.expenses;
    }

    calculateTotal(additional_income, additional_expenses) {
        this.income = parseInt(additional_income) + parseInt(this.income)
        this.expenses = parseInt(additional_expenses) + parseInt(this.expenses)
        this.total = this.income - this.expenses
        if (this.income != 0) {
            this.expensesPercentage = (this.expenses / this.income * 100).toFixed(1)
        } else {
            this.expensesPercentage = 0
        }
        this.updateElement();
    }

    createElement(element, className, value, deleteImage=false, type=false) {
        if (!deleteImage) {
            var text = document.createTextNode(value);
            var element = document.createElement(element);
            element.className = className;
            element.appendChild(text);
            return element;
        } else {
            console.log(deleteImage);
            var element = document.createElement("td");
            element.className = "right";
            var image = document.createElement("img");
            image.className = className;
            image.src = "images/index.png";
            image.setAttribute('onclick', `cashTracker.deleteLine.call(${image_delete})`);
            element.appendChild(image)
            return element;
        }
    }

    addItem(type, description, amount) {
        if (description.value && amount.value && amount.value > 0) {
            let parentTable = ''
            if (type.value == 'income') {
                var opertationType = 'income'
                this.calculateTotal(amount.value, 0);
            } else {
                var opertationType = 'expenses'
                this.calculateTotal(0, amount.value);
            }
            image_delete += 1;
            parentTable = document.getElementById(`${opertationType}-table`);
            let tr = this.createElement("tr", `${opertationType}-tr`, "");
            tr.id = image_delete
            let first_td = this.createElement("td", "description", description.value);
            let second_td = this.createElement("td", `${opertationType}-amount`, amount.value);
            let third_td = this.createElement("td", "image-class", "", true, type.value);
            tr.appendChild(first_td);
            tr.appendChild(second_td);
            tr.appendChild(third_td);
            parentTable.appendChild(tr);
            description.value = '';
            amount.value = '';
        }
    }

    deleteLine() {
        let tr = document.getElementById(this);
        let className = tr.children[1].className;
        let value = tr.children[1].innerHTML;
        cashTracker.removeElement(className, value);
        tr.parentNode.removeChild(tr);
    }

    removeElement(className, value) {
        if (className == 'income-amount') {
            this.calculateTotal(-1 * parseInt(value), 0);
        } else if (className == 'expenses-amount') {
            this.calculateTotal(0, -1 * parseInt(value));
        }
    }
}

let addButton = document.getElementById("addButton");
var type = document.getElementById("type");
var description = document.getElementById("description");
var amount = document.getElementById("amount");

let cashTracker = new CashTracker()
addButton.addEventListener("click", function(){
    cashTracker.addItem(type, description, amount);});
