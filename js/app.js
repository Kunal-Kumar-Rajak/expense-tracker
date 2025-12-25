const App = {
    init() {
        State.init();
        UI.initTheme();
        UI.resetForm();
        this.render();

        // Event Listeners
        document.getElementById('expenseForm').addEventListener('submit', this.handleSubmit.bind(this));
        document.getElementById('cancelEdit').addEventListener('click', UI.resetForm);
        document.getElementById('filterCategory').addEventListener('change', this.render.bind(this));
        document.getElementById('filterMonth').addEventListener('change', this.render.bind(this));
        document.getElementById('themeToggle').addEventListener('click', UI.toggleTheme);
        
        // Budget Listener
        document.getElementById('budgetInput').addEventListener('change', (e) => {
            State.setBudget(parseFloat(e.target.value) || 0);
            this.render();
        });

        // Import / Export Listeners
        document.getElementById('exportBtn').addEventListener('click', this.exportData.bind(this));
        document.getElementById('importBtn').addEventListener('click', () => document.getElementById('fileInput').click());
        document.getElementById('fileInput').addEventListener('change', this.importData.bind(this));
    },

    handleSubmit(e) {
        e.preventDefault();
        const id = document.getElementById('expenseId').value;
        const note = document.getElementById('note').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;

        if (!note || !amount || !date) return UI.showToast('Please fill all fields', 'error');

        const expense = {
            id: id || `exp-${Date.now()}`,
            note, amount, category, date,
            createdAt: Date.now()
        };

        if (id) {
            State.updateExpense(expense);
            UI.showToast('Expense Updated!', 'success');
        } else {
            State.addExpense(expense);
            UI.showToast('Expense Added!', 'success');
        }
        
        UI.resetForm();
        this.render();
    },

    deleteItem(id) {
        if (confirm('Delete this expense?')) {
            State.deleteExpense(id);
            this.render();
            UI.showToast('Deleted successfully', 'error');
        }
    },

    editMode(id) {
        const exp = State.getExpense(id);
        if (exp) UI.populateForm(exp);
    },

    render() {
        const cat = document.getElementById('filterCategory').value;
        const month = document.getElementById('filterMonth').value;
        
        const list = State.getFilteredExpenses(cat, month);
        const total = State.getTotal(list);
        
        UI.renderExpenses(list);
        UI.updateDashboard(total, State.budget);
        UI.renderChart(list);
    },

    // --- Export Logic (JSON Download) ---
    exportData() {
        const data = {
            expenses: State.expenses,
            budget: State.budget,
            exportedAt: new Date().toISOString()
        };
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "expense_backup.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        
        UI.showToast('Data Exported Successfully!', 'success');
    },

    // --- Import Logic (File Reader) ---
    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (State.loadState(data)) {
                    App.render();
                    UI.showToast('Data Imported Successfully!', 'success');
                } else {
                    UI.showToast('Invalid File Format', 'error');
                }
            } catch (err) {
                UI.showToast('Error parsing JSON', 'error');
            }
        };
        reader.readAsText(file);
        // Reset input so same file can be selected again if needed
        event.target.value = '';
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
