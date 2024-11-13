export const formatOrderDate = (dateString: string) => {
    const orderDate = new Date(dateString);
    const now = new Date();
    const isToday = orderDate.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = orderDate.toDateString() === yesterday.toDateString();
    const time = orderDate.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
    if (isToday) return `Сегодня, ${time}`;
    if (isYesterday) return `Вчера, ${time}`;
    return `${orderDate.toLocaleDateString('ru-RU')}, ${time}`;
};

export const renderOrderStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
        done: 'Выполнен',
        pending: 'Готовится',
        cancelled: 'Отменён',
    };
    return statusMap[status];
};

export const calculateOrderTotal = (orderIngredients: string[], ingredientsPrices: Array<{
    _id: string;
    price: number
}>) => {
    return orderIngredients.reduce((total, ingredientId) => {
        const ingredient = ingredientsPrices.find(item => item._id === ingredientId);
        return total + (ingredient ? ingredient.price : 0);
    }, 0);
};

export const countIngredients = (ingredients: string[]) => {
    return ingredients.reduce((count: { [key: string]: number }, ingredientId: string) => {
        count[ingredientId] = (count[ingredientId] || 0) + 1;
        return count;
    }, {});
};
