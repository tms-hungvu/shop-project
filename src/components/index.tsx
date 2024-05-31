import Footer from "./Footer"
import Header from "./Header"


interface IindexProp {
    children : React.ReactNode
}

export default function Index({children} : IindexProp){
   return (<>
        <Header />
            {children}
        <Footer />
   
   </>)
}