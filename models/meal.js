class Meal {
    constructor(id, categoryIds, title, affordability, complexity, imageUrl, duration, ingredients, steps, isGlutenFree, isVegan, isVegetarian, isLactoseFree){
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.imageUrl = imageUrl;
        this.affordability = affordability;
        this.complexity = complexity;
        this.duration = duration;
        this.ingredients = ingredients;
        this.steps = steps;
        this.isGlutenFree = isGlutenFree;
        this.isVegetarian = isVegetarian;
        this.isVegan = isVegan;
        this.isLactoseFree = isLactoseFree;
    }
}
export default Meal;