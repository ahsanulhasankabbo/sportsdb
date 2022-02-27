const playerName = () =>{
    document.getElementById('player-container').textContent = '';
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
    for(const player of players){
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${player.strThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">Name : ${player.strPlayer}</h3>
                <h5 class="card-title">Country : ${player.strNationality}</h5>
                <h5 class="card-title">Sports : ${player.strSport}</h5>
                <button onclick="loadDetails('${player.idPlayer}')" class="btn bg-success text-white">Details</button>
            </div>
        </div>
        `
        playerContainer.appendChild(div);
        console.log(player)
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
    <h3 class="card-title">${info.players[0].strPlayer}</h3>
    <p>Sport: ${info.players[0].strDescriptionEN}</p>
    `
}