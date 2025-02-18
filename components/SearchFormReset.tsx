'use client'

import { X } from 'lucide-react'
import Link from "next/link"

const SearchFormReset = () => {

   function reset() {
      const form = document.querySelector('.search-form') as HTMLFormElement
      if (form) form.reset()

   }

   return (
      <button type="reset" onClick={reset}>
         <Link href={"/"}>
            <X className='text-slate-400' />
         </Link>
      </button>
   )
}

export default SearchFormReset