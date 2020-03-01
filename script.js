window.addEventListener('load', () => {

    navigator.geolocation.getCurrentPosition(success);

    async function success(pos) {
        // get location
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        //hide key
        const api = await fetch('hide-key.json');
        const json = await api.json();

        // get data from darksky
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const ds_api = await fetch(`${proxy}https://api.darksky.net/forecast/${json.api}/${lat},${lon}`);
        const ds_json = await ds_api.json();



        // change UI
        let {
            summary,
            temperature,
            icon
        } = ds_json.currently;
        document.querySelector('.timezone h1').textContent = ds_json.timezone;
        document.querySelector('.summary').textContent = summary;
        const celcius = (temperature - 32) * 5 / 9;
        document.querySelector('.temperature').innerHTML = `${celcius.toFixed(2)}°`;

        setIcon(icon, document.querySelector(".icon1"));

    }



    function setIcon(icon, icon_id) {
        const skycons = new Skycons({
            color: "white"
        })
        icon
        const current_icon = icon.replace(/-/g, "_").toUpperCase();
        console.log(current_icon);
        skycons.play();
        return skycons.set(icon_id, Skycons[current_icon]);
    }
});