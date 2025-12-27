import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
   return (
      <div className="w-100 d-flex justify-content-center py-3">
         <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
         </Spinner>
      </div>
   );
}

export default LoadingSpinner;
