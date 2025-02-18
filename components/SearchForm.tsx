import { Search } from 'lucide-react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'


const SearchForm = ({ query }: { query?: string }) => {


   return (
      <Form action='/' scroll={false}
         className=' search-form sm:text-base text-[0.9rem] flex items-center overflow-hidden sm:py-2 py-1 sm:px-4 px-3 rounded-[20px] mx-auto bg-slate-400/50 justify-center md:w-max w-[90%]'>

         <input
            name="query"
            autoComplete='off'
            defaultValue={query}
            placeholder='Search Startups'
            className=' md:w-[400px] w-[100%] text-slate-400 font-semibold outline-none bg-transparent border-none ' />

         <div className='bg-transparent flex gap-5 w-max h-max pl-2'>
            {query && <SearchFormReset />}
            <button type="submit">
               <Search className='text-slate-400 cursor-pointer' />
            </button>
         </div>

      </Form>
   )
}

export default SearchForm