const UI = {
    chartInstance: null,

    renderExpenses(expenses) {
        const list = document.getElementById('expenseList');
        list.innerHTML = '';
        
        if(expenses.length === 0) {
            list.innerHTML = '<li style="text-align:center; padding:20px; color:var(--text-secondary)">No transactions found.</li>';
            return;
        }

        expenses.forEach(exp => {
            const li = document.createElement('li');
            li.className = 'expense-item';
            li.innerHTML = `
                <div class="expense-info">
                    <h4>${exp.note}</h4>
                    <small>${exp.date} &bull; <span style="color:var(--accent)">${exp.category}</span></small>
                </div>
                <div class="actions">
                    <span class="amount">₹${parseFloat(exp.amount).toLocaleString()}</span>
                    <button class="text-edit" onclick="App.editMode('${exp.id}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="text-delete" onclick="App.deleteItem('${exp.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            list.appendChild(li);
        });
    },

    updateDashboard(total, budget) {
        // Total
        document.getElementById('totalAmount').textContent = `₹${total.toLocaleString()}`;
        document.getElementById('budgetDisplay').textContent = `₹${budget.toLocaleString()}`;
        document.getElementById('budgetInput').value = budget > 0 ? budget : '';

        // Progress Bar
        const bar = document.getElementById('progressBar');
        const alert = document.getElementById('budgetAlert');
        
        if (budget > 0) {
            const percent = (total / budget) * 100;
            bar.style.width = `${Math.min(percent, 100)}%`;
            
            if (percent > 100) {
                bar.style.background = 'var(--danger)';
                alert.textContent = 'Over Budget!';
                alert.style.color = 'var(--danger)';
            } else if (percent > 80) {
                bar.style.background = 'var(--warning)';
                alert.textContent = 'Warning';
                alert.style.color = 'var(--warning)';
            } else {
                bar.style.background = 'var(--success)';
                alert.textContent = 'Safe';
                alert.style.color = 'var(--success)';
            }
        } else {
            bar.style.width = '0%';
            alert.textContent = 'No Limit';
        }
    },

    renderChart(expenses) {
        const ctx = document.getElementById('expenseChart').getContext('2d');
        
        // Group Data
        const categories = {};
        expenses.forEach(exp => {
            categories[exp.category] = (categories[exp.category] || 0) + parseFloat(exp.amount);
        });

        const labels = Object.keys(categories);
        const data = Object.values(categories);

        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        // Colors for chart
        const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

        this.chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { boxWidth: 10 } }
                }
            }
        });
    },

    showToast(msg, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.className = `toast show ${type}`;
        setTimeout(() => toast.classList.remove('show'), 3000);
    },

    populateForm(exp) {
        document.getElementById('expenseId').value = exp.id;
        document.getElementById('note').value = exp.note;
        document.getElementById('amount').value = exp.amount;
        document.getElementById('category').value = exp.category;
        document.getElementById('date').value = exp.date;
        document.getElementById('submitBtn').textContent = 'Update';
        document.getElementById('cancelEdit').classList.remove('hidden');
    },

    resetForm() {
        document.getElementById('expenseForm').reset();
        document.getElementById('expenseId').value = '';
        document.getElementById('submitBtn').textContent = 'Add Expense';
        document.getElementById('cancelEdit').classList.add('hidden');
        document.getElementById('date').valueAsDate = new Date();
    },

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    },
    
    initTheme() {
        if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
    }
};