import Aboutus from '../Components/Aboutus'
import Footer from '../Components/Footer'
// import Header from '../Components/Header'
import Hero from '../Components/Hero'
import Hero2 from '../Components/Hero2'
import Natural from '../Components/Natural'
import Navbar from '../Components/Navbar'
import PureOrganicHoney from '../Components/PureOrganicHoney'
import Sidr from '../Components/Sidr'
import Slider from '../Components/Slider'
const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <Header /> */}
      <Slider />
      <Hero />
      <PureOrganicHoney />
      <Hero2 />
      <Natural />
      <Hero2 />
      <Sidr />
      <Aboutus />
      <Footer />
    </div>
  )
}

export default Home
