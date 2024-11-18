import Link from 'next/link'
import Featured from '@/components/Featured'


const page = async () => {
  return (
    <div>
    <div className='text-2xl'>Presidents of U.S.A</div>
    <Featured />
    <Link href='/properties'> Go to Properties</Link>
    </div>
  )
}

export default page