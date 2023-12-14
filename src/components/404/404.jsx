import { Link } from "react-router-dom";
import './404.css'



const PageNotFound = () => {
  return (
    <>
      
	<div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>Oops!</h1>
			</div>
			<h2>404 - Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			{/* <a Link to="#">Go To Homepage</a> */}
            <a> <Link to="/" >Go To Homepage</Link></a>
		</div>
	</div>


    </>
  );
};

export default PageNotFound;