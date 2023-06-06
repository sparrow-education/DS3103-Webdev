import './HomePage.css';
import TimeItem from '../components/date/TimeItem';

const HomePage = () => {
    return (
        <section className="container-fluid">
            <article className="row pb-3 ">
                <h1 className="display-1 fw-bold text-uppercase" style={{paddingTop:'2rem'}}>Welcome To Electric Games</h1>
            </article>


            <article className="d-flex justify-content-center">
                <div style={{position:'relative'}}>
                    <img style={{position: 'absolute', left: '218px', bottom: '90px'}} className='x-spin' src={require("../assets/logo/x.png")} alt="Banner Vector X"/>
                </div>
                <div>
                    <img style={{width:''}} src={require("../assets/logo/cst.png")} alt="Banner Vector CST"/>
                </div>
            </article>

            <article className='d-flex justify-content-center'>
                <TimeItem />
            </article>
        </section>
    )
}
export default HomePage;