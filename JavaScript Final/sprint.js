fetch('./sprint.json')
    .then(response => response.json())
    .then(data => {
     data.forEach(variable => {
        console.log(ratingMsg(variable))
        console.log(`Game Name: ${variable.name} Game Rating: ${variable.rating}`)

        // Writing data from the JSON file to the html (the rating field is a function)
        const gameDiv = document.createElement('div');
        gameDiv.className = 'variable';

        gameDiv.innerHTML = `
        <hr />
        <h2>${variable.name}</h2>
        <ul><li> Rating: ${ratingMsg(variable)}</li>
        <li> Release Date: ${variable.releaseDate}</li>
        <li> Price: ${variable.price}</li>
        <li> Age: ${variable.age}</li>
        <li> Resale Value: ${variable.resaleValue}</li></ul>
        <hr />
        `
        document.body.appendChild(gameDiv);
     });

     // Two of my functions are added values/summarys so I put them at the bottom
     const summaryDiv = document.createElement('div');
     summaryDiv.className = 'summary'
   
     summaryDiv.innerHTML = `
     <hr />
     <h2>Summary Report</h2>
     <ul><li> ${getGameNames(data)}</li>
     <li> ${totalofAll(data)}</li></ul>
     <hr />
     `
     document.body.appendChild(summaryDiv);

     console.log(getGameNames(data));
     console.log(totalofAll(data));
    })

    .catch(error => {
     console.error(error);
    });
    // Function that will return the name of all games in the library.
    function getGameNames (data){
    const gameNames = data.map(variable => variable.name) 
    return `List of all games: ${gameNames.join(", ")}` 
    }

    // Function that will return the total price of the game library.
    function totalofAll (data){
    let grandTotal = 0;
    data.forEach (game => {
        grandTotal += parseFloat(game.price);
    });
    return `The total cost of your game libarary is: $${grandTotal}`;
    }

    // Function that will return a message based on the rating of each game.
    function ratingMsg(variable){
      switch(variable.rating){
        case "Everyone":
          return `${variable.name} is rated E for Everyone.`;
        case "Teen":
          return `${variable.name} is rated T for Teen.`;
        case "Mature":
          return `${variable.name} is rated M for Mature audiences only.`;
        default:
          return `Unknown rating for ${variable.name}.`
      }
    }
