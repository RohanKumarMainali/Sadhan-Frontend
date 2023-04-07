import React from 'react'
import {Link} from 'react-router-dom'

const SearchResults = ({ results }: any) => {
  return (
    <div className="search-results absolute bg-gray-50 w-1/5 z-40 rounded " style={{top: '67px'}}>
        {results?.map((result: any, index: number) => (
          <li className='list-none text-left p-1 px-2' key={index}>
           <Link to = {`/search?name=${result.name}`} >
          {result.name}
          </Link>
          </li>
        ))}
    </div>
  )
}

export default SearchResults
