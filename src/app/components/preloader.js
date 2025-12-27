import Spinner from "react-bootstrap/Spinner";

function Preloader() {
   return (
      <div
         style={{
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: "10000000000000000000000",
         }}
      >
         <div className="d-flex gap-1">
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="dark" />
         </div>
      </div>
   );
}

export default Preloader;
