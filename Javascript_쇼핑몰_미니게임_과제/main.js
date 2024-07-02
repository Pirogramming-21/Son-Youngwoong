function loadItems(){
    return fetch('data.json')
    .then(response => response.json())
    .then(json => console.log(json.items));
}

loadItems()
.then(items => {
    console.log(items);
    // displayItems(items);
    // setEventListeners(items)
})
.catch(console.log);