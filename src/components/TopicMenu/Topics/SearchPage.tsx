import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import fetch from "../../../api/fetch"
import Search from "../../../model/Character/Search"
import '../../styles/searchPage.css'
import { SearchResults } from "../../../model/Character/SearchResults.interface"
import { useState } from "react"





function SearchPage() {
    const { searchSlug } = useParams()
    const [search, setSearch] = useState()
    const navigate = useNavigate()
    const { data, status } = useQuery([search ? (search):(searchSlug)], fetchSearch)

    const handleInput = (event: { target: { value: any; }; }) => {
        setSearch(event.target.value)
    }
    const handleClick = (route: string, slug: string) => {
        navigate(`/wiki/${route}${slug}`)
    }
    
    function fetchSearch(): Promise<Search> {
        return fetch(`https://api.open5e.com/search/?text=${search ? (search):(searchSlug)}`)
    }
    

    return (
        <div className="search-container">
                    <div className="search-slug-container">
                        <div>
                           <h1>Search Results:                        
                            <input
                                onChange={handleInput}
                                value={search} 
                                style={{
                                    height: '40px',
                                    paddingTop: '10px',
                                    fontSize: '30px',
                                    background: 'none',
                                    color: 'white',
                                    marginLeft: '10px',
                                    borderImage: 'none',
                                    borderStyle: 'none'
                                }}/>
                            </h1> 
                        </div>
                        <div>

                        </div>
                    </div>
                
                <div className="search-results-container">
                        {data?.results.map((res: SearchResults) => (
                            <div 
                                className="search-indv-result-container"
                                onClick={() => handleClick(res.route, res.slug)}
                                key={res.slug}>
                                    <div className="search-indv-result-name">
                                            {res.name}
                                    </div>
                                    <div className="search-indv-result-text">
                                            ...{res.text.substring(res.text.indexOf(searchSlug!), res.text.indexOf(searchSlug!) + 200)}...
                                    </div>
                            </div>
                        ))}
                </div>
        </div>
    )
}

export default SearchPage