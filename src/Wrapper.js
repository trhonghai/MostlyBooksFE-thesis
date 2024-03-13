import { useEffect, useRef, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

function Wrapper({ children }) {
  const [prevLocation, setPrevLocation] = useState({});
  const LoadingBarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setPrevLocation(location);

    LoadingBarRef.current.continuousStart();
  }, [location]);

  useEffect(() => {
    LoadingBarRef.current.complete();
  }, [prevLocation]);

  return (
    <>
      <LoadingBar ref={LoadingBarRef} color="#007bff" />
      <Routes>{children}</Routes>
    </>
  );
}

export default Wrapper;
