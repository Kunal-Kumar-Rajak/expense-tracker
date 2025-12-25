const State = {
    expenses: [],
    budget: 0,

    init() {
        const storedExp = localStorage.getItem('expenses');
        const storedBudget = localStorage.getItem('budget');
        
        if (storedExp) this.expenses = JSON.parse(storedExp);
        if (storedBudget) this.budget = parseFloat(storedBudget);
    },

    save() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
        localStorage.setItem('budget', this.budget);
    },

    // Import ke liye pura state replace karna
    loadState(data) {
        if(data.expenses && Array.isArray(data.expenses)) {
            this.expenses = data.expenses;
            this.budget = data.budget || 0;
            this.save();
            return true;
        }
        return false;
    },

    addExpense(expense) {
        this.expenses.push(expense);
        this.save();
    },

    deleteExpense(id) {
        this.expenses = this.expenses.filter(exp => exp.id !== id);
        this.save();
    },

    updateExpense(updatedExpense) {
        const index = this.expenses.findIndex(exp => exp.id === updatedExpense.id);
        if (index !== -1) {
            this.expenses[index] = updatedExpense;
            this.save();
        }
    },

    getExpense(id) {
        return this.expenses.find(exp => exp.id === id);
    },

    setBudget(amount) {
        this.budget = amount;
        this.save();
    },

    getFilteredExpenses(category, monthStr) {
        let filtered = this.expenses;
        if (category && category !== 'All') filtered = filtered.filter(exp => exp.category === category);
        if (monthStr) filtered = filtered.filter(exp => exp.date.startsWith(monthStr));
        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
    },

    getTotal(list) {
        return list.reduce((total, item) => total + parseFloat(item.amount), 0);
    }
};