import { getCarMakes } from '../api/services/car-makes.service'
import CarMakes from './_components/CarMakes'
import CarReg from './_components/CarReg'
import Footer from './_components/Footer'
import Header from './_components/Header'

export default async function Home() {
  const carMakes = await getCarMakes(true)

  return (
    <div>
      <Header />
      <div className='pt-16 lg:pt-20'>
        <CarReg />
      </div>
      <div className='mt-12 lg:mt-16'>
        <CarMakes carMakes={carMakes} />
      </div>
      <Footer />
    </div>
  )
}
