function loadItems(){
    return fetch('data.json')
    .then(response => response.json())
    .then(json => json.items);
}
function displayItems(items){
    container=document.querySelector('.items');
    container.innerHTML=items.map(item=>createHTMLString(item)).join('');
}
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}
function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key==null||value==null){
        return;
    }
    displayItems(items.filter(item=>item[key]===value));
    //console.log(event.target.dataset.key);
    //console.log(event.target.dataset.value);
}
function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', ()=>onButtonClick());
    buttons.addEventListener('click', event=>onButtonClick(event, items));
}

//main
loadItems()
.then(items => {
    //console.log(items);
    displayItems(items);
    setEventListeners(items)
})
.catch(console.log);