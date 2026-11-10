document.addEventListener('DOMContentLoaded', () => {
    /* 3-1 */
    const countryForm = document.getElementById('country-form')

    countryForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const country = countryForm.querySelector("input[name='country']").value

        if(!country) {
            return
        }

        const apiUrl = `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(country)}`

        const res = await fetch(apiUrl, {
            headers: { 'Authorization': 'Bearer rc_live_f75d746fd3b34f49812c4ee2a0094034' }
        })

        if(!res.ok) {
            return
        }

        const data = await res.json()

        if(!data) {
            return
        }

        const countries = data.data.objects
        const table = document.getElementById('results-table1')

        table.innerHTML = `
            <tr>
                <th> Name </th>
                <th> Capital </th>
                <th> Population </th>
                <th> Region </th>
                <th> Subregion </th>
            </tr>
        `

        table.innerHTML += countries.map(country => `
            <tr>
                <td>${ country.names.common ? country.names.common : "Brak" }</td>
                <td>${ country.capitals[0].name ? country.capitals[0].name : "Brak" }</td>
                <td>${ country.population ? country.population : "Brak" }</td>
                <td>${ country.region ? country.region : "Brak" }</td>
                <td>${ country.subregion ? country.subregion : "Brak" }</td>
            </tr>
        `).join('')
    })
})