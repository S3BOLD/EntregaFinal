class CategoryView {

    render(category) {

        return {
            id: category.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt
        };

    }

    renderMany(categories) {

        return categories.map(category => this.render(category));

    }

}

module.exports = new CategoryView();