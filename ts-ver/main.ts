document.addEventListener('DOMContentLoaded', () => {
    /* 3-1 */
    type countryType = {
        names: {
            common: string
        }
        capitals: {
            name: string
        }[]
        population: number
        region: string
        subregion: string
    }

    const countryForm = document.getElementById('country-form')

    countryForm?.addEventListener('submit', async (e) => {
        e.preventDefault()
        const input = countryForm.querySelector("input[name='country']")
        let country: string | null
        if(input) country = input.value
        else return

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

        const countries: countryType[] = data.data.objects
        const table = document.getElementById('results-table1')

        if(!table) return

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

    /* 3-3 */
    // let page = 0,giphy: string | null = null
    //
    // const giphyForm = document.getElementById('giphy-form')
    //
    // const fetchGifs = async () => {
    //     const apiKey = 'PeXM6u5efUO1Is0mnvacjeihyoDvWfpk'
    //     let apiUrl
    //
    //     if(!giphy) {
    //         apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${ apiKey }&tag=cat&rating=g`
    //     } else {
    //         const offset = 25 * page
    //         apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${ apiKey }&q=${ giphy }&limit=25&offset=${ offset }&rating=g&lang=en&bundle=messaging_non_clips`
    //     }
    //
    //     const res = await fetch(apiUrl)
    //     const data = await res.json()
    //
    //     return data
    // }
    //
    // const handlePagination = async (type = null) => {
    //     if(type === "next") {
    //         page++
    //     } else if (type === "previous" && page >= 1) {
    //         page--
    //     }
    //
    //     const data = await fetchGifs()
    //
    //     const resultDiv = document.getElementById("giphy-results")
    //
    //     if(resultDiv) {
    //         resultDiv.innerHTML = ''
    //         data.data.forEach(element => {
    //             resultDiv.innerHTML += `
    //                 <img src="${ element.images.fixed_height.url }" />
    //             `
    //         })
    //         resultDiv.innerHTML += `
    //             <br />
    //             <button id="previous">Previous</button>
    //             <button id="next">Next</button>
    //         `
    //     }
    //
    //     const nextButton = document.getElementById('next')
    //     const previousButton = document.getElementById('previous')
    //
    //     nextButton.addEventListener('click', e => {
    //         handlePagination("next")
    //     })
    //
    //     previousButton.addEventListener('click', e => {
    //         handlePagination("previous")
    //     })
    //
    //     if(page === 0) {
    //         previousButton.style.opacity = '.5'
    //         previousButton.style.pointerEvents = 'none'
    //     } else {
    //         previousButton.style.opacity = '1'
    //         previousButton.style.pointerEvents = 'auto'
    //     }
    // }
    //
    // giphyForm.addEventListener('submit', async (e) => {
    //     e.preventDefault()
    //     giphy = giphyForm.querySelector("input[name='giphy']").value
    //     page = 0
    //
    //     let data
    //
    //     if(giphy) {
    //         data = await fetchGifs()
    //     } else {
    //         data = await fetchGifs()
    //     }
    //
    //     const resultDiv = document.getElementById("giphy-results")
    //
    //     if(!giphy) {
    //         resultDiv.innerHTML = `
    //             <img src="${ data.data.images.fixed_height.url }" />
    //         `
    //     } else {
    //         await handlePagination()
    //     }
    // })
})