import React, { useEffect, useState } from 'react'
import Character from './Character'

function NavPage({ page, setPage}) {
      const handleNextPage = () => {
        setPage(prevPage => prevPage + 1)
      }
      const handlePrevPage = () => {
        setPage(prevPage => prevPage - 1)
      }
    return (
        <header className='d-flex justify-content-around align-items-center p-1'>
            {
                page === 1 ? '' : (
                <button className='btn btn-primary btn-sm'
                onClick={handlePrevPage}
                >
                    Page {page - 1}
                </button>)
            }

            <p className='m-0'>Page: {page}</p>
            <button className='btn btn-primary btn-sm'
            onClick={handleNextPage}
            >
                Page {page + 1}
            </button>
        </header>
    )
}


function CharacterList() {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
      async function fetchData() {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json()
        setLoading(false)
        setCharacters(data.results)
      }
  
      fetchData()
      
    }, [page])


    if (loading) {
        return (
            <div>Loading</div>
        )
    }

  return (
    <div className='container bg-danger'>

        <NavPage page={page} setPage={setPage} />

        {
            loading ? (<h1>Loading</h1>) : (
                <div className="row">
                    {characters.map(character => {
                        return (
                            <div className='col-md-4' key={character.id}>
                                <Character character={character} />
                            </div>
                        )
                    })}
                </div>
            )
        }

        <NavPage page={page} setPage={setPage} />
    </div>
  )
}

export default CharacterList