const playerName = () =>{
    const searchFeild = document.getElementById("search-field") ;
    const searchValue = searchFeild.value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    // console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => displayPlayer(data.player))

    searchFeild.value = '';

}

const displayPlayer = players => {
    const playerContainer = document.getElementById('player-container');
    playerContainer.textContent = '';
    for(const player of players){
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${player.strThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${player.strPlayer}</h5>
                <p class="card-text">${player.strDescriptionEN.slice(0,200)}</p>
                <button onclick="loadDetails('${player.idPlayer}')" class="btn bg-success text-white">Details</button>
            </div>
        </div>
        `
        playerContainer.appendChild(div);
        // console.log(player)
    }
}

const loadDetails = id => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data))
}

const displayDetails = info =>{
    console.log(info.players[0]);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <img class="w-50" src="${info.players[0].strThumb}" alt="">
    <h3>Name: ${info.players[0].strPlayer}</h3>
    <h3>Country: ${info.players[0].strNationality}</h3>
    <h3>Sport: ${info.players[0].strSport}</h3>
    `
}