import Navbar from "/components/Navbar";
import ActiveResource from "/components/ActiveResource";


const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <ActiveResource />
            {children}
        </>
    )
};

export default Layout;