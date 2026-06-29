class DashboardView {

    totalExpenses(total) {

        return {
            total
        };

    }

    expensesCount(count) {

        return {
            count
        };

    }

    expensesByCategory(data) {

        return data.map(item => ({

            category: item.category,

            total: item.total

        }));

    }

}

module.exports = new DashboardView();