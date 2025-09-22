import React from 'react'
import SearchReset from './SearchReset';
import { Search } from 'lucide-react';

const Searchform = ({ query }: {query?: string}) => {
  return (
    //next.js 19+ uses improved form component client side navigation on submit, integrate with server actions
    <form action="/" className='search-form'>
      <input 
       name='query'
       defaultValue={query}
       className='search-input'
       placeholder='Search Startups'
      />

      <div className='flex gap-2'>
        {query && (
            <SearchReset />
        )}
        <button type='submit' className='search-btn text-white'>
            <Search className='size-5'/>
        </button>
      </div>
    </form>
  )
}

export default Searchform